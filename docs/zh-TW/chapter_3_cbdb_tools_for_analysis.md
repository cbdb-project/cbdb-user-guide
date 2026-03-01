# 第 3 章：CBDB 分析工具

中國歷代人物傳記資料庫（CBDB）包含大量資訊，但若缺乏分析方法，資料本身價值有限。Access 版 CBDB 目前提供多個專用表單，讓使用者可針對重要資訊類別查詢資料庫；各表單名稱即反映其功能。

1. `LookAtEntry`：找出在特定時段內透過特定途徑取得任官資格的人群。
2. `LookAtAssociations`：找出透過特定社會關係類別互相連結的人群。
3. `LookAtOffice`：除了查看任某官職者，也可查看官僚層級中與其相關的上下位官職任職者。
4. `LookAtKinship`：檢視個人的親屬網絡，包含中國傳統五服圈與更廣泛親屬關係。
5. `LookAtNetworks`：檢視個人、群體或特定地點的整體網絡（親屬與社會關係）。
6. `LookAtAssociationPairs`：檢視兩個人的網絡交集，不只可找出同時與兩人有連結者，也可找出再往外一層的連結。
7. `LookAtPlace`：把人與地點之間各類關係整合到同一表單；在該地建立社會關係、於該地任官、或籍貫在該地者都可納入同一清單。
8. `LookAtStatus`：依特定社會區辨（status）類型分群人物。
9. `LookAtTexts`：探索與特定文本類別生產相關的人物（如野史、經典禮學註解等）。

在較複雜查詢中，可把某一表單查詢結果作為另一表單輸入，進而分析群體間關係。第 4 章將示範此法。除上述表單外，熟悉資料結構者也可透過 Access 內建 Query Designer 建立 SQL（Structured Query Language）查詢，檢視 CBDB 任意資料面向；這也是第 4 章另一重點。

NOTE：本章各表單示例僅供說明。由於 CBDB 會定期更新資料表，你實際查得結果可能與示例不同。

## A. Navigation Pane {: #a-nav }

![image_034_039](images/image_034_039.png)

顧名思義，Navigation Pane 是 Access 版資料庫表單操作中樞。點選 9 個查詢按鈕，可開啟 Browser 與上文介紹的分析表單。Navigation Pane 另有 4 項功能：

1. 錯誤回報：點 `Report an Error` 可開啟 Google 表單回報問題。

![image_034_040](images/image_034_040.png)

選擇錯誤類型並填寫所需資訊即可。

2. 使用手冊：點 `Users Guide` 會開啟本手冊副本。
3. 重新連結資料表（Relink Tables）：現行 Access 版將 CBDB 資料表與介面拆分。由於資料量很大，資料檔接近 Access 可處理上限，因此資料分為三個檔案，介面檔再連結它們。初次開啟介面時，只要三個資料檔和介面檔在同一資料夾，系統會自動建立連結。資料與介面分離後，兩者可獨立更新。

若 CBDB 發布新資料，可把新資料檔下載到 CBDB 資料夾，再把介面重新連到新檔。資料檔名含 `YYYYMMDD` 日期戳。按 `Relink Tables` 後，表單會要求輸入日期戳：

![image_035_041](images/image_035_041.png)

輸入新版本日期並按 `OK` 即可。

4. 調整 Index Address 排序：CBDB 預設 index place 定義對多數使用者已足夠，但針對特定研究主題可能需調整。按此按鈕可開啟設定表單。開啟時會顯示目前用於計算 index place 的地點關係類別排序：

![image_035_042](images/image_035_042.png)

可改選新的類別排序。按 `Disable` 可把選擇限制在停用列以上的類別：

![image_036_043](images/image_036_043.png)

本例將第一順位設為 `Household Address`（戶籍地）、第二順位設為 `Actual Residence`（落籍），其餘地點關係忽略。按 `Update Index Addresses` 後，系統會重算 `BIOG_MAIN` 的 index place，並更新所有使用該值的資料表。

若想恢復預設，只要按 `Reset to Default`。

## B. Browser：查詢個人資料 {: #b-browser }

CBDB 的 Browser 可快速瀏覽資料庫中個人基本資訊。它主要讀取人物原始資料，因此分析能力有限；例外是下述姓名搜尋功能。開啟 Browser 時，會從 `BIOG_MAIN` 第一筆人物開始（按姓名排序時，先列僅有名無姓者）。

![image_037_044](images/image_037_044.png)

Access 介面支援雙語／多語標示，使用者可用右上角按鈕在英文、繁體、簡體間切換。

![image_038_045](images/image_038_045.png)

### 資料庫搜尋

### 依姓名搜尋

`BIOG_MAIN` 超過 53.5 萬人，只靠左側卷動不利定位。Browser 提供兩種搜尋。第一種是姓名搜尋；此處「姓名」涵蓋 CBDB 各類名號（字、號等）。因此若文獻只給蘇軾的號「東坡」，也可直接搜尋並查看有多少人名稱中含該字串。當然，也可直接搜 `Su Shi` 或 `蘇軾`。

### 依拼音搜尋

1. 基本拼音搜尋（如 `Su Shi`）會在姓名任意位置比對，可再縮小或擴大條件。
2. 全小寫（如 `hao`）會比對名稱任一部分，因此可找出 `Zhao Fang`、`Shao Yong`、`Chao Buzhi`，也會找出 `Hao Jing`、`Cheng Hao`。
3. 首字母大寫（如 `Hao`）會優先找詞首為 `Hao` 的名稱。
4. 前置 `!` 則只看姓氏。

![image_039_046](images/image_039_046.png)

### 姓名 + 官職搜尋

若文獻僅有姓與官銜，Browser 也可據此搜尋。

![image_039_047](images/image_039_047.png)

按 `Search by Surname + Office` 後可指定姓名、官職，並可再用 index year 或朝代範圍縮小搜尋：

![image_040_048](images/image_040_048.png)

Note：使用中文姓名與官銜結果通常較準確。表單會在資料庫中找出具該姓者所有官銜（拼音官銜以小寫並以空格分字）。在 Postings 分頁查看杜甫 9 筆任職紀錄，可確認其確曾任工部員外郎。

按 `Search` 後，若有符合條件人物，結果會回傳 Browser：

![image_040_049](images/image_040_049.png)

### 結果檢視

Browser 各分頁大致直觀，分別呈現地址、別名、著作、任官、入仕方式、事件、status、親屬、社會關係、財產、資料來源、機構關係等。社會關係清單來自基本表，完整度低於 `LookAtNetworks` 建出的網絡。

現版 Browser 有兩項重要改進：

1. 親屬清單更完整。早期僅顯示 `KIN_DATA` 原始紀錄；現版會用親屬距離參數動態搜尋個人親屬網絡，預設組合含：上代 2、下代 2、婚姻 1、旁系（兄弟姊妹）1。詳見下文 `Query Kinship` 說明。

![image_041_050](images/image_041_050.png)

以蘇軾為例，Browser 找到 143 筆親屬關係（第一筆是 ego 即蘇軾本人）。每筆 Notes 欄會記錄從蘇軾到該親屬的路徑。例如晁補之路徑為：蘇軾三子 -> 其二女 -> 其夫；晁補之是該夫之舅（母兄弟）。

2. 新增外部資料庫超連結。若人物資訊來自其他資料庫，Browser 會提供連結。例如蘇軾有連到中研院人名權威資料庫：

![image_042_051](images/image_042_051.png)

點連結可開啟蘇軾條目：

![image_042_052](images/image_042_052.png)

### 儲存結果

A. 找到人物後，可按 `Store Person ID` 儲存其 ID，供 `Query Kinship`、`Query Social Networks`、`Query Pair-wise Associations` 重用。

B. 可按 `Save to File` 將 Browser 匯整資訊存為 HTML。

![image_043_054](images/image_043_054.png)

目前 HTML 格式較簡單（下圖僅示檔案開頭）：

![image_043_053](images/image_043_053.png)

## C. 使用表單「Query by Methods of Entry into Government」 {: #c-entry }

`LookAtEntry` 是最簡單的表單。從主頁按 `Query by Methods of Entry into Government` 開啟，再按 `Select Entry` 選類別：

![image_044_055](images/image_044_055.png)

所有表單都可在英／繁／簡間切換。按 `繁體` 後也可切回英文：

![image_044_056](images/image_044_056.png)

### 選擇入仕方式

按 `Select Entry` 會開啟選單。由於取得任官資格途徑很多，CBDB 用可折疊樹狀結構簡化選擇：

![image_045_057](images/image_045_057.png)

可先在左側選某一大類（A1）縮小範圍：

![image_045_058](images/image_045_058.png)

可在右側選特定方式，或全選列表（A2）。右下角搜尋框（B1）可搜尋特定方式。CBDB 搜尋規則是先比對字串開頭，再比對字串內文；若第一筆不是目標，可按 `Find Next` 找下一筆（B2）：

![image_046_060](images/image_046_060.png)

常見需求是同時看多個方式。CBDB 支援多選，可點選／取消：

![image_046_061](images/image_046_061.png)

自介面 BG 版起，可儲存已選入仕方式清單，便於後續組合與編修：

![image_047_062](images/image_047_062.png)

選好組合後按 `Save Entry` 可存成文字檔，會開啟存檔對話框：

![image_047_063](images/image_047_063.png)

日後可按 `Import Entry` 重新匯入，會開啟開檔對話框：

![image_048_064](images/image_048_064.png)

選檔並按 `Open` 後，表單會顯示使用匯入清單，接著可直接查詢：

![image_048_065](images/image_048_065.png)

### 設定查詢參數

### 設定時間參數

按 `Select` 回到 LookAtEntry 後，可設定年份範圍（1）並執行查詢（2）：

![image_049_066](images/image_049_066.png)

表單可選「入仕年」或人物「index year」作條件（勾選 `Use Index Years` 即納入 index year）。因很多人物入仕年未知（記為 0），常可嘗試同條件再跑一次、改用 index year：

![image_049_067](images/image_049_067.png)

可見 `Entry Year` 欄有許多 0。此法得到 734 筆，而只用入仕年僅 87 筆。另有些人僅知朝代、未知 index year。朝代搜尋粒度較粗（例如宋代只一個朝代碼，即使你只想看五代與北宋），此例可找到 1,341 人，其中 134 人無 index year；但其中 10 人有入仕年份：

![image_050_068](images/image_050_068.png)

查詢結果表有 32 欄：

* Name (Pinyin)
* Name (Chinese)
* Index Year
* Index Year Type (English)
    （index year 推導方式）
* Index Year Type (Chinese)
* Entry Year
* Description of Entry (English)
* Description of Entry (Chinese)
* Person’s Index Place (Pinyin)
* Person’s Index Place (Chinese)
* Type of Place Association
    （用於指定 index place 的地點關係類型）
* X-coordinate of Index Place
    （CBDB 使用行政治所座標）
* Y-coordinate of Index Place
* Count of XY coordinates
    （同一 index place 的人數）
* Exam Rank
    （若可得；蔭補不適用）
* Kinship Relation
    （若屬蔭補，且 CBDB 知其依據親屬與關係，會顯示）
* Kin Name (Pinyin)
* Kin Name (Chinese)
* Associate Name (Pinyin)
    （有些人因薦舉或非親屬關係入仕）
* Associate Name (Chinese)
* Association
    （關係類型）
* Person ID
* Dynasty (English)
* Dynasty (Chinese)
* Index Year Type Code
* Parental Status (English)
    （部分資料記載應試時父母是否在世）
* Parental Status (Chinese)
* Place of Entry (Pinyin)
* Place of Entry (Chinese)
* Place of Entry X-coordinates
* Place of Entry Y-coordinates
* Place of Entry XY Count

可用任一欄排序。例如以 `Index Year` 排序：先左鍵選欄名，再右鍵選排序方式。

![image_051_069](images/image_051_069.png)

若要儲存結果，最簡單是點左上角小方塊全選，`Ctrl-C` 複製到剪貼簿：

![image_052_070](images/image_052_070.png)

再貼到可接受該格式的軟體。

### 設定地點參數

若要看特定區域人物入仕方式，可用右上 `Select Place`：

![image_052_071](images/image_052_071.png)

會開啟 Select Address。可在 Filter 輸入地名過濾；如輸入 `Kaifeng`，按 `Filter` 會列出所有以 Kaifeng 開頭地名（用中文 `開封` 可避免同音誤差）：

![image_053_072](images/image_053_072.png)

可見開封有多筆地址。此例選 1053-1119 有效之開封縣，點該列再按 `Select` 回主窗後再查：

![image_053_073](images/image_053_073.png)

由於 index year 起於 900，早於該縣碼啟用年，勾選 `Use XY Reference` 可納入 1053 前區域代碼。只用單一開封地址可得 110 人。

若想更廣義看開封，可回 Select Address 再過濾 `Kaifeng`，按 `Select ALL Filtered` 全選過濾項。回到 LookAtEntry 後會載入所有開封代碼；若含開封府，亦會納入其下轄縣：

![image_054_074](images/image_054_074.png)

Place 欄會顯示過濾詞（如 `[[Kaifeng]]`）。此時查詢可得 156 筆：900-1100 間、由蔭補入仕且與開封相關者。

若開封地址 ID 太多，也可在 Select Address 中只勾選需要項目後按 `Select`：

![image_054_075](images/image_054_075.png)

多選地址時，表單顯示 `[[Multi-Select]]/[[多選]]`。此例在 900-1100、蔭補條件下可得 159 筆。

![image_055_076](images/image_055_076.png)

若要更精確控制地址碼，可先建一份地址 ID 文字檔。以開封為例：在 Select Address 全選過濾結果，貼到 Word/Excel，刪去不要的列，再把 Address ID 複製成文字檔。

![image_055_077](images/image_055_077.png)

![image_055_078](images/image_055_078.png)

匯入程序會把清單與 `ADDR_CODES` 比對，無效代碼會送到 `ImportErrorList` 供檢查（在 Access 左側表清單可雙擊開啟）。

接著在 LookAtEntry 按 `Import Places` 匯入檔案。若有無效 ID，CBDB 會警示。匯入成功時 Place 欄會顯示 `[Imported List]`，設定其他條件後可執行查詢。

![image_056_079](images/image_056_079.png)

此法得到 156 人，與過濾法相同。請注意右上 `Include Subordinate Units`（預設勾選）：若匯入清單含開封府，會把其下轄縣一併納入，因此結果含雍邱、管城等。取消勾選後這些縣會排除，結果降為 105 人。

另有一種處理「地名更替」的方法：只靠名稱清單可能漏掉異名。例：後晉（936-947）開封常稱汴州。CBDB 可用所選地址（單筆／過濾／匯入清單）的經緯度，在指定時段找出附近行政單位。若匯入上述開封地址清單並勾選 `Use XY Reference` 與 `Include Subordinate Units`，可得 159 人。

![image_057_080](images/image_057_080.png)

### 儲存結果

若某查詢產生的人群清單想給其他表單重用（例如想看「開封蔭補入仕官員」親屬網絡），可把人物清單儲存，供使用 Person ID 的表單（`LookAtKinship`、`LookAtNetworks`、`LookAtAssociationPairs`）讀入。

![image_057_081](images/image_057_081.png)

在本表單按 `Store Person IDs`，到其他表單再按 `Recall Person IDs` 即可。

若要輸出 GIS 可讀檔，選擇編碼後按 `Save to GIS`。預設存成文字檔 `entry_gis.txt`，可選 `GB18030` 或 `UTF-8`。

CBDB 也可輸出 `KML`（Google Earth 匯入標準格式）。

![image_058_082](images/image_058_082.png)

自 BF 版介面起，CBDB 也支援輸出可由 Neo4j（或其他圖資料庫）開啟的檔案組（見 https://neo4j.com/developer/graph-database/ ）。選編碼後按 `Save to Neo4j`。以前述開封例會產生 7 個 `.csv`：

    EntryCode_UTF8.csv
    KinshipCodes_UTF8.csv
    People_UTF8.csv
    PeopleEntry_UTF8.csv
    PeoplePlaces_UTF8.csv
    PeoplePlaceCodes_UTF8.csv
    Places_UTF8.csv

這 7 檔共同表現查詢資料各面向的圖結構。所有查詢表單都支援 Neo4j 輸出，但產生檔案數會依表單資料性質而異。

## D. 使用表單「Query Associations」 {: #d-associations }

`LookAtAssociations` 可檢視參與特定關係或關係類別的人物。開啟後先按 `Select Association` 選欲研究之關係類型。

![image_059_083](images/image_059_083.png)

關係類別超過 400 種，因此 CBDB 允許依 type / subtype 篩選。

![image_059_084](images/image_059_084.png)

以左側 `Scholarship` 為例，其下有 7 個子類；其中 `intellectual affiliations` 又含 17 個細類。可如入仕代碼一樣多選所需代碼。

![image_060_085](images/image_060_085.png)

也可按上方 `Select All` 全選，再按下方中央 `Select`。

![image_060_086](images/image_060_086.png)

同樣可在右下搜尋框以中英文搜尋；若第一筆不符可繼續找下一筆。下圖示例：選 `intellectual affiliation` 全部關係（1），年份 900-1400（2），再執行（3）：

![image_061_087](images/image_061_087.png)

雖 `ASSOC_DATA` 有日期欄，但多數關係缺日期，因此 LookAtAssociations 以人物 index year 判斷是否落入區間。

但用 index year 也有侷限：無 index year 者會從結果消失。可取消 `Use Index Years` 改成不依 index year 篩選：

![image_061_088](images/image_061_088.png)

可見結果由 474 增至 606。若仍需時間分析，可在結果表再按 index year 排序過濾。

LookAtAssociations 的 Associations 表有 40 欄，對應 `ASSOC_DATA` 主要資訊：

* Name (Pinyin)
* Name (Chinese)
* Index Year
* Sex
* Associated Person’s Name (Pinyin)
* Associated Person’s Name (Chinese)
* Associated Person’s Index Year
* Associated Person’s Sex
* Association Category (English)
* Association Category (Chinese)
* Association Count（建立關係的事件／對象數）
* Address (English)（通常是 index place）
* Address (Chinese)
* X-coordinate
* Y-coordinate
* Associate’s Address (English)
* Associate’s Address (Chinese)
* Associate’s X-coordinate
* Associate’s Y-coordinate
* Kinship Relation (English)（以下四欄：為親屬而建立之關係）
* Kinship Relation (Chinese)
* Kin Name (pinyin)
* Kin Name (Chinese)
* Associate’s Kinship Relation (English)（以下四欄：為對方親屬而建立之關係）
* Associate’s Kinship Relation (Chinese)
* Associate’s Kin Name (pinyin)
* Associate’s Kin Name (Chinese)
* Index Year Type (English)
* Index Year Type (Chinese)
* Dynasty (Pinyin)
* Dynasty (Chinese)
* Associate Index Year Type (English)
* Associate Index Year Type (Chinese)
* Associate Dynasty (Pinyin)
* Associate Dynasty (Chinese)
* Distance（若雙方地點座標可得，顯示兩地球面距離，公里）
* Index Type Code
* Dynasty Code
* Associate Index Type Code
* Associate Dynasty Code

除關係表外，`People in Association` 分頁會列出該關係查詢涉及的全部人物，並提供其與地點關聯資訊。

此表有 19 欄：

* Name (pinyin)
* Name (Chinese)
* Index Year
* Index Year Type (English)
* Index Year Type (Chinese)
* Dynasty (Pinyin)
* Dynasty (Chinese)
* Sex
* Index Place (pinyin)
* Index Place (Chinese)
* Index Place Type (English)
* Index Place Type (Chinese)
* X-coordinate
* Y-coordinate
* XY-count
* Person ID
* Index Year Type Code
* Dynasty Code
* Index Place Type Code

![image_063_090](images/image_063_090.png)

可按 `Save to GIS` 匯出地點資訊供 GIS 顯示。由於 association 資料本身即隱含社會網絡，也可按 `Save to Pajek` 匯出網絡供 SNA 分析。另可輸出 Gephi、UCINet；許多軟體可讀後轉其他格式。CBDB 支援不同文字編碼以輸出中文，Pajek 檔可選是否在節點標籤含 Person ID。也可輸出 Neo4j 檔。

![image_063_090](images/image_063_090.png)

### 依地點搜尋

和 LookAtEntry 一樣，LookAtAssociations 可查特定地點或地點清單人物之關係。

也同樣支援 `Use XY Reference`：以所選行政單位座標，在指定時段找出座標接近之其他單位。可選 `Narrow`（較窄）或 `Broad`（較寬）邊界框；地名改稱時特別有用。以北宋開封為例，選 Narrow 或 Broad 結果相同：

![image_064_091](images/image_064_091.png)

與其他表相同，可按 `Store Person IDs` 儲存人物，供他表重用。

![image_065_092](images/image_065_092.png)

## E. 使用表單「Query Offices Holding」 {: #e-office }

帝制中國官僚體系複雜且隨時代變化。CBDB 目前已有超過 6,000 個官碼，隨資料擴張仍會增加。核心挑戰是如何把龐雜官職聚合成可分析單位。`LookAtOffice` 同時提供階層式與功能式分群。開啟後和其他基本分析表單相似，先按左上 `Select Office`。

![image_066_093](images/image_066_093.png)

### 選擇官職

`Select Office` 表單用樹狀顯示官職分類。第一節點 `Bureaucratic Structure` 依朝代呈現官制層級，可在任一層查看並選取官職。下例顯示路級轉運使相關官職。

也可用關鍵字搜尋。由於目前僅唐、宋、元有較完整官制樹，其他朝代多尚未建立完整樹狀，建議用中文官名過濾（多數紀錄仍無英文對應）。例如篩 `鹽` 可列出各朝含「鹽」字官銜；可向上卷動找到唐代官職。和其他表單一樣可多選。

宋代轉運使司相關官職

![image_067_094](images/image_067_094.png)

含「鹽」字的唐代官職

![image_067_095](images/image_067_095.png)

過濾可做跨朝代選官。可單選特定鹽政官職，也可全選。

### 跨朝代官職選擇

可用官名過濾建立跨朝代官職清單，以便比較。例如搜尋歷代太皇太后：

![image_068_096](images/image_068_096.png)

選這些官名後，可找出 CBDB 中所有曾任太皇太后的女性：

![image_068_097](images/image_068_097.png)

### 儲存、編修與匯入官職清單

由於官制尤其跨朝代時很複雜，CBDB 支援建立可重用官職清單。先選一組初始官職，例如宋代參知政事所屬官職：

![image_069_098](images/image_069_098.png)

按 `Save Offices` 可存清單：

![image_069_099](images/image_069_099.png)

會開啟存檔對話框：

![image_070_100](images/image_070_100.png)

存成文字檔後即可自行編修：

![image_070_101](images/image_070_101.png)

檔案每列以「office ID + Tab + 其餘資訊」構成。可把不同檔案的 office ID 合併後再匯入。

![image_070_102](images/image_070_102.png)

按匯入會開啟開檔對話框：

![image_071_103](images/image_071_103.png)

表單顯示 `[[Imported List]]` 後即可據此查詢：

![image_071_104](images/image_071_104.png)

### 官職查詢

下圖示例查 `參知政事` 相關官職所有任命，不限制 index year / 朝代。由於目前 office code 仍綁定朝代，結果實際都落在宋代（但你仍可透過官名過濾組出跨朝代 code 清單）：

![image_072_105](images/image_072_105.png)

查詢會產生兩個分頁：

1. `Office Postings`：顯示所有該官職相關任命。
2. `People in Office`：列出被任命人物。

第二張表特別適合匯入 `LookAtNetworks`，分析同官職任職者社會網絡。可點左上小方塊全選，`Ctrl-C` 複製後貼到文字檔。

![image_072_106](images/image_072_106.png)

若選宋代官職卻把時間篩到明代，預期會無結果：

![image_073_107](images/image_073_107.png)

也可用年份範圍篩選任命紀錄。此功能在明代尤其有用（任命年份資料較豐富）。不限制年份時本例得 411 筆：

![image_073_108](images/image_073_108.png)

加上 1400-1500 篩選後縮為 33 筆：

![image_074_109](images/image_074_109.png)

若要看某地任官人物，可照前述流程選地點（單地、名稱過濾或匯入地址 ID 清單）後查。下例為宋代在婺州任州府職者：

![image_074_110](images/image_074_110.png)

也可反向看「某地人物在哪裡任某類官職」。下例為宋代開封人物任州府職地點：

![image_075_111](images/image_075_111.png)

亦可兩條件同時限制：宋代來自開封、且在婺州任州府職者：

![image_075_112](images/image_075_112.png)

### 匯出 GIS

若要看「任命地」或「任官者來源地」空間分布，LookAtOffice 可把兩者輸出成 GIS 可讀檔。左下可選 `UTF-8` 或 `GB18030`：

![image_076_113](images/image_076_113.png)

若結果沒有任何帶 X-Y 座標的地點資訊，就不能輸出 GIS。例：參知政事相關官錄若地點僅標「宋代」，無座標可用。

和其他表單一樣，也可輸出一組 Neo4j 用 CSV。

`Office Postings` 表有 30 欄：

* Person Name (pinyin)
* Person Name (Chinese)
* Index Year
* Sex (M or F)
* Person Index Address Type (English)
* Person Index Address Type (Chinese)
* Person Index Address (pinyin)
* Person Index Address (Chinese)
* X coordinate of Person Index Address
* Y coordinate of Person Index Address
* Office (translation)
* Office (Chinese)
* First year of appointment
* Last year of appointment
* Dynasty (Pinyin)
* Dynasty (Chinese)
* Office Address (pinyin)
* Office Address (Chinese)
* X coordinate of Office Address
* Y coordinate of Office Address
* XY count（該官職地點任命數）
* Notes
* Person ID
* Posting ID
* Office Code
* Appointment type（regular / provisional 等）
* assumption of office（是否接受任命）
* Office Address ID
* Person Address ID
* Dynasty Code

`People in Office` 表為人物基本欄：

* Person ID
* Person Name (pinyin)
* Person Name (Chinese)
* Index Year
* Sex
* Dynasty (Pinyin)
* Dynasty (Chinese)
* Index Address ID
* Index Address (pinyin)
* Index Address (Chinese)
* X coordinate of Index Address
* Y coordinate of Index Address
* Index Address Type (English)
* Index Address Type (Chinese)
* XY count（同一 index address 人數）

## F. 使用表單「Query Kinship」 {: #f-kinship }

親屬查詢比 association 或入仕查詢更複雜。個人親屬原始紀錄通常不多，CBDB 會先從這些紀錄出發，再查其親屬、親屬之親屬，如此迭代，直到達到設定條件。限制條件有兩類：

1. 最大迴圈次數（search iterations），通常 5000 足夠。
2. 親屬距離限制：

* `Max. Ancestor Gen.`：上代最大代數（父=1、祖父=2、曾祖=3）。
* `Max. Descend. Gen.`：下代最大代數（子=1、孫=2、曾孫=3）。
* `Max. Collateral Kin`：旁系橫向移動上限。例：妻妹是 marriage 1 + collateral 1；妻妹之夫之兄是 marriage 2 + collateral 2。
* `Max. Marriage Dist.`：婚姻連結上限。例：妻妹之夫 marriage 距離為 2。

為了理解上述指標，可參考下方親屬網絡（圖待補）：

(chart to be added)

以黃庭堅為例，粗線方／橢圓表示直系（父母、子女）；雙線是婚姻連結；其餘單線是旁系。在 LookAtKinship 度量下：

    Huang Yu 黃育 = FFBS（Up=2, Down=1, Collateral=1）
    Yu Hong 余宏 = FFBSDH（Up=2, Down=2, Collateral=1, Marr.=1）
    Li Cui 李萃 = MB（Up=1, Collateral=1, Marr.=1）
    Du Shenlao 杜莘老 = SDH（Down=2, Marr.=1）

LookAtKinship 會在大規模 kinship 表中反覆搜尋直到達上限，結果可能非常大。

WARNING：旁系與婚姻距離設太大，可能產生非常龐大資料集。

![image_079_114](images/image_079_114.png)

請注意，CBDB 在迭代串接關係時，會自動簡化一小組關係（B=兄弟；D=女；S=子；Z=姊妹）：

    BB -> B
    BZ -> Z
    ZB -> B
    ZZ -> Z
    SB -> S
    SZ -> D
    DB -> S
    DZ -> D

這些簡化會讓 collateral 距離減 1。

CBDB 另提供較實驗性的「親屬詞簡化演算法」，需審慎使用。勾選 `Simplify Kinship Terms` 可啟用（Appendix D 有完整簡化表）。啟用時系統會提示需再檢核。

![image_080_115](images/image_080_115.png)

中國親屬研究常關注「五服圈」。LookAtKinship 可直接勾選 `Mourning Circle` 重建資料庫中可得的服內親屬。勾選後四個距離參數會被預設並停用。

![image_080_116](images/image_080_116.png)

開始查詢前，需先選人（或群體）。有 3 種選法：

1. 召回先前儲存 person ID（Browser 單人或其他查詢儲存群組）。若 `Recall Person IDs` 可點，表示已有可用 ID。

![image_081_117](images/image_081_117.png)

按 `Recall Person IDs` 後，若是單一 ID 會載入該人；若是清單會顯示 `[Recalled List]`。再設參數執行。

2. 匯入人群 ID 清單（來自其他查詢）。例如可從 LookAtEntry 取宋代法科入仕人群，貼到 Word/Excel 編修後，將 person ID 複製成文字檔。

Note：此為新版改動。文字檔需僅含 person ID 單欄，且為 ANSI 編碼。

![image_081_118](images/image_081_118.png)
![image_081_119](images/image_081_119.png)

按 `Import People`、選檔並成功讀取後，表單如下：

![image_082_120](images/image_082_120.png)

再設參數執行。

3. 直接 `Select Person`：最直觀。點左上按鈕開搜尋表單，可用中文或拼音。和 Browser 一樣，不只查正式姓名，也查別名。輸入 `蘇東坡` 可正確定位蘇軾。

![image_082_121](images/image_082_121.png)

選好人物後，設定限制（或選 Mourning Circle），按 `Run Query`。

完成後有兩張結果表：

1. `Kinship Network`：列出查詢過程找到的所有親屬關係。

![image_083_122](images/image_083_122.png)

此表有 27 欄：

* Name (pinyin)
* Kin Name (Chinese)
* Name (Chinese)
* Index Year of Kin
* Kin Name (pinyin)
* Sex of Kin
* Kinship Relation
* Index Address Type (Chinese)
* Index Address of Person (pinyin)
* Address Type of Kin Index Address
* Index Address of Person (Chinese)
* Address Type of Kin Index Address (Chinese)
* X-Coordinate
* Distance（地址球面距離）
* Y-Coordinate
* Person ID
* Index Address of Kin (pinyin)
* Kin ID
* Index Address of Kin (Chinese)
* Index Year Type (English)
* X-Coordinate of Kin Index Address
* Index Year Type (Chinese)
* Y-Coordinate of Kin Index Address
* Kin Index Year Type (English)
* Notes
* Kin Index Year Type (Chinese)
* Index Address Type

2. `Ego-Relative Kinship`：描述第一張表每個人與最初目標人物的關係。

![image_084_123](images/image_084_123.png)

例如晁補之是蘇軾「三子之二女之夫之母兄弟」（S3D2HMB），度量 `{1,2,1,1}`。若再找晁補之弟晁將之，原始路徑會在 `{1,2,1,1}` 上再加一個 collateral 變 `{1,2,2,1}`，理應超過 collateral=1 上限；但演算法會把 `...+B` 中可化簡的部分（如 `BB -> B`）簡化，使其回到限制內而被納入。`Ego-Relative Kinship` 另有 raw path 欄可看簡化前路徑。不過 CBDB 目前只做較簡單簡化（如 `BZ -> Z`），更複雜簡化尚未實作。

與其他表單相同，可點左上角全選後複製貼到外部程式；也可右鍵欄頭排序。

最後可輸出 4 類檔：

1. UCINet（SNA）
2. Gephi（SNA）
3. Pajek（SNA，可選字碼、可選標籤含 ID）
4. GIS 檔或 KML（兩種字碼）

Gephi / UCINet 可移除零度節點（無任何連結者，常見於匯入清單時某些人無親屬資料）。GIS 輸出含 `xy_count`（同座標人數），對 GIS 視覺化很實用。另可選是否排除 ego 紀錄：若只查單人，影響小；若查人群，保留原始清單人物可能扭曲資料（尤其 `xy_count`），可考慮排除只看其親屬。

![image_085_124](images/image_085_124.png)

Pajek 預設節點與邊的顏色以與目標人物距離分級：

    Black = 目標節點
    Blue = 總親屬距離 1
    Green = 總親屬距離 2
    Orange = 總親屬距離 3
    Yellow = 總親屬距離 4
    Red = 總親屬距離 5 以上

## G. 使用表單「Query Social Networks」 {: #g-networks }

`LookAtNetworks` 是 Access 版 CBDB 最強查詢介面。可同時分析親屬與非親屬關係形成的社會網絡。可選單人、匯入人群、選地點或匯入地點清單；可選關係類型，並設定時間範圍。和 LookAtKinship 一樣，它是迭代查詢：先找第一批人物，再持續追查其與其他人物相關連結，每輪都可能擴展人群。

LookAtKinship 有 5 種距離限制；LookAtNetworks 主要只有 2 種：

1. `Max Loop #`：最大迭代輪數。
2. `Max Node Distance`：網絡中人物相對於起始群的鏈接距離。

若起始是單人，全部距離都以此人為原點；若起始是人群，整個人群都作原點；若起始是地點／地點清單，第一輪由該地點相關人物作原點。

WARNING：node distance 設太高可能產生非常大資料集。

![image_086_125](images/image_086_125.png)

NOTE：node distance=1 時，結果包含：
1. 與起始人物直接相連的人；
2. 這些人彼此間的所有關係。

這種網絡稱 ego network，常可看出即使單一人物網絡內也可能存在互相競爭子網絡。你可在結果表排序並刪除不想輸出的紀錄。

### 基本查詢流程

先決定要查哪些元素：

1. 以人物為起點
A. `Select Person`

若要看某人社會網絡，按 `Select Person` 開搜尋表單：

![image_087_126](images/image_087_126.png)

和 Browser / Query Kinship 一樣，可用字、號等各種名號搜尋。

B. 匯入人群清單

也可匯入由其他查詢定義的人群。例如取宋代法科入仕者：把 LookAtEntry 結果貼到 Word/Excel 編修後，輸出 person ID 文字檔。

Note：新版規定文字檔需僅含 person ID 單欄，ANSI 編碼。

![image_088_127](images/image_088_127.png)
![image_088_128](images/image_088_128.png)

按 `Import People`（1）匯入成功後，表單如下：

![image_088_129](images/image_088_129.png)

人物名稱兩欄（2）會顯示 `[Imported List]` 與 `[輸入的人名]`。

C. 召回前次儲存的人／人群

第三種方式是 `Recall Person IDs`：可召回 Browser 儲存單一 ID，或前次查詢儲存清單。若是單人會顯示姓名；若是清單顯示 `[Recalled List]` 與 `[召回的人名]`。

![image_089_131](images/image_089_131.png)

2. 以地點為起點

A. `Select Place`

按 `Select Place` 可開地點選擇表單。和 LookAtEntry 一樣，可用 Filter 以字首／字串挑一組地址。

![image_089_130](images/image_089_130.png)

B. 匯入地址清單

![image_089_131](images/image_089_131.png)

若要精確定義研究區域，匯入 Address ID 清單更實用；流程與匯入 person ID 相同。

除非勾選 `Restrict to Place`，地點（或地點清單）只影響第一輪起始人群定位。第一輪找到與該地點相關人物後，CBDB 便依你選的關係類型繼續擴展網絡。

若同時以「人物 + 地點」為起點，CBDB 會找出「來自指定地點、且與選定人（或人群）在指定關係類型上有連結」的人。

C. `Use XY Reference`

與其他表單一致，可勾選 `Use XY Reference`，用所選地點經緯度在指定時段擴找鄰近行政單位。

3. 決定時間範圍

直接填入欲納入人物的 index year 起訖年。

4. 選 node distance

需保守設定：node distance 增加時，人數常呈指數增長。建議先小值測試。以下示例中，僅 9 位法科入仕者，node distance=3 就超過 5000 條關係。

5. 設定最大迴圈數

CBDB 資料集大，查詢偏慢，可先用較小 `Max Loop #` 試跑。

6. 選 Kin / Non-Kin / Male / Female

LookAtKinship 不支援對匯入人群做親屬查詢；LookAtNetworks 可作替代：勾 `Kin`、取消 `Non-Kin` 即可看親屬網絡。

有時你可能想排除女性相關連結，或只看女性網絡；LookAtNetworks 也提供性別篩選。

7. 選非親屬關係類型

非親屬關係類別很多，多數對單一問題不重要，故可只選較大類：

Friendship
Family
Religion
Finance
Medicine
Military
Scholarship
Politics
Writings

後四類可再展開細分：`Military` 2 類、`Scholarship` 7 類、`Politics` 6 類、`Writings` 9 類。可自由組合；一旦選定，整個迭代過程都會套用。

設定完後執行查詢。下例以「法科入仕人群」為起點（A），年份 930-1240（B）、node distance=3（C）、max loop=10（D），且不限制 kin / non-kin 類別，允許全部關係：

![image_091_132](images/image_091_132.png)

結果網絡含 6,441 人、24,782 條關係。

![image_092_133](images/image_092_133.png)
Table of Associations in the Social Network

![image_092_134](images/image_092_134.png)
Table of People Participating in the Social Network

由於同一人物對可能有多重關係，CBDB 另在 `Aggregated Social Relations` 分頁提供每對人物單筆聚合紀錄，並附關係數：

![image_093_135](images/image_093_135.png)

若網絡太大，可收斂條件。只看該群體親屬關係時，CBDB 得 117 人、144 條連結（總 node distance=3，且受 kinship distance 限制）。

![image_093_136](images/image_093_136.png)

若只看「寫作形成的關係」、node distance=2、排除 kinship、用 dynasty 而非 index year，CBDB 得 7,699 條關係（聚合後 3,897）與 1,379 人：

![image_094_137](images/image_094_137.png)

表面上結果似乎不多不少：

![image_094_138](images/image_094_138.png)

但若在結果表向右到 `Edge Distance` 欄並排序，會發現只有前 9 筆（edge distance=0）是起始法科人群與外部人物的直接連結。起始 13 人中僅 5 人有「writing」類關係，且只連到 7 人；其中 5 個對象（如劉摯、楊簡、朱熹、張栻、樓鑰）本身網絡非常大，貢獻了大部分連結。此時可能更適合回到不限制關係的 3,897 人大網絡，再用 SNA 工具進一步篩選分析。

### Requery（再查詢）

有些使用者會把 LookAtNetworks 某次查得人群，在同一表單再作二次查詢。例：法科及第者親屬查詢得 146 人。若想看其彼此書信／著述關係，可先按 `Store Person IDs`，再立即按 `Recall Person IDs` 載入當前結果清單，接著把 non-kin 限縮到 writing 再跑。好處是該清單同時可供其他表單重用。

### 輸出結果

LookAtNetworks 可輸出到 UCINet、Pajek、Gephi。Pajek 支援中文，CBDB 提供 UTF-8 / Big-5 / GB，或純拼音輸出。GIS 亦支援中文，但顯示效果取決於系統區域設定。Pajek 預設節點／邊顏色分級如下：

    Black = 目標節點
    Blue = 距離 1
    Green = 距離 2
    Orange = 距離 3
    Yellow = 距離 4
    Red = 距離 5 以上

也可輸出 Neo4j 用 CSV 檔組。

## H. 使用表單「Query Pair-wise Associations」 {: #h-pairs }

有時你想直接判斷兩人之間是否存在社會連結，或想看由其他條件定義的人群內部是否互連，而不想先跑完整社會網絡。雖可用 LookAtNetworks 從一人起跑看另一人何時出現，但 Access 版 CBDB 提供更直接工具：`LookAtAssociationPairs`。

![image_096_139](images/image_096_139.png)

表單操作簡單：

1. 選兩個人，或匯入人群清單，或召回 Browser 儲存單人（作為 First Person）／先前查詢儲存清單。
2. 視需要設定朝代或 index year 範圍。
3. 設定允許關係型態：

1. `Allow 1-node Intermediaries`：只允許「同時直接連到兩目標」的中介（A — Node1 — B）。此時不勾兩節點中介。
2. `Allow 2-node Intermediaries`：允許 A — Node1 — Node2 — B 形式（或清單成員間同理）。需勾選 two-node intermediaries。
3. `Include Kinship relations`：預設只看社會（非親屬）關係；可勾選納入 kinship。

### 一節點中介搜尋

例：查蘇軾與程頤，只允許直接同時連到兩人的中介，會得到 21 人間 214 筆關係：

![image_097_140](images/image_097_140.png)

和 LookAtNetworks 一樣，輸出有 `Associations`（關係）與 `People in Associations`（人物）。

![image_097_141](images/image_097_141.png)

與其他表單相同，可點左上灰色小方塊全選後 `Ctrl-C` 複製：

![image_098_142](images/image_098_142.png)

也可點欄位（如 Name）後右鍵排序：

![image_098_143](images/image_098_143.png)

亦可拖曳左側灰色欄選取連續區塊儲存：

![image_099_144](images/image_099_144.png)

但若看到選取區塊下方有戴表元（1244-1310）等較晚人物，可能需收斂到「大致同時代」中介。可用 index year（朝代篩選較無助）限制為 1000-1100，結果為 14 人、112 條關係：

![image_099_145](images/image_099_145.png)

若再納入蘇軾或程頤之親屬，只會多 1 條連結、但不增人數：

![image_100_146](images/image_100_146.png)

### 兩節點中介搜尋

若放寬到兩層中介，網絡會迅速複雜。以 1000-1100 限制下，得到 123 人、1,404 條關係：

![image_100_147](images/image_100_147.png)

### 清單搜尋

若要在其他條件定義的人群中找連結，可匯入 person ID 清單。下例為元代金華有文集存世男性。匯入規則同前：ANSI 編碼、單欄 ID。

![image_101_148](images/image_101_148.png)

按 `Import List of People` 並選檔：

![image_101_149](images/image_101_149.png)

讀取成功時，表單會標示為匯入清單。若要清除，按 `Clear List of people` 回復雙 `Select` 模式。

匯入後查詢流程不變。本例設定 1200-1350、一節點中介，得 187 人、1,588 筆關係：

![image_102_150](images/image_102_150.png)

### 輸出到 SNA / GIS

和其他表單一樣，LookAtAssociationPairs 可輸出 Pajek 與 GIS 檔。`Associations` 與 `People` 表欄位與 LookAtAssociations 相同，請參見前節。

例如允許蘇軾與程頤在 1050-1120 間的一、二節點中介全部關係，可輸入 Pajek 視覺化：

![image_103_151](images/image_103_151.png)

SNA 預設節點／邊顏色規則如下：

| Nodes | Edges |
| --- | --- |
| White = 目標節點 | 目標節點發出的邊 |
| Blue = 一節點中介 | 一階到二階節點的邊 |
| Green = 二節點中介 | 二階節點間的邊（另有一條連到蘇軾的特殊線） |

輸出檔會聚合人物對之間關係，線寬反映關係數量。

## I. 使用表單「Query Place Associations」 {: #i-place }

前述表單都可在特定脈絡下提供人地關係資訊（親屬／社會關係、任官、入仕）。若想更整體看「人與地如何交會」，需更綜合的視角。例如某人曾在某地任官，而該地也是其友人之親屬籍貫地。若無跨類別聚合，這類連結難以看見。

![image_104_152](images/image_104_152.png)

`LookAtPlace` 正是此用途。它可追蹤 7 種人地關係：

1. Biographical Data：該地是否人物 index place？是否遷入？
2. Entry Data：是否在此地應試，或此地與其入仕相關？（目前資料較少）
3. Connection via Kinship：該地人物的親屬是誰？
4. Connection via Association：誰與該地人物有社會關係？
5. Place of Association：哪些社會連結在此地形成？（目前資料較少）
6. Office Posting Data：誰在此地任官？
7. Institutional Connection：誰與此地社會機構有關？

下例查金華、index year 1100-1260：

![image_105_153](images/image_105_153.png)

可選要納入哪些人地關係類型，也可設定朝代／index year／XY reference。與其他表單同，可用地名過濾或匯入地址 ID 清單。

此外，因人地關係類別很多，未必都與研究問題相關，表單允許先挑要用的類別：

![image_105_154](images/image_105_154.png)

按 `Select Categories` 開表單。可先 `Select All`，再取消不需類別，按 `Select` 關閉後執行查詢：

![image_106_155](images/image_106_155.png)

此例取消部分類別後僅少 13 筆。

輸出表有 17 欄：

1. Person name (Pinyin)
2. Person name (Chinese)
3. Index year
4. Place Name (Pinyin)
5. Place Name (Chinese)
6. Associate Name (Pinyin)
7. Associate Name (Chinese)
8. First year
9. Last year
10. Category of Place Association
11. Relation to Place within Category (English)
12. Relation to Place within Category (Chinese)
13. X coordinate
14. Y-coordinate
15. Index Year Type (English)
16. Index Year Type (Chinese)
17. Index Year Type Code

`Category` 表示該筆屬 7 種人地關係中的哪一類；`Relation` 則給出該類中的具體關係細節。例如 `Biography` 類表示人物與地點的直接傳記關係，`Relation` 會顯示 `basic affiliation`、`moved to` 等。`Associate Place` 類則表示人物來自所選地點，而 Associate 與其有社會關係，`Relation` 顯示關係細節。

若只想看特定類型關係，可勾選某些關係類別。下例僅選 Individual 與 Office Postings：

![image_107_156](images/image_107_156.png)

人物對同一地點常有多重關係；表單提供 `Aggregated People and Places` 顯示聚合結果，可看出多人與金華有多種類型連結：

![image_107_157](images/image_107_157.png)

表單也提供一張列出參與關係人物的表：

![image_108_158](images/image_108_158.png)

目前結果輸出有兩種：

a. 匯出 SNA（Pajek / UCINet / Gephi）。此選項僅在選了 Association / Associate / Kinship 類別時可用。

b. 匯出 Neo4j CSV 檔組。檔案數依你選的人地關係類別而定。

若未來有需求，可再加入 GIS 直出功能。

## J. 使用表單「Query Status」 {: #j-status }

`LookAtStatus` 是較新加入的表單，用於探索 CBDB 中人物社會區辨（status）資料。第 2 章已述，status 記錄人物在社群中獲得名望／區辨的方式。現有約 285 個代碼，分 7 大類：

    Occupation 事業
    Scholarship 學術
    Military Distinction 武功
    Imperial Clan 宗社
    Artistic Distinction 藝術
    Religious Distinction 宗教
    Life Events 時事
    Commoner Activity 布衣事

此表單沿用其他表單功能：可按朝代或 index year 過濾；可選 index place（單地或多地）；可儲存 person ID 供其他表單使用。

![image_109_159](images/image_109_159.png)

先選欲研究的 status 類別。因 status code 很多（目前約 275），`Select Status` 會先按大類分組。可整類選，或只選一到多個細項。

![image_110_160](images/image_110_160.png)

下例為明代「以繪畫為社會區辨」之 1,015 筆紀錄：

![image_110_161](images/image_110_161.png)

若只選單一 status 類型，理論上 Status 表與 People 表筆數應一致。但目前 Status 表存在重複紀錄（bug，後續版本修正）。People 表可見實際僅 893 人在明代有「畫家」status。

![image_111_162](images/image_111_162.png)

可按 `Store Person IDs` 儲存人物，供他表使用；也可按 `Save Status` 將本次 status code 清單存檔以便後用。

![image_111_163](images/image_111_163.png)

表單也支援 GIS 與 Neo4j 輸出。Neo4j 輸出呈現的是人物-身分類型二部圖（bipartite）而非人-人連結。

## K. 使用表單「Query Texts and Roles」 {: #k-texts }

`LookAtTextRoles` 可研究人物在前近代文本生產中的角色。CBDB 文本分類依《四庫全書》體系。人物與文本角色包含：

    Annotator 註疏者
    Author 撰著者
    Commentator 註釋者（含評點者）
    Compiler 編纂者
    Donor 捐助者
    Editor 編輯者
    Editorial Associate 編輯助理
    Proofreader 校對者
    Publisher 出版者
    Translator 翻譯者
    Work included in 收入Y 集

目前 CBDB 約有 31,000 筆人物-文本關係紀錄。

LookAtTextRoles 設計與其他表單相似，支援按 index year、朝代、index address 篩選。

![image_112_164](images/image_112_164.png)

先選文本類別：

![image_113_165](images/image_113_165.png)

本例選 `Rites` 類文本。最基本查詢可只用此類別、不加其他過濾：

![image_113_166](images/image_113_166.png)

執行後會列出 CBDB 在該文本類別中所記錄的所有人物角色。此例顯示儒家禮經相關文本共有 517 筆角色紀錄、涉及 282 人。例中可見呂祖謙被標為《三大禮賦注》作者。表單另提供參與者清單：

![image_114_167](images/image_114_167.png)

這些人物可按 `Store Person IDs` 儲存供其他表單分析；也可按 `Save to GIS` 匯出，觀察其地理分布。

按 `Save to Neo4j` 可匯出檔案組，進一步分析人物與文本的二部圖關係。

## L. 使用表單「Looking up Data on a Group of People」 {: #l-group }

如前述，CBDB 可依條件找出人群。`LookAtGroupData` 讓你快速提取這些人群的其他資料。

![image_115_168](images/image_115_168.png)

和其他表單一樣，可把標籤從英文切換到繁體或簡體：

![image_115_169](images/image_115_169.png)

輸入待查人群 ID 可用兩法：召回既存清單，或從檔案匯入：

![image_116_170](images/image_116_170.png)

選好 ID 群後，再選要查看的資料類型：

a. status
b. office holding
c. mode of entry into government
d. textual production
e. associations with place
（有時只需該群人物 index addresses，表單也可單獨輸出）

例如可匯入「1130-1200 間在金華縣中進士」的人群：

![image_116_171](images/image_116_171.png)

選好資料類型後按 `Search`：

![image_117_172](images/image_117_172.png)

Entry 表可見有些進士除進士科外還透過其他途徑入仕；唐仲友即為例。Status 表也可見其社會區辨類型分布，唐仲友同樣是明顯例子：

![image_117_173](images/image_117_173.png)

儲存查詢資料有三種方式：

1. 點表格左上小方塊全選，複製資料：

![image_118_174](images/image_118_174.png)

再貼到 Excel、文字檔等：

![image_118_175](images/image_118_175.png)

2. 匯出 Neo4j 檔案組。輸出檔案數量取決於所選資料類別數：

3. 匯出 GIS 可讀檔或 KML：

![image_119_176](images/image_119_176.png)

和 Neo4j 一樣，可先選要輸出的資料類型與編碼；GIS 還可選檔案格式。按 `Export to GIS` 後，表單會為每種資訊類型各產一個檔案。

若查詢輸入為匯入 ID 清單，可按 `Store Person IDs` 儲存該清單。
