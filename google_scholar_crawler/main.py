import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

from scholarly import scholarly

SCHOLAR_ID = os.environ.get('GOOGLE_SCHOLAR_ID')
if not SCHOLAR_ID:
    raise SystemExit('GOOGLE_SCHOLAR_ID is required')

author = None
for attempt in range(1, 4):
    try:
        author = scholarly.search_author_id(SCHOLAR_ID)
        scholarly.fill(author, sections=['basics', 'indices', 'counts', 'publications'])
        break
    except Exception as exc:
        if attempt == 3:
            raise
        print(f'Google Scholar fetch failed on attempt {attempt}: {exc}', file=sys.stderr)
        time.sleep(30 * attempt)

author['updated'] = datetime.now(timezone.utc).isoformat()
author['publications'] = {v['author_pub_id']: v for v in author['publications']}
print(json.dumps(author, indent=2))

results_dir = Path(__file__).resolve().parent / 'results'
results_dir.mkdir(exist_ok=True)
with (results_dir / 'gs_data.json').open('w', encoding='utf-8') as outfile:
    json.dump(author, outfile, ensure_ascii=False)

shieldio_data = {
    "schemaVersion": 1,
    "label": "citations",
    "message": f"{author['citedby']}",
}
with (results_dir / 'gs_data_shieldsio.json').open('w', encoding='utf-8') as outfile:
    json.dump(shieldio_data, outfile, ensure_ascii=False)
