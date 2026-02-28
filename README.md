# CBDB User Guide Docs Site

This repo is configured to publish a GitHub Pages documentation site using **MkDocs + Material**.

## Included setup

- `mkdocs.yml`: site config and navigation
- `docs/`: documentation source files
- `.github/workflows/deploy-docs.yml`: GitHub Actions workflow to build and deploy Pages
- `requirements-docs.txt`: doc build dependencies

## Frontend full-text search

The site enables MkDocs' built-in `search` plugin (client-side full-text search in browser).

## Before first deploy

1. Update placeholders in `mkdocs.yml`:
   - `site_url`
   - `repo_url`
   - `repo_name`
2. Confirm default branch name matches workflow trigger (`main` by default).
3. In GitHub repository settings:
   - Go to **Settings -> Pages**
   - Set **Build and deployment -> Source** to **GitHub Actions**

## Local preview

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-docs.txt
mkdocs serve
```

## Build command

```bash
mkdocs build --strict
```
