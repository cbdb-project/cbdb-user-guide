# 附錄 C：在 Macintosh 上安裝 SQLite 版 CBDB 資料庫

對 Apple 使用者（或 Linux 使用者，後者通常不太需要這份說明），我們提供 SQLite 格式的 CBDB 獨立版本。

在 Macintosh 系統中，要使用資料庫檔案，作業系統需要透過連接器將檔案接到標準 ODBC（Open Database Connectivity）介面。為建立此連線，你需要安裝 Mac ODBC Administrator 與 SQLite 的 ODBC driver。（你可以自行從網路下載，或交由資訊技術人員處理。SQLite 的 ODBC driver 可由 http://www.ch-werner.de/sqliteodbc/ 下載。）

1. 安裝 Macintosh ODBC Administrator 與 SQLite driver。
2. 在 Finder 進入 Utilities，開啟 ODBC Administrator。
3. 進入 User DSN，新增名為 `CBDBFull` 的 SQLite 資料庫：

![image_139_201](images/image_139_201.png)

4. 點選 `Configure` 設定連接器：

![image_139_202](images/image_139_202.png)

5. 新增關鍵字 `database`，並在 `value` 填入資料庫檔案的完整路徑。
6. 點選 `OK` 後視窗會關閉，再按 `Apply`。
7. SQLite 版 CBDB 便可供 OpenOffice 或你偏好的其他軟體介面使用。
