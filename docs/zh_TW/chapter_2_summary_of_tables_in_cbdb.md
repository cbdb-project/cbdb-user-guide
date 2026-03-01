## CBDB 資料表總覽

1. 基礎實體（Basic Entities）

這些資料表代表中國前近代社會世界中的基本要素。每一類實體都有更複雜的歷史與結構，並由其他輔助資料表補充說明。CBDB 透過次級資料表記錄人物與這些世界面向的互動。

| Table Name | Description |
|------------|-------------|
| `ADDR_CODES` | 中國行政地理中的行政單位 |
| `ADDRESSES` | 方便檢視行政層級的參照表 |
| `ASSOC_CODES` | 連結人物的非親屬社會關係 |
| `BIOG_MAIN` | 中國前近代人物主表 |
| `ENTRY_CODES` | 人物進入制度／機構的途徑 |
| `KINSHIP_CODES` | 中國前近代的親屬關係類別 |
| `OFFICE_CODES` | 政府官僚組織中的職官單位 |
| `SOCIAL_INSTITUTION_CODES` | 書院、寺院、宮觀等社會機構清單 |
| `STATUS_CODES` | 人物獲得社會區辨（聲望／身分）的方式 |
| `TEXT_CODES` | 前近代文獻與重要二手研究文獻 |

2. 基礎實體之間的關係

| Table Name | Description |
|------------|-------------|
| `ADDR_BELONGS_DATA` | 行政單位階層結構資料 |
| `ALTNAME_DATA` | 人物別名與多重名稱 |
| `ASSOC_DATA` | 人物之間的非親屬關係 |
| `BIOG_ADDR_DATA` | 人物與行政地理之間的關係 |
| `BIOG_INST_DATA` | 人物與社會機構之間的關係 |
| `BIOG_SOURCE_DATA` | 定義某人物 CBDB 資料所用來源清單 |
| `BIOG_TEXT_DATA` | 人物與文本之間的關係 |
| `ENTRY_DATA` | 人物與制度間的入門／起始關係 |
| `KIN_DATA` | 連結人物的親屬關係 |
| `OFFICE_TYPE_TREE` | 官僚組織的階層結構 |
| `POSTED_TO_ADDR` | 人物、官職與地點之間的關係 |
| `POSTING_DATA` | 任官資料主容器表（人物連到官職） |
| `POSTED_TO_OFFICE_DATA` | 人物與官職連結的細部資料 |
| `STATUS_DATA` | 人物在社會區辨體系中的位置資料 |

3. 關係類型資訊

| Table Name | Description |
|------------|-------------|
| `BIOG_ADDR_CODES` | 人物與地點關係的類型碼 |
| `ALTNAME_CODES` | 人物名稱類型碼 |
| `APPOINTMENT_TYPE_CODES` | 任命關係類型（正授、代理、試用等） |
| `ASSOC_TYPES` | 將多種非親屬關係碼分群的上位類別 |
| `ASSUME_OFFICE_CODES` | 標示人物是否實際就任 |
| `BIOG_INST_CODES` | 人物在機構中的角色類型 |
| `ENTRY_TYPE` | 將入仕／入門碼分群的上位類別 |
| `EXTANT_CODES` | 來源文獻存佚與可得程度 |
| `GENRE_CODES` | 文獻的書目分類 |
| `GENRE_TYPES` | 書目分類的上位類別 |
| `LITERARYGENRE_CODES` | 文學作品體裁 |
| `OCCASION_CODES` | 人物參與事件類型 |
| `OFFICE_TYPES` | 官職類型 |
| `SCHOLARLYTOPICS_CODES` | 學術／知識主題分類 |
| `SOCIAL_INSTITUTION_ADDR_TYPES` | 機構地址類型（實際或推導） |
| `SOCIAL_INSTITUTION_TYPES` | 社會機構類型 |
| `STATUS_TYPE` | 社會區辨類型 |
| `TEXT_BIBLCAT_CODES` | 文本文獻更細緻分類 |
| `TEXT_BIBLCAT_TYPES` | 文本文獻較大分類單位 |
| `TEXT_ROLE_CODES` | 人物與文本關係角色類型 |
| `YEAR_RANGE_CODES` | 日期精確度等級 |

4. 歷史輔助資料表

| Table Name | Description |
|------------|-------------|
| `CHORONYM_CODES` | 中古家族「地名 + 姓氏」標識碼 |
| `COUNTRY_CODES` | 資料中出現的國名代碼 |
| `DYNASTIES` | 朝代與歷史時期代碼 |
| `ETHNICITY_TRIBE_CODES` | 資料中族群／部族代碼 |
| `GANZHI_CODES` | 六十甲子干支代碼 |
| `KIN_MOURNING` | 五服體系下各種親屬與服喪義務代碼 |
| `MEASURE_CODES` | 物品、貨幣、書籍與空間量度代碼 |
| `NIAN_HAO` | 年號代碼 |
| `SOCIAL_INSTITUTION_ALTNAMES` | 社會機構別名清單 |
| `SOCIAL_INSTITUTION_ALTNAMES_TYPES` | 機構別名類型代碼 |

5. 分析用輔助資料表

| Table Name | Description |
|------------|-------------|
| `ASSOC_CODE_TYPE_REL` | 特定社會關係碼與其上位類別的對應 |
| `ENTRY_CODE_TYPE_REL` | 特定入門方式碼與其上位類別的對應 |
| `GENRE_CODE_TYPE_REL` | 特定文類碼與其上位類別的對應 |
| `OFFICE_CODE_TYPE_REL` | 特定官職與官僚階層的對應 |
| `OFFICE_CATEGORIES` | 官職類別（品秩、榮銜等） |
| `STATUS_CODE_TYPE_REL` | 特定身分類型碼與上位社會區辨類別的對應 |
| `TEXT_BIBLCAT_CODE_TYPE_REL` |  |

6. 「反正規化」（Denormalized）資料表

由於基礎實體關係資料表（上方第 2 類）採正規化設計，並以代碼對應其他實體、關係與歷史資訊表，因此直接查詢較不方便（見第 4 章）。為簡化查詢撰寫，CBDB 提供一組已將代碼補上實際值（多為人物、地名、官職等文字）的資料表。主要如下：

| Table Name | Description |
|------------|-------------|
| `ZZZ_ALT_NAME_DATA` | 補上別名類型 |
| `ZZZ_BIOG_ADDR_DATA` | 補上地址與地址類型 |
| `ZZZ_BIOG_MAIN` | 補上年號與族群資訊 |
| `ZZZ_BIOG_NAME_OFFICE` | 連結姓氏與任官名稱（用於搜尋） |
| `ZZZ_BIOG_TEXT_DATA` | 補上人物姓名、人物角色與文本資料 |
| `ZZZ_ENTRY_DATA` | 補上人物姓名、入仕類型等 |
| `ZZZ_KIN_BIOG_ADDR` | 親屬關係表，並提供 index place |
| `ZZZ_NONKIN_BIOG_ADDR` | 社會關係表，並提供 index place |
| `ZZZ_POSTED_TO_ADDR_DATA` | 補上人物姓名、官職名稱與地址資訊 |
| `ZZZ_POSTED_TO_OFFICE_DATA` | 補上人物姓名與官職資訊 |
| `ZZZ_STATUS_DATA` | 補上人物姓名與身分描述 |
