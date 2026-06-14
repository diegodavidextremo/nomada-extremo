import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
I18N = ROOT / "i18n"

FAQ = {
    "es": {
        "eyebrow": "Preguntas frecuentes",
        "heroTop": "FAQ",
        "heroBottom": "NÓMADA",
        "clearTop": "TODO CLARO",
        "clearBottom": "ANTES DE EMPEZAR",
        "description": "Preguntas frecuentes sobre actividades, seguridad, reservas, escuela, seguros, bonos regalo, requisitos y funcionamiento del proyecto.",
        "searchLabel": "Buscar una duda",
        "searchPlaceholder": "Ej.: seguro, bono, menores, meteorología...",
    },
    "en": {
        "eyebrow": "Frequently Asked Questions",
        "heroTop": "NÓMADA",
        "heroBottom": "FAQ",
        "clearTop": "EVERYTHING CLEAR",
        "clearBottom": "BEFORE YOU START",
        "description": "Frequently asked questions about activities, safety, bookings, school, insurance, gift vouchers, requirements and how the project works.",
        "searchLabel": "Search for a question",
        "searchPlaceholder": "E.g. insurance, voucher, minors, weather...",
    },
    "fr": {
        "eyebrow": "Questions fréquentes",
        "heroTop": "FAQ",
        "heroBottom": "NÓMADA",
        "clearTop": "TOUT EST CLAIR",
        "clearBottom": "AVANT DE COMMENCER",
        "description": "Questions fréquentes sur les activités, la sécurité, les réservations, l’école, les assurances, les bons cadeaux, les conditions requises et le fonctionnement du projet.",
        "searchLabel": "Rechercher une question",
        "searchPlaceholder": "Ex. : assurance, bon cadeau, mineurs, météo...",
    },
    "de": {
        "eyebrow": "Häufige Fragen",
        "heroTop": "NÓMADA",
        "heroBottom": "FAQ",
        "clearTop": "ALLES KLAR",
        "clearBottom": "BEVOR DU BEGINNST",
        "description": "Häufige Fragen zu Aktivitäten, Sicherheit, Buchungen, Schule, Versicherungen, Gutscheinen, Voraussetzungen und zur Funktionsweise des Projekts.",
        "searchLabel": "Frage suchen",
        "searchPlaceholder": "Z. B. Versicherung, Gutschein, Minderjährige, Wetter...",
    },
}

# Product names are part of the brand and remain unchanged in every language.
PACK_NAMES = {
    "Tridente Extremo", "Leyenda de Aire y Mar", "Abismo y Cielo", "Costa Salvaje Pro",
    "Roca Mar y Dron", "Depredador Azul", "Titán Mediterráneo", "Nómada 72H",
    "Halcón del Mediterráneo", "Cueva Roca y Mar", "Horizonte Salvaje", "Costa Vertical",
    "Mar de Acero", "Cielo Nómada", "Abismo Mediterráneo", "Rastro Salvaje",
    "Trilogía Extrema", "Cumbres y Calas", "Inmersión Nómada", "Élite Nómada",
    "Aventura Filmada", "Leyenda FPV", "Weekend Mar Total", "Weekend Vertical y Agua",
    "Weekend Cielo Nómada", "Pack Élite Waterman", "Pack Élite Formación + Aventura",
    "Pack Élite Nómada Total", "Waterman Weekend", "Nómada Élite"
}

BRANDS = (
    "NÓMADA EXTREMO", "Nómada Extremo", "Diego David Extremo", "Diego David Gómez García",
    "Nuria Pons", "PADI", "SSI", "USPA", "RFAE", "FAMUR", "DAN", "EASA", "AESA",
    "Logbook", "FPV", "GMN", "IES Europa"
)
BRAND_BY_INDEX = dict(enumerate(sorted(BRANDS, key=len, reverse=True)))

FIXED_LABELS = {
    "ES": "ES",
    "EN": "EN",
    "FR": "FR",
    "DE": "DE",
    "Cookies": "Cookies",
    "Logbook": "Logbook",
    "NÓMADA EXTREMO": "NÓMADA EXTREMO",
    "Nómada Extremo": "Nómada Extremo",
    "Diego David Extremo": "Diego David Extremo",
    "Diego David Gómez García": "Diego David Gómez García",
    "Nuria Pons": "Nuria Pons",
    "PADI": "PADI",
    "SSI": "SSI",
    "USPA": "USPA",
    "RFAE": "RFAE",
    "FAMUR": "FAMUR",
    "DAN": "DAN",
    "EASA": "EASA",
    "AESA": "AESA",
    "FPV": "FPV",
    "GMN": "GMN",
    "IES Europa": "IES Europa",
    "Águilas": "Águilas",
    "Almadenes": "Almadenes",
    "Cabo Cope": "Cabo Cope",
    "Cabo de Palos": "Cabo de Palos",
    "Cabo Tiñoso": "Cabo Tiñoso",
    "La Azohía": "La Azohía",
    "La Manga": "La Manga",
    "Mar Menor": "Mar Menor",
    "Mazarrón": "Mazarrón",
    "Sierra Almenara": "Sierra Almenara",
    "Sierra Espuña": "Sierra Espuña",
    "Sierra Espuña Vertical": "Sierra Espuña Vertical",
    "Totana": "Totana",
    "Instagram": "Instagram",
    "hola@nomadaextremo.com": "hola@nomadaextremo.com",
    "hola@nómadaextremo.com": "hola@nómadaextremo.com",
}

LANGUAGE_OVERRIDES = {
    "en": {
        "NUESTRAS": "OUR",
        "FILTROS": "QUICK",
        "RÁPIDOS": "FILTERS",
        "CANALES": "OFFICIAL",
        "OFICIALES": "CHANNELS",
        "Paleo, calas, viento y lectura del litoral.": "Paddling, coves, wind and coastal awareness.",
        "Aventura naturista": "Naturist adventure",
        "Línea naturista": "Naturist programme",
        "NÓMADA NATURISTA": "NÓMADA NATURIST",
        "Contacto demostrativo para una marca académica. Sin reservas reales, sin cobros y sin actividades operativas actualmente.": "Demonstration contact for an academic brand. No real bookings or payments are processed, and no activities are currently operated.",
        "Nómada Extremo es actualmente un proyecto académico no operativo creado por Diego David Gómez García, alumno de 1.º GMN del IES Europa de Águilas. No realiza reservas, cobros, ventas, sorteos ni actividades reales en este momento.": "Nómada Extremo is currently a non-operational academic project created by Diego David Gómez García, a first-year GMN student at IES Europa in Águilas. It does not currently process bookings, payments or sales, run prize draws, or operate real activities.",
    },
    "fr": {
        "NUESTRAS": "NOS",
        "Paleo, calas, viento y lectura del litoral.": "Pagayage, criques, vent et lecture du littoral.",
        "Línea naturista": "Programme naturiste",
        "Contacto demostrativo para una marca académica. Sin reservas reales, sin cobros y sin actividades operativas actualmente.": "Contact de démonstration pour une marque académique. Aucune réservation ni aucun paiement réel ne sont traités, et aucune activité n'est actuellement organisée.",
        "Nómada Extremo es actualmente un proyecto académico no operativo creado por Diego David Gómez García, alumno de 1.º GMN del IES Europa de Águilas. No realiza reservas, cobros, ventas, sorteos ni actividades reales en este momento.": "Nómada Extremo est actuellement un projet académique non opérationnel créé par Diego David Gómez García, étudiant en première année de GMN à l'IES Europa d'Águilas. Le projet ne traite actuellement aucune réservation, aucun paiement ni aucune vente, n'organise aucun tirage au sort et ne propose aucune activité réelle.",
    },
    "de": {
        "Paleo, calas, viento y lectura del litoral.": "Paddeln, Buchten, Wind und Küstenkunde.",
        "Línea naturista": "Naturismus-Angebot",
        "Contacto demostrativo para una marca académica. Sin reservas reales, sin cobros y sin actividades operativas actualmente.": "Demonstrationskontakt für ein akademisches Markenprojekt. Es werden keine echten Buchungen oder Zahlungen abgewickelt und derzeit keine Aktivitäten durchgeführt.",
        "Nómada Extremo es actualmente un proyecto académico no operativo creado por Diego David Gómez García, alumno de 1.º GMN del IES Europa de Águilas. No realiza reservas, cobros, ventas, sorteos ni actividades reales en este momento.": "Nómada Extremo ist derzeit ein nicht operatives akademisches Projekt von Diego David Gómez García, Schüler im ersten GMN-Jahr am IES Europa in Águilas. Das Projekt verarbeitet derzeit keine Buchungen, Zahlungen oder Verkäufe, führt keine Verlosungen durch und bietet keine realen Aktivitäten an.",
    },
}


def restore_brand_tokens(value: str) -> str:
    for index, brand in BRAND_BY_INDEX.items():
        value = re.sub(rf"NOEXT[A-ZÀ-Ü]+{index}TOKEN", brand, value)
    return value


def polish_terms(source: str, value: str, language: str) -> str:
    if language == "en":
        value = re.sub(r"\bnaturopathic\b", "naturist", value, flags=re.I)
        if "bono" in source.lower():
            value = re.sub(r"\bbonuses\b", "vouchers", value, flags=re.I)
            value = re.sub(r"\bbonus\b", "voucher", value, flags=re.I)
    elif language == "fr":
        value = re.sub(r"\bnaturopathique\b", "naturiste", value, flags=re.I)
        if "bono" in source.lower():
            value = re.sub(r"\bbonus\b", "bon cadeau", value, flags=re.I)
    elif language == "de":
        value = re.sub(r"\bnaturheilkund", "naturist", value, flags=re.I)
        if "bono" in source.lower():
            value = re.sub(r"\bBonusse\b", "Gutscheine", value, flags=re.I)
            value = re.sub(r"\bBonus\b", "Gutschein", value, flags=re.I)
    return value

for language, faq in FAQ.items():
    path = I18N / f"{language}.json"
    dictionary = json.loads(path.read_text(encoding="utf-8"))
    dictionary.setdefault("pages", {})["faq"] = faq
    strings = dictionary.setdefault("strings", {})
    for source, value in list(strings.items()):
        if re.fullmatch(r"(?:[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}|@[\w.-]+)", source):
            strings[source] = source
        else:
            strings[source] = polish_terms(source, restore_brand_tokens(value), language)
    strings.update(FIXED_LABELS)
    strings.update(LANGUAGE_OVERRIDES.get(language, {}))
    for name in PACK_NAMES:
        if name in strings:
            strings[name] = name
    path.write_text(json.dumps(dictionary, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")

print("i18n catalogs finalized")
