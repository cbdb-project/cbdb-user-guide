# 第 4 章：進階查詢技巧

CBDB 的 Access 版本提供多種由淺入深、越來越強大的資料分析方式。第一層進階查詢，是把某個表單（form）的輸出結果，當作下一個查詢的輸入。當你對 CBDB 的資料結構更熟悉後，下一步就是使用 Access 內建的 Query Design 表單，自行建立自由格式查詢。隨著你對 SQL（Structured Query Language）概念掌握更深，可設計的查詢也會越來越精細。本章先示範一個「以某表單輸出作為其他查詢輸入」的例子，再介紹 SQL 的基本觀念，並用一個需要兩步查詢設計的案例說明。

## A. 宋代福建莆田進士群體的親屬網絡 {: #a-putian }

研究宋代社會史時，一個重要問題是：地方菁英是否長期穩定，並持續掌控取得官僚身分所需的文化資源？還是其實存在社會流動，讓原本邊緣家族可藉由子弟教育成功而進入菁英層？

要探討此問題，可以比較不同時段、同一地方中由科舉入仕者的親屬結構，觀察其組織是否變化。本例考察福建莆田兩個時段：1050-1100 與 1200-1250。先使用 LookAtEntry 表單：

![image_120_177](images/image_120_177.png)

步驟如下：

    (1) 用 Select Entry 選擇「Examination 科舉門」類別下所有類型。
    (2) 先把考試年份範圍設為 1050-1100。（圖示為 1200-1250。）
    (3) 用 Select Place 選擇宋代的莆田。
    (4) 執行查詢。
    (5) 用 Store Person IDs，把選中人物的 ID 複製到暫存表。

當你取得「指定時段內、莆田出身且由科舉入仕者」的 ID 表後，開啟 LookAtKinship，讓表單讀入 1050-1100 的已儲存名單：

![image_121_178](images/image_121_178.png)

此處步驟為：

    (1) 在表單上方按 Recall Person IDs，叫回人物 ID 清單。
    (2) 看到 “[Recalled List]” 即代表匯入成功。
    (3) 親屬參數設為 up 2、down 2、collateral 1、marriage 1。
    (4) 執行查詢後，把結果輸出為 UTF-8 編碼的 Pajek 檔。
        輸出時設定不包含 0-degree 節點（即與其他節點無連結者）。
    (5) 對 1200-1250 人群重複同樣流程，建立第二個 Pajek 檔。

接著在社會網絡分析軟體中繪圖。本例使用 Pajek：

![image_122_179](images/image_122_179.png)

Pajek 的預設網絡配置為「Circular」。若要觀察親屬網絡群組，較實用的版面是「Kamada-Kawai」中的「Separate Components」。

當我們選取並仔細檢視莆田男性進士在 1050-1100 與 1200-1250 的親屬網絡組件時，可得到：

![image_122_180](images/image_122_180.png)
Putian Examination Kinship Networks, 1050-1100

![image_123_181](images/image_123_181.png)
Putian Examination Kinship Networks, 1200-1250

可注意到，在較晚時段，「主組件」（網絡中最大組件）已擴大，除方、陳、林三姓外，也納入鄭、顧兩姓成員；宋姓則大致消失。圖中白色節點是通過考試者，藍色方塊為其親屬。

## B. 使用 Access Query Designer {: #b-designer }

Access 另一項極為強大的功能，是可自行設計 SQL 查詢，從任何你想要的角度檢視 CBDB 資料。你需要掌握一些基本概念，但 Access 的 Query Designer 能讓終端使用者即使不懂 SQL（Structured Query Language）也能開始探索資料。隨著你對查詢更熟悉，可再逐步學習更正式的 SQL 寫法，進一步提升資料操作能力。

要使用 Query Designer，你需要對 CBDB 的資料表及其彼此關聯有基本認識。為降低操作難度，我們提供一組「反正規化」（denormalized）資料表，也就是把原本依賴 ID 代碼的欄位，補上對應的描述欄位。舉例來說，`BIOG_ADDR_DATA` 記錄人物所關聯地點清單：出生地、基本籍貫、遷居地、葬地等；但每筆關鍵資訊主要是三組代碼：person ID、address ID、address type ID。我們另外建立 `ZZZ_BIOG_ADDR_DATA`，整合其他表（`BIOG_MAIN`、`ADDR_CODES`、`BIOG_ADDR_CODES`）補入人物姓名、地名、地址類型說明等實用資訊。使用這些同時含代碼與描述的資料表，可大幅簡化查詢建構。相關資料表如下：

1. `ZZZ_ALT_NAME_DATA`（補上別名類型）
2. `ZZZ_BIOG_ADDR_DATA`（補上地址與地址類型）
3. `ZZZ_BIOG_MAIN`（補上年號、族群）
4. `ZZZ_ENTRY_DATA`（補上入仕類型）
5. `ZZZ_KIN_BIOG_ADDR`（親屬表，並提供人物主要地址）
6. `ZZZ_NONKIN_BIOG_ADDR`（社會關係表，並提供人物主要地址）
7. `ZZZ_POSTED_TO_ADDR_DATA`（補上地址資訊）
8. `ZZZ_POSTED_TO_OFFICE_DATA`（補上官職資訊）
9. `ZZZ_TEXT_DATA`（補上文本資訊）

### I. 範例：

    1148 年進士及第者近親的入仕方式

如何使用 SQL 查詢，判定「1148 年通過進士科（且名單完整）的人當中，有多少人的近親也曾入仕」？

1. 在主畫面上方 Home 分頁旁的 Create 功能表中，選擇 Query Design：

    ![image_125_182](images/image_125_182.png)

    在 `Show Table` 視窗中，選 `ZZZ_ENTRY_DATA` 並按 Add。

2. 雙擊 `c_personid`、`c_entry_code`、`c_year`，把欄位加入查詢。把 `c_entry_code` 的 `Show` 核取方塊取消勾選，因為下一步我們只會拿它做條件，不需顯示在結果中（且每筆紀錄該值相同）。

3. 在 `Criteria` 指定 `c_entry_code = 36`（jinshi）且 `c_year = 1148`。

    ![image_126_183](images/image_126_183.png)

4. 在 Query 表單上緣按右鍵，切到 Datasheet View 檢查結果：

    ![image_126_184](images/image_126_184.png)

5. 會得到 273 筆紀錄。（請注意，CBDB 持續增補資料，結果可能改變。）

    ![image_127_185](images/image_127_185.png)

6. 接著在畫面上方 Query Tools 選單點 `Show Table`，加入親屬表 `ZZZ_KIN_BIOG_ADDR`：

    a. 在 `ZZZ_ENTRY_DATA` 點 `c_personid`，拖曳到 `ZZZ_KIN_BIOG_ADDR` 的 `c_personid`，建立兩表連結。
       Query builder 可能會要求你確認：是否只選取兩表中 person ID 相同的紀錄配對。

    b. 從親屬表加入以下欄位：

        c_person_name_chn（`c_personid` 對應人物姓名）
        c_node_id（親屬 ID）
        c_node_chn（親屬姓名）
        c_upstep（親屬關係向上代數）
        c_dwnstep（親屬關係向下代數）
        c_marstep（親屬關係中的婚姻連結步數）
        c_colstep（親屬關係中的兄弟姊妹連結步數）
        c_link_desc（親屬關係英文描述）
        c_link_chn（親屬關係中文描述）

    c. 將向上代數限制（`c_upstep`）設為 2（例如 FF、FFB 等）。

        將向下代數限制（`c_dwnstep`）設為 0（表示只看祖先）。
        將婚姻關係限制（`c_marstep`）設為 0。
        將兄弟姊妹關係限制（`c_colstep`）設為最多 1。

    d. 再重複一次流程，但允許堂表兄弟姊妹（例如 FBS 或 FFBS：向下 1 步、且至少向上 1 步）。

    ![image_128_186](images/image_128_186.png)

6. 檢查結果：符合條件的親屬共有 621 人。

    ![image_128_187](images/image_128_187.png)

7. 再加入第二個 `ZZZ_ENTRY_DATA`（可視為 `ZZZ_ENTRY_DATA_1`），並把它與 `ZZZ_KIN_BIOG_ADDR` 連結，使 `c_node_id = c_personid`：

    ![image_129_188](images/image_129_188.png)

8. 從 `ZZZ_ENTRY_DATA_1` 加入 `c_entry_desc` 與 `c_entry_desc_chn` 兩欄（取得親屬入仕方式），再檢查結果：

    ![image_129_189](images/image_129_189.png)

    在最初 273 名進士中，有 86 名可找到親屬入仕方式資料。

9. 只要把 `c_marstep` 上限加到 1，就可一併納入姻親關係。使用條件 `<2`，表示紀錄中 `c_marstep` 為 0 或 1 均可接受：

    ![image_130_190](images/image_130_190.png)

這會再增加 6 筆，總計 92 筆。

![image_130_191](images/image_130_191.png)

### II. 查詢時另外有用的程序

#### A. Null 資訊也有分析價值

上述查詢只處理「已知入仕方式」的親屬。若我們想列出所有親屬，並同時帶出「已知／未知」入仕資訊，就能更清楚掌握資料覆蓋率。

初始設計如下：

![image_131_192](images/image_131_192.png)

此時需要改變 Access 選取紀錄的方式。具體來說，要修改**親屬的 entry data 與親屬主紀錄之間**的連結；該連結原本是把 `ZZZ_KIN_BIOG_ADDR` 的 `c_node_id`（親屬 ID）等同於你加入查詢之第二份 `ZZZ_ENTRY_DATA`（即 `ZZZ_ENTRY_DATA_1`）的 `c_personid`：

    `ZZZ_KIN_BIOG_ADDR`. c_node_id = ZZZ_ENTRY_DATA_1. c_personid

要修改這條連線，雙擊 `c_node_id` 與 `c_personid` 之間的線，會開啟對話框：

![image_132_193](images/image_132_193.png)

選擇選項 2 並按 `OK`。此時請注意指向 `c_personid` 的箭頭。此箭頭在 SQL 裡代表「left join」。這個 left join 會保留 `ZZZ_KIN_BIOG_ADDR`（左表）中所有符合其他查詢條件的紀錄，同時在 `ZZZ_ENTRY_DATA_1`（右表）存在 kin ID 與 entry ID 對應時，帶出右表欄位值。（左右表由建立連結的順序決定。）

執行後，便可取得最初 621 位親屬的完整紀錄（即便部分為 Null）。

#### B. `TablesFields` 資料表

若你要在各類社會互動資料中找出其他相關人物，需要先知道某表裡哪些欄位是人物 ID。拿不準時，可在 Access 主介面左側資料表清單中開啟 `TablesFields`，查你要探索的資料表欄位。凡是 `foreign key` 欄含 `BIOG_MAIN`，且 `ForeignKeyBase` 欄為 `c_personid` 的欄位，都代表人物 ID。[^foreign-key]

例如在 `ASSOC_DATA` 中可看到：

![image_133_194](images/image_133_194.png)

其中以下欄位都屬於人物 ID：

    c_assoc_claimer_id（主張此關係存在者的人物 ID）
    c_assoc_id（被關聯者的人物 ID）
    c_assoc_kin_id（關聯成立所經由之被關聯者親屬 ID，如有）
    c_kin_id（本筆主人物之親屬 ID；關聯若經由該親屬而成立，如有）
    c_personid（本筆紀錄所指涉的人物）

[^foreign-key]: 在正規化資料庫中，`foreign key` 指的是使用其他資料表主鍵（primary key）ID 的欄位。
