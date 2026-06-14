from __future__ import annotations

import json
import re
import sys
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
I18N = ROOT / "i18n"
SOURCE = I18N / "source-catalog.json"
LANGUAGES = ("en", "fr", "de", "it", "pt")
SEPARATOR = "\nNOEXT_TRANSLATION_SEPARATOR_9F7C\n"
BRANDS = (
    "NÓMADA EXTREMO", "Nómada Extremo", "Diego David Extremo", "Diego David Gómez García",
    "Nuria Pons", "PADI", "SSI", "USPA", "RFAE", "FAMUR", "DAN", "EASA", "AESA",
    "Logbook", "FPV", "GMN", "IES Europa", "AFF", "Open Water", "Advanced Open Water",
    "Rescue Diver", "Divemaster", "GoPro", "Drone", "Wingsuit", "BASE"
)


def protect(text: str):
    replacements = {}
    protected = text
    for index, brand in enumerate(sorted(BRANDS, key=len, reverse=True)):
        if brand in protected:
            token = f"NOEXTBRAND{index}TOKEN"
            protected = protected.replace(brand, token)
            replacements[token] = brand
    return protected, replacements


def restore(text: str, replacements: dict[str, str]):
    for token, value in replacements.items():
        # Some translation engines localize the word "BRAND" inside our
        # placeholder (for example NOEXTMARQUE3TOKEN in French). Match the
        # stable numeric token instead of depending on that middle word.
        number = re.search(r"NOEXTBRAND(\d+)TOKEN", token).group(1)
        text = re.sub(rf"NOEXT[A-ZÀ-Ü]+{number}TOKEN", value, text)
    return text


def should_translate(text: str):
    if not re.search(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ¿¡]", text):
        return False
    if re.fullmatch(r"(?:https?://|mailto:|tel:|@)\S+", text):
        return False
    return True


def translate_batch(texts: list[str], target: str):
    protected = []
    maps = []
    for text in texts:
        item, replacements = protect(text)
        protected.append(item)
        maps.append(replacements)
    payload = SEPARATOR.join(protected)
    params = urllib.parse.urlencode({"client": "gtx", "sl": "es", "tl": target, "dt": "t", "q": payload})
    request = urllib.request.Request(
        "https://translate.googleapis.com/translate_a/single?" + params,
        headers={"User-Agent": "Mozilla/5.0"},
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        data = json.loads(response.read().decode("utf-8"))
    translated = "".join(part[0] for part in data[0] if part and part[0])
    pieces = translated.split("NOEXT_TRANSLATION_SEPARATOR_9F7C")
    pieces = [piece.strip() for piece in pieces]
    if len(pieces) != len(texts):
        raise RuntimeError(f"Batch split mismatch: expected {len(texts)}, got {len(pieces)}")
    return [restore(piece, replacements) for piece, replacements in zip(pieces, maps)]


def chunks(values: list[str], max_chars=2800, max_items=24):
    current = []
    size = 0
    for value in values:
        addition = len(value) + len(SEPARATOR)
        if current and (size + addition > max_chars or len(current) >= max_items):
            yield current
            current = []
            size = 0
        current.append(value)
        size += addition
    if current:
        yield current


def main():
    source = json.loads(SOURCE.read_text(encoding="utf-8"))
    strings = source["strings"]
    es_file = I18N / "es.json"
    es = json.loads(es_file.read_text(encoding="utf-8"))
    es["strings"] = {text: text for text in strings}
    es_file.write_text(json.dumps(es, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

    for language in LANGUAGES:
        destination = I18N / f"{language}.json"
        dictionary = json.loads(destination.read_text(encoding="utf-8"))
        existing = dictionary.get("strings", {})
        pending = [text for text in strings if text not in existing]
        translated_map = dict(existing)
        batches = list(chunks(pending))
        for number, batch in enumerate(batches, 1):
            candidates = [text for text in batch if should_translate(text)]
            passthrough = [text for text in batch if not should_translate(text)]
            for text in passthrough:
                translated_map[text] = text
            if candidates:
                for attempt in range(4):
                    try:
                        values = translate_batch(candidates, language)
                        translated_map.update(zip(candidates, values))
                        break
                    except Exception as error:
                        if attempt == 3:
                            raise
                        time.sleep(1.5 * (attempt + 1))
            dictionary["strings"] = translated_map
            destination.write_text(json.dumps(dictionary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
            print(f"{language}: {number}/{len(batches)}", flush=True)
            time.sleep(0.12)
    print(json.dumps({"strings": len(strings), "languages": list(LANGUAGES)}))


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        sys.exit(130)
