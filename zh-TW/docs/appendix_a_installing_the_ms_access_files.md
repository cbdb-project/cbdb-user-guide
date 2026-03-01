# 附錄 A：安裝 MS Access 檔案

為了將資料庫檔案維持在 Microsoft Access 單檔 2GB 上限內，CBDB 分成四個檔案：三個包含資料表的「Base」檔，以及一個提供使用者介面的「User」檔。User 檔透過「連結資料表」（linked tables）讀取 Base 檔中的資料。

安裝 CBDB 檔案後，Access 會自動在同一目錄中的 User 檔與 Base 檔之間建立連結。若連結失敗，或你下載新版資料檔後需要重建連結，可透過 Navigation Pane 重新連結。

安裝 MS Access 資料庫：

1. 建立一個資料夾，將你從 CBDB 網站下載的四個檔案解壓縮到此資料夾。
2. 以滑鼠雙擊 User 檔，在 Microsoft Access 中開啟。你會看到：

    ![image_134_195](images/image_134_195.png)

    注意畫面左側清單中多數資料表名稱旁有箭頭。箭頭表示該資料表是來自 Base 檔的連結資料表。

3. 雙擊任一連結資料表。若連結正常，資料表會開啟；若連結中斷，會看到以下訊息：

    ![image_135_196](images/image_135_196.png)

4. 若出現錯誤訊息，先確認三個資料檔與 User 檔是否在同一資料夾。若是，請記下其中一個資料檔名稱，例如 `CBDB_20210225_DATA1.mdb`。其中 `20210225`（YYYYMMDD 格式）即資料發布日期。
5. 接著在 Navigation Pane 按下 `Relink Tables` 按鈕，系統會開啟表單要求輸入資料發布日期：

    ![image_135_197](images/image_135_197.png)

    在表單輸入日期後按 `OK`，系統會重新連結資料表。

6. User 檔現在即可使用。
