# Junqi Zhang Homepage

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-online-brightgreen)](https://junqi-zhang.ourjqxd.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

This repository powers the personal academic homepage of Junqi Zhang:

- Website: <https://junqi-zhang.ourjqxd.com/>
- Source repository: <https://github.com/Junqi-Zhang/junqi-zhang.github.io>
- Google Scholar data branch: `google-scholar-stats`

## Local Development

Install Ruby, RubyGems, GCC, and Make following the Jekyll requirements, then run:

```bash
gem install bundler:2.2.19
bundle _2.2.19_ install
bash run_server.sh
```

Open <http://127.0.0.1:4000> after the local server starts.

## Citation Updates

Google Scholar citation data is updated by `.github/workflows/google_scholar_crawler.yaml`.
The workflow needs a repository secret named `GOOGLE_SCHOLAR_ID`; for this site it should match the `user=` value from the configured Google Scholar profile.

The workflow writes these files to the `google-scholar-stats` branch:

- `gs_data.json`
- `gs_data_shieldsio.json`

## Site Content

Main profile content lives in `_pages/about.md`. Site-wide author, SEO, and domain-related configuration lives in `_config.yml`.

## Acknowledgements

This site is adapted from [AcadHomepage](https://github.com/RayeRen/acad-homepage.github.io), which incorporates Font Awesome and is influenced by `mmistakes/minimal-mistakes` and `academicpages/academicpages.github.io`.
