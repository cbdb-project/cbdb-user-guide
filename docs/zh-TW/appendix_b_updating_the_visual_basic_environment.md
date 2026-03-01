# 附錄 B：更新 Visual Basic 環境（必要時）

## 新增 References

CBDB 使用多項不屬於 MS Access 預設 Visual Basic 環境的 VB 資源。若執行某段程式時出現 VB 物件未定義（undefined VB object）錯誤，請檢查 Visual Basic 的 `References` 設定。

操作步驟：

1. 在 Access 主視窗中，點選 `Database Tools` 下的 `Visual Basic`，開啟 Visual Basic 編輯器。
2. 在 VB 編輯器選單點選 `Tools` -> `References...`，你會看到類似畫面：

    ![image_136_198](images/image_136_198.png)

3. 若勾選項目與圖中不同，請在清單中往下捲動，調整為相同設定。若系統提示資源重複，代表你原本勾選了清單外項目；請取消那些項目後再試一次。

## 將 TreeView 加入 Visual Basic

如果你在 LookAtOffices 選官職或在 LookAtAssociations 選關係時出現錯誤，通常是因為 Visual Basic 環境尚未加入 `MSCOMTL.ocx`。

修正步驟：

1. 在 Access 主視窗中，點選 `Database Tools` 下的 `Visual Basic`。
2. 在 VB 編輯器選單點選 `Tools` -> `References...`，你會看到類似畫面：

    ![image_137_199](images/image_137_199.png)

3. 若你看到 `Microsoft Windows Common Controls 6.0 (SP6)`，問題可能另有原因。請先取消勾選、關閉視窗、離開 VB 編輯器並關閉 Access，再重新開啟 Access 與編輯器，然後直接做第 5 步。若仍無法使用 TreeView，請回報給我們。
4. 若看不到該項目，請往下捲動清單；若找到，勾選後按 `OK`。
5. 若清單中找不到 Common Controls 6.0，請手動加入：

    a. 點選 `Browse...`
    b. Windows 7 請進入 Windows 目錄下的 `SysWOW64` 子目錄；Windows XP 請進入 `System32`。
    c. 將 `Files of type` 改為 `ActiveX Controls (*.ocx)`
    d. 你應會看到：

    ![image_138_200](images/image_138_200.png)

    e. 點選 `MSCOMCTL.OCX`
    f. 點選 `Open`
    g. 確認 References 視窗中 `Common Controls 6.0` 已勾選，再按 `OK`。

6. 如果在 `SysWOW64` 找不到 `MSCOMCTL.OCX`，請：

    a. 從 CBDB 網站下載的 `CBDBPatch.rar` 內含此 OCX 檔與說明。

    b. 將 `MSCOMCTL.OCX` 複製到 `C:\WINDOWS\SysWOW64`

    c. 接著註冊該檔案：

        1. 點選 Windows `Start`。
        2. 選擇 `All Programs` -> `Accessories`。
        3. 在 `Command Prompt` 按右鍵，選 `Run as Administrator`。
        4. 系統詢問是否繼續時按 `yes`。
        5. 在命令列輸入：
            `REGSVR32 C:\Windows\sysWOW64\MSCOMCTL.OCX`
        6. 按 `Enter` 執行。
        7. 關閉命令列視窗。

    d. 完成後，再執行本附錄前面第 (1) 到 (5) 步。

7. 要離開 Visual Basic 編輯器，點選 `File` -> `Close and Return to Microsoft Access`。
