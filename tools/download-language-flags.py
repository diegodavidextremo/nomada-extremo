"""Save the pinned public flag-icons SVG assets locally for the website."""
import concurrent.futures,json,re,urllib.request
from pathlib import Path
root=Path(__file__).resolve().parents[1]
data=json.loads((root/'assets/data/language-regions.json').read_text(encoding='utf-8'))
flags={l['flag'] for l in data['languages']}
flags.update(r['flag'] for l in data['languages'] for g in l['groups'] for r in g['regions'])
folder=root/'assets/images/flags';folder.mkdir(exist_ok=True)
def download(flag):
    assert re.fullmatch('[a-z]{2}(?:-[a-z]{3})?',flag)
    target=folder/(flag+'.svg')
    if not target.exists():
        with urllib.request.urlopen('https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/'+flag+'.svg',timeout=30) as response: content=response.read()
        assert b'<svg' in content and b'<script' not in content
        target.write_bytes(content)
    return flag
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool: saved=list(pool.map(download,sorted(flags)))
print(f'{len(saved)} local flags saved.')
