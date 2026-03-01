# CBDB 使用手冊文件網站

本儲存庫已設定為使用 **MkDocs + Material** 發布 GitHub Pages 文件網站。

## 已包含設定

- `mkdocs.yml`：網站設定與導覽
- `docs/`：文件來源檔
- `.github/workflows/deploy-docs.yml`：GitHub Actions 建置與部署流程
- `requirements-docs.txt`：文件建置相依套件

## 前端全文搜尋

本站啟用 MkDocs 內建 `search` 外掛（瀏覽器端全文搜尋）。

## 首次部署前

1. 更新 `mkdocs.yml` 中的預留欄位：
   - `site_url`
   - `repo_url`
   - `repo_name`
2. 確認預設分支名稱與 workflow 觸發條件一致（預設為 `main`）。
3. 到 GitHub 儲存庫設定：
   - 前往 **Settings -> Pages**
   - 將 **Build and deployment -> Source** 設為 **GitHub Actions**

## 本機預覽

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements-docs.txt
mkdocs serve
```

## 建置指令

```bash
mkdocs build --strict
```
