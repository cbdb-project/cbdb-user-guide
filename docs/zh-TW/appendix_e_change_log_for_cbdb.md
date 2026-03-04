# 附錄 E：CBDB 變更記錄

CBDB 的 Access 版本在 AW 版做了重大重構：資料與查詢介面已完全分離，可各自獨立更新。自此之後，資料更新與介面更新分開記錄。

## 版本

## CBDB SQL Server Version 1

### 公告
我們很高興宣布推出 CBDB_SS。此版本在外觀與功能上與 BC 版相同，唯一差異是 CBDB 資料改存放於 SQL Server Express 平台。SQL Server 不受 MS Access 檔案大小限制，因此不必再把 CBDB 資料拆成三個 Access 檔，也讓我們能在可預見未來持續使用 PC 版 CBDB。

CBDB 程式碼已重寫為由 SQL Server 端執行所有查詢，再把結果回傳給 CBDB 使用者介面。行為上僅有少數（希望是可忽略的）差異，整體查詢速度通常較 SQL Server 版更快。

若使用者在 MS Access Query Builder 自行撰寫查詢，可能會遇到 Access SQL 與 SQL Server SQL 不一致帶來的問題。進階使用者可考慮安裝 MS SQL Server Management Studio，以直接操作 SQL Server 版 CBDB 資料庫。

### Build 20211110

**設計變更**

在 LookAtOffice 中，選取官職後會顯示更多該官職所屬朝代資訊。

### Build 20210826

**設計變更**

在人物 Browser 中，拼音查詢改為三種模式：
(1) 全小寫：在姓名任意位置比對字串；
(2) 首字母大寫：僅在詞首比對（例如「Hao」會找出 Zhang Hao 與 Hao Jing）；
(3) 以「`!:`」開頭：只比對姓氏開頭（例如僅匹配「Hao Jing」）。

### Build 20210609

**錯誤修正**

1. 在 `ZZ_SCRATCH_BIOG_MAIN` 新增額外欄位（由 Access 版遷移 SQL Server 時曾遺失）。已將欄位加入 Migration 子資料夾中的 `SupplementalTablesSQL_Server.mdb`。
2. 移除所有 `ZZZ_ALL_BIOG_ADDR` 參照；其功能已由 `ZZZ_BIOG_MAIN` 取代。
3. 在 `ZZ_SCRATCH_KINNET_EDGE` 新增欄位 `c_kin_rel_count`。
4. 因 Access 不支援對以 recordset 開啟的 SQL Server 表進行排序，已改為對資料表使用排序查詢。

### Build 20210603

**設計變更**

1. 新增依官名篩選官職功能。
2. 為支援官名篩選，於 `ZZ_OFFICE_CODE` 與 `Z_SCRATCH_DUMMY_OC` 新增 `c_dy`、`c_dynasty`、`c_dynasty_chn`。

**錯誤修正**

1. 點擊最高樹層時會清空 status codes 暫存表，以修正重複值 bug。

### Build 20210601

此為使用新 CBDB dataset 在 Access 建立的初始版本。因部分暫存表為 SQL Server 版專用，另建立 `SupplementalTablesSQL_Server.mdb`，遷移時需一併納入。

## CBDB Interface Version BH

### 變更
Browser 目前可為選定人物動態建立親屬網絡。

## CBDB Interface Version BG

### 變更
1. Query Associations、Query Office Holding、Query by Methods of Entry、Query Status、Query Texts and Roles 均新增「儲存／匯入代碼清單」功能。
2. Browser 新增別名順序欄位。
3. Query Social Networks 的地址篩選選項 `Restrict to Place` 預設改為 `TRUE`。
4. Query Office Holding 新增按官職搜尋。
5. Query by Place Associations 新增可選用的人物地址代碼功能。
6. Browser 新增可將人物資料匯出為 HTML 檔的按鈕。
7. Browser 的 Sources 分頁新增超連結欄位。

### 錯誤修正
1. 修正 Query by Methods of Entry 的入仕代碼選擇表單中，[All] 未把紀錄複製到代碼搜尋清單的 bug。
2. 修正 Query Pair-wise Associations 與 Query by Methods of Entry 的朝代篩選 bug。

## CBDB Interface Version BF

### 變更
1. 全部表單新增 Neo4j 匯出功能。
2. 此版累積多項 bug 修正。

## CBDB Interface Version BE

### 變更
1. 新增 LookAtTexts（檢視人物在文本生產中的角色）。
2. 新增 LookAtGroupData（快速彙整群體人物資料）。

### Build 20220627

### 設計變更
1. 為支援 LookAtKinship 匯出朝代資訊：
    a. 在 `ZZ_SCRATCH_KIN`、`ZZ_SCRATCH_KINNET`、`ZZ_SCRATCH_KINNET_EDGE`、`ZZ_SCRATCH_GEPHI_NODE`、`ZZ_SCRATCH_GEPHI_NODE_DISTINCT` 新增 `c_dy`、`c_dynasty`、`c_dynasty_chn`、`c_kin_dy`、`c_kin_dynasty`、`c_kin_dynasty_chn`。
    b. 在 `frmZZ_SCRATCH_KIN` 與 `frmZZ_SCRATCH_KINNET` 表單新增相關欄位。
    c. 修訂匯出 UCINet 與 Gephi 的程式碼。
2. 為支援 LookAtNetworks 匯出朝代資訊，修訂匯出 UCINet 與 Gephi 程式碼。
3. 建立 LookAtGroupData 表單。
    a. 建立資料表 `Z_SCRATCH_DUMMY_OF`、`Z_SCRATCH_DUMMY_ENTRY`、`Z_SCRATCH_DUMMY_BA`。
    b. 在 `ZZ_SCRATCH_ENTRY` 新增 `c_sequence` 等欄位。
    c. 建立（子）表單：
        `ZZ_SCRATCH_GROUP_STATUS`
        `ZZ_SCRATCH_GROUP_OFFICE`
        `ZZ_SCRATCH_GROUP_ENTRY`
        `ZZ_SCRATCH_GROUP_TEXT`
        `ZZ_SCRATCH_GROUP_PLACE`
    d. 在 `ZZZ_BIOG_ADDR_DATA` 增加欄位，並建立 `ZZ_SCRATCH_BIOG_ADDR_DATA`。
    e. 新增將 `ZZZ_BIOG_ADDR_DATA` 重建到 DATA3 的流程。

### Build 20220425

1. Query Kinship 新增 `Simplify Kinship Terms` 選項。
2. Browser 新增 `Store Person ID`。選定人物後，可透過 `Recall Person IDs` 在 Query Kinship、Query Social Networks、Query Pair-wise Association 直接叫回。

### Build 20220315

1. 所有表單新增來源資訊顯示。

## CBDB Interface Version BD

### 變更
1. 關係、入仕方式、官名、status 代碼選擇表單均支援多選。
2. 選官時可依名稱篩選官職，取代舊搜尋功能。因篩選會列出跨朝代官名，表單同步顯示各官名所屬朝代資訊。

### Build 20211102

### 設計變更
1. LookAtOffice 選官後會顯示更多朝代資訊。
2. 人物 Browser 新增可用「姓氏 + 官銜」搜尋，支援中文與拼音。

### Build 20210826

#### 設計變更
人物 Browser 拼音查詢三種模式：
(1) 全小寫：任意位置比對；
(2) 首字母大寫：詞首比對（`Hao` 可找出 Zhang Hao 與 Hao Jing）；
(3) 以 `!:` 開頭：只比對姓氏開頭（如 Hao Jing）。

### Build 20210609

#### 錯誤修正
1. 移除所有 `ZZZ_ALL_BIOG_ADDR` 參照，改由 `ZZZ_BIOG_MAIN` 取代。
2. 在 `ZZ_SCRATCH_KINNET_EDGE` 新增欄位 `c_kin_rel_count`。

### Build 20210606

#### 錯誤修正
1. BD 管理版中所有 `TEXT_DATA` 參照改為 `BIOG_TEXT_DATA`（使用者 BC 版已先修正）。

### 20210603（BD 初始建置）

#### 設計變更
1. 新增依官名篩選官職。
2. 為此在 `ZZ_OFFICE_CODE` 與 `Z_SCRATCH_DUMMY_OC` 新增 `c_dy`、`c_dynasty`、`c_dynasty_chn`。

#### 錯誤修正
1. 點擊最高樹層時清空 status codes 暫存表，以修正重複值 bug。

## CBDB Interface Version BC

### 變更
1. Index Place 改採與 Index Year 相同處理方式：兩者都加入 `BIOG_MAIN`。Index Year 若有出生／死亡年（`BIOG_MAIN`）則由此導出，否則由系統其他資料推算，並在 `BIOG_MAIN` 記錄 index year source code。Index Place 同樣由 `BIOG_ADDR_DATA` 推導，並把 Index Place 的類型代碼寫入 `BIOG_MAIN`。因此人物查詢建議使用 `ZZZ_BIOG_MAIN`，而非 `ZZZ_ALL_BIOG_ADDR`。
2. 因研究者對 Index Place 的定義偏好可能不同，BC 版在 Navigation Pane 提供表單，可調整用以定義 Index Place 的地點關聯層級（見「Navigation Pane」說明）。
3. 朝代搜尋行為調整：當 from/to 指定為同一朝代（如元到元）時，現在只找該朝代代碼（元=18），不再找與該朝代時間重疊的其他朝代（例如元與宋重疊）。
4. Association、Entry、Office、Place、Status 的代碼選擇已支援多選。表單行為因此略有不同：右側清單會定位到底部，需手動上捲查看完整內容；搜尋功能仍可用，但不再高亮目標紀錄。
5. 修正多項表單 bug。特別是地址樹在檢查與整理行政單位上下級關係方面更準確。

## CBDB Interface Version BB

### 變更
1. Index Year 大幅修訂，現代表人物出生年。若出生年未知，CBDB 依其他資料推算。雖 CBDB 以往也會推算 index year，現版更進一步可用已推算的 index year 再推算其他人物，並由 Index Year Type Code 保留推導步驟。每次迭代都會增加誤差，但就查詢用途而言，「誤差約十年」仍優於「完全無 index year」。
2. CBDB 明確把查詢使用的地址代碼定義為 Index Place（類似 Index Year 的建構值）。雖查詢地址代碼一向依地點資訊層級指定，但明確化更有助於解讀。即使「基本籍貫（jiguan）」本身在史料詮釋上仍有問題，因此使用 index place 仍應保持審慎；其可靠性整體高，但非絕對。
3. 親屬搜尋策略調整。CBDB 在迭代串接親屬關係時，會自動簡化 8 種關係：
    BB（兄之兄）-> 兄
    ZB（姊妹之兄）-> 兄
    BZ（兄之姊妹）-> 姊妹
    ZZ（姊妹之姊妹）-> 姊妹
    SB（子之兄弟）-> 子
    SZ（子之姊妹）-> 女
    DB（女之兄弟）-> 子
    DZ（女之姊妹）-> 女
    此變更會使關係中的 collateral 參數減 1，部分關係因而可落入使用者設定範圍；同時也可能帶出舊版不會出現的新關係。
4. 新增 MS Access `Look at Status` 表單，供探索社會區辨類別。
5. 全部 MS Access 查詢表單新增「朝代」作為查詢參數。對於尚無法給定 index year 的人物，朝代搜尋雖較粗略，但仍提供可用的時間範圍。

## CBDB Interface Version BA

### 變更
1. 修正匯出 Gephi 時 XY 計數方式的重大 bug。
2. Query Associations 與 Query Pair-Wise Associations 新增匯出 Gephi 功能。
3. Gephi 匯出現包含 XY 座標，便於使用 Gephi 的 Geographic Distribution 視覺化外掛。

## CBDB Interface Version AZ

### 變更
1. 移除依上級行政單位篩選地點功能。
2. 新增可在地點受限查詢中選擇是否納入下級行政單位。

## CBDB Interface Version AY

本版於 2019-04-29 生效，新增：

1. Michael Fuller 更新地址選擇器，支援依上級行政單位篩選地名。
2. Edith Enright 系統化修訂 Access 查詢介面的標籤翻譯。

## CBDB Data Release 20220312

### 變更
1. [待補]

### Build 20220315

1. 在 `ZZZ_NONKIN_BIOG_ADDR` 加入來源資訊。

## CBDB Data Release 20211222

### 變更
1. 新增 19,286 名人物；其 3,689 筆別名；另新增 19,576 筆宋代最完整科舉及第名單相關入仕資料。（Contributor: Yang Xu）
2. 新增明清親屬關係 34,574 對，以及明代任官資料 15,312 筆（來源：中研院人名權威資料庫）。
3. 新增韓國高麗與朝鮮史人物 3,267 人、別名 6,939 筆、社會 status 3,031 筆（來源：朝鮮列傳等）。（Contributor: Yafei Chen）
4. 新增明清地方志傳記章節資料 22,363 筆。（Contributor: CBDB Crowdsourcing group）

## CBDB Data Release 20210525

### 變更
1. 由中研院人名權威資料庫新增明清人物 17,000 名與社會關係 10,486 筆。
2. 新增《中國叢書聯合目錄》書名 17,560 條。（Contributor: Edith Enright）
3. 由地方志新增明清入仕資料 20,678 筆、別名 2,180 筆、任官資訊 16,020 筆。
4. 新增學校 79 所及學者隸屬資訊 379 筆。（Contributor: Mengxi Bi）
5. CBDB 眾包貢獻者新增明清人物 600 名及相關傳記資料。

## CBDB Data Release 20201110

### 變更
1. Index Year 大幅修訂，改代表出生年。出生年未知者以其他資料推算；且可利用已推算 index year 再推算其他人物。Index Year Type Code 保留推導步驟。每次迭代都會增加不精確性，但就查詢用途而言，約十年誤差仍優於無 index year。
2. 新增明代衛所地址 417 筆。（Contributor: Ruoran Cheng）
3. 新增思想家社會 status 376 筆。（Contributor: Mengxi Bi）
4. 修正 kinship 與 entry data 錯誤。（Contributors: Moqin Zhou, Song Chen）
5. 新增 `TEXT_INSTANCE_DATA` 表以收錄書籍版本資訊。（Contributors: Edith Enright, Song Chen）
6. `TEXT_DATA` 更名為 `BIOG_TEXT_DATA`。

## CBDB Data Release 20190424

### 變更
1. 新增唐五代社會交往資料 18,124 筆（來源：《唐五代人交往詩索引》），並新增人物 4,380 名、別名 702 筆、親屬關係 671 筆等。（contributors: Shuhua Zhang、Qiong Yang、Yongqin Li、Chengguo Pei）
2. 新增唐代地址 5,895 筆與隸屬資料 11,844 筆（來源：《中國行政區劃通史》）。（contributors: Chao Wei、Yifan Wang、Yun Xing、Wen Luo、Yuying Yuan）
3. 新增金代地名 1,200 筆與地址隸屬資料 670 筆。（contributor: Jingjia Qiu）
4. 新增金代官名 1,765 筆。（contributor: Jingjia Qiu）

## CBDB Data Release 20180831

### 變更
1. 自中研院人名權威資料庫新增人物 5,300 名，含 jiguan 資料 5,300 筆、其他入門資料 4,000 筆、別名 2,300 筆。
2. 新增 CBDB 與人名權威資料庫之 person ID 對應 8,000 筆。
3. 修正拼音、jiguan 等資料錯誤。

## CBDB Interface Version AX

本版於 2018-12-14 生效，新增：
1. 親屬網絡演算法重要改進：可正確計算親屬重複紀錄。
2. 各查詢表單新增 `Store Person IDs`，可保存查詢產生的人物清單；並可在其他相關表單用 `Recall Person IDs` 叫回。

## CBDB AW Version

本版於 2018-09-01 生效，介面變更：
1. Michael Fuller 在 Navigation panel 新增 `Relink Tables`，以更有效率方式重新連接使用者介面與後端資料。後端資料現分為三個檔，檔名含資料發布日期，例如 `CBDB_20190424_DATA1.mdb`、`CBDB_20190424_DATA2.mdb`、`CBDB_20190424_DATA3.mdb`。
2. 資料庫以 foreign key 機制完成全面清理。（contributor: Fu Qunchao）

## 20170829 CBDB AV Version

本版於 2017-09-07 生效，新增：

### Data
1. 由地方志新增人物 51,551 名與任官資料 34,447 筆。
2. 新增宋至元婺州進士 467 人。
3. 自《全元文》《宋濂全集》《遜志齋集》等新增人物 841 名、親屬關係 1,725 筆、社會關係 381 筆。（contributor: Yu Wen）

### Interface
1. Michael Fuller 與 Song Chen 在 Query Social Networks 設計 `Rerun` 功能，可用前次查詢結果再查。
2. 新增 Query Place Associations。
3. Office holding 查詢表單可同時選擇任所地點與任官者 index place。

## 20170424 CBDB AU Version

本版於 2017-04-25 生效。Access 介面未變，仍為 AU；資料更新至 2010425 版。新增：

### Data
1. 自《全宋文》《金華府志》新增婺州人物 789 名、人物地址 500 筆、親屬關係 1,800 筆等。（contributor: Du Feiran）
2. 自《全元文》《宋濂全集》《藥房樵唱》新增人物地址 700 筆、親屬關係 3,000 筆、任官資料 500 筆等。（contributor: Yu Wen）
3. 連接中研院「明清人名權威檔案」資料庫人物 6,700 名。（contributor: Institute of History and Philology, Academia Sinica）
4. 新增唐代官僚樹。（contributor: Lik Hang Tsui）
5. 修正多項官僚與傳記資料錯誤。感謝 Chu Pingtzu 與 Yang Guang 回報。

## 20170310 CBDB AU Version

本版於 2017-03-13 生效，新增：

### Data
1. 新增唐代人物 8,836 名與任官資料 15,138 筆（來源：`唐九卿考`、`唐刺史考全編`）。
2. 完成 5,921 筆唐代人物歧異消解。（contributor: Wen Xin）
3. 新增《全元文》人物 770 名。（contributor: Yu Wen）
4. 新增唐代社會 status 1,498 筆（來源：`唐五代人物傳記資料綜合索引`）。

### Interface
1. 更新中英文 User Guide（collated by Lik Hang Tsui）。
2. Michael Fuller 與 Chu Ping-tzu 重寫 Access Database 多項關鍵程式碼，使其可在 32-bit 與 64-bit MS Windows 執行。
3. Michael Fuller 在 Query Mediated Associations 介面新增匯入 person ID 清單功能。

## 20150202 CBDB AS Version

本版於 2015-03-18 生效，相較前版新增：

### Data
1. 新增明清進士 36,826 人與入仕紀錄 38,565 筆（來源：`明清人物題名碑`）。
2. 新增遼代官名 3,142 筆與遼代官僚樹。（contributor: Cao Liu）
3. 新增元代官僚樹。（contributors: Yi Ding, Yu Yue）
4. 新增宋元書院 1,004 所。（contributor: Stephen P. Ford）
5. 新增中國皇帝 272 人及其謚號、廟號。

### Interface
1. 修訂 Help Files。
2. 新增地名篩選，便於選取一組地點做查詢。
3. 新增基於地理座標與鄰近性的地點搜尋。

## 20140310 CBDB AR Version

本版（2014-03-10）基於 2013-10-08 資料集，主要變更如下：

### Data
1. 新增明人傳記資料索引關係資料 27,000 筆。（contributors: Qiaomei Tang、Hui Cheng）
2. 新增明代進士入仕資料 5,000 筆。
3. 新增明代進士任官資料 3,700 筆。
4. 新增書籍資料 3,300 筆（來源含 MQWW 與《明人傳記資料索引》）。
5. 更新地址代碼 2,800 筆。（contributor: Yi Ding）

### Interface
1. 修正前版 standalone database 中 posted_to_office 與 altname 資料的小錯誤。
2. `LookAt` 表單新增搜尋／選擇功能，並在是否使用 index year 上提供更高彈性。所有搜尋程序改以 SQL 重寫，大幅提升速度。

## 20131008 CBDB AQ Version

本版 `20131008CBDBaq.mdb`（2013-10-08）基於 2013-09-21 資料集。新增第 7 至 20 世紀男女人物傳記資料約 200,000 筆，總人物達 325,000。主要新增：

### Data
1. 新增唐五代墓誌主體人物與親屬 50,000 筆。
2. 新增明代 52 科進士約 14,000 人及其親屬約 130,000 筆。
3. 新增 1148 與 1256 年科舉主體人物與親屬資料。
4. 新增《明人傳記資料索引》精選傳記資料。
5. 新增女性作家的親屬與社會關係資料。
6. 新增與擴充多種代碼表。
7. 新資料由 Ping Yao、Nicolas Tackett、Liu Cheng-yun、Grace Fong 等教授共同合作貢獻。

## CBDB Patch

[Important!] 這是修正 TreeView 選取問題的補丁。若你在 LookAtOffices（Query Office Holding）用 TreeView 選官，或在 LookAtAssociations（Query Associations）選關係時出現錯誤，通常是因為 Visual Basic 環境中未安裝正確版本的 `Microsoft Windows Common Controls 6.0 (SP6)`。

我們已準備文件逐步說明修正方式。請下載此 RAR、解壓後依 PDF 指示操作。

## 20130610 CBDB AN Version

本版（2013-07-08）基於 2013-06-10 資料集；在 2012-01 資料集基礎上新增 12,773 名人物，使總數達 128,923。新增內容：

### Data
1. 納入 MQWW、`全宋文` 書信、`宋濂全集`、紀昀關係人、陸游關係人、1148 紹興十八年及第者等人物及其親屬、社會關係資料。
2. 與中研院史語所合作，納入明清檔案人名權威資料庫（系統號 13197-16110）中 2,912 人基本資料、別名與入仕資料；其中新增人物 2,134 名（其餘已在 CBDB）、別名 6,540 筆、入仕資料 2,515 筆。
3. 與史語所合作納入《明人傳記資料索引》9,900 人基本傳記、別名、地址資料；新增人物 7,400 名、別名 15,000 筆、人物地址資料 8,600 筆。
4. 新增《宋史》列傳主體人物之親屬 987 人。
5. 新增社會關係資料：`全宋文書信` 8,800 筆、`宋人傳記資料索引` 114,000 筆。
6. 新增任官資料：京都唐代人物資料庫 14,447 筆、`元人傳記資料索引` 22,067 筆。

### Interface
1. 系統層面重構多組資料表（如 social institutions），以容納更細緻的人生資訊並支援相應查詢。

## 20120105 CBDB AM Version

本版（2013-03-14）基於 2012-01 資料集與 `20120105CBDBal.mdb`。主要變更：

### Data
1. 新增唐五代、元、明、清官職代碼 18,000 筆。
2. 重構 Social Institution 資料表：8 個 code tables + 1 個 data table，用以記錄人物與社會機構關係。

## 20120105 CBDB AL Version

本版 `20120105CBDBal.mdb`（2012-08-27）基於 2012-01 資料集，含中國歷史人物 116,149 名，並整合最新內建查詢功能（含 Query Kinship 與 Query Social Network 最新修訂）。主要變更：

### Data
1. 納入漢代地名與新 Ethnicity/Tribe 代碼表。
2. 人物資料改用新族群編碼。

### Interface
1. `Look up Data on an Individual 按人查詢` 現可用別名搜尋（例如可用「蘇東坡」查到蘇軾）。
3. 修正 `Query Association 查詢社會關係` bug 並提升搜尋效能。

NOTE：已知部分 CBDB 內建查詢在 Microsoft Office 2010 64-bit 版本無法運作。原因是 64-bit Office 與舊版 VBA 程式不相容（見官方公告），而 CBDB 查詢是以該 VBA 架構建立。若你使用 64-bit Office，請考慮在 64-bit Windows 上改裝 32-bit Office 2010（仍可保留 64-bit Windows 作業系統）。若不確定版本，請依連結檢查。

## 20110705 CBDB AF Version

本版（2012-02-07）是 2011-07 資料集最後一次釋出。

### Data
1. 相對 2011-07 版未新增重大資料，但改進若干 code tables 並移除重複資料。

### Interface
NOTE：部分內建查詢在 64-bit 機器上無法運作，近期將修正。
1. 修正 `Enter Biographical Data 輸入傳記資料` bug。
2. 修正 `Look up Data on an Individual 按人查詢` 按鈕 bug。
