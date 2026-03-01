# 第 2 章：CBDB 的結構

### A. 資料庫中實體的總覽 {: #a-overview }

資料庫設計會用資料表把較抽象的對象具體化；這些對象我們稱為「實體（entities）」。由於資料庫的目標是捕捉實體之間的關係資訊，因此把抽象實體與其關係所對應的資料表分開思考，仍然很有幫助。這樣一來，我們更容易反問：資料表應如何調整，才能更好地對應它所代表的實體。

在傳記資料庫中，最核心的實體當然是：

1. 人物（People）

但關聯式資料庫不只記錄人物本身，也記錄人物如何與他人、與社會（政治、社會、經濟、文化制度），以及與物理世界互動。因此，還需要把人物互動對象也視為實體。先看人與人的關係（下文會詳述）：

2. 親屬關係（Kinship）
3. 社會關係（非親屬，Social / Non-kin Associations）

接著是政治與社會文化制度及活動：

4. 身分（Status；如書法名聲、僧侶身分等社會區辨方式）
5. 進入官僚或其他職涯的途徑（如科舉、蔭補、恩蔭等）
6. 官職任命（Postings，如知縣、將領等）
7. 人物共同參與的社會機構（從寺院、書院到修城牆、築橋等）

另外，人物也透過文本被記錄、被理解：

8. 文本（Texts；含一手文本、二手研究、出土文獻／碑刻等）。
   這也包含 CBDB 擷取資訊的資料來源（原始文獻、學術整理、數位資源）。

此外，人物互動所處世界中還有必須結構化納入 CBDB 的面向；目前重點是行政地理與官僚結構：

9. 行政地理層級（以政治行政關係定義上下級單位）
10. 官僚組織（官制本身及其隨時間的變化與隸屬關係）

### B. 各類實體細節 {: #b-details }

NOTE：資料庫允許記錄資訊來源（含頁碼）與補充註記。凡是記錄人物資訊的資料項目，都帶有 source、pages、notes 等欄位。以下為避免重複，除必要處不再逐一標示。

1. 人物（People）

    a. 基本資料：姓名、性別、生年、卒年。

    生卒精確年常不可得，許多情況只知道其活動時段（floruit）。有時甚至只知年號或朝代。為保留資料精確度層級，資料庫允許在所有日期欄位使用年號資訊。可填年號中的確切年份，也可僅標示「初／中／末／不詳」。為分析用途，系統會把年號日期演算為西曆日期（生、卒、活動年及其他日期皆可），同時保留年號標註中的不確定性。

    b. 族群與部族隸屬（Ethnicity and Tribe Affiliation）

    CBDB 追蹤族群（如漢、回鶻、藏等），目前有 465 種以上代碼。代碼存於 `ETHICITY_TRIBE_CODES`，按群組與子群組整理，並收錄族稱異寫形式。

    c. 郡望／族地稱（Choronym）

    自六朝至唐，是否屬於某家族對社會地位界定極為關鍵。宋以後雖仍有「某地某氏」之祖系主張（如博陵崔氏），但社會政治效力已降低。地名與姓氏組合形成 choronym，其代碼見 `CHORONYM_CODES`。

    d. Index Year

    為運算需要，CBDB 需以單一年份定位人物於時間軸。Index Year 是分析用的人工值。早期版本多以人物「60 歲（虛歲）」推估；自 2021 資料集起，改以已知或推定出生年為基礎。計算規則建立於下列假設：

    **假設（Assumptions）**

    | Code | Assumption |
    |---|---|
    | A1 | 男性 30 歲中進士、27 歲中舉人、21 歲中秀才／生員。 |
    | A2 | 妻子比丈夫小 3 歲。 |
    | A3 | 第一胎出生時，父 30 歲、母 27 歲（依 A2）。 |
    | A4 | 男性子女出生間隔 2 年。 |
    | A5 | 男性 63 歲、女性 55 歲死亡。 |

    **依人物生卒資訊推算規則**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 1 | Ego index year = ego 出生年 |
    | Rule 2 | 若知 ego 卒年與卒年齡：index year = 卒年 - 卒年齡 |
    | Rule 3 | 若僅知卒年（依 A5）：男性 = 卒年 - 63；女性 = 卒年 - 55 |
    | Rule 4W | 女性 ego index year = 丈夫出生年 + 3（若為妾／繼室，先套用 Rule 9W） |

    **依科舉／學位年份推算規則**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 5 | index year = 進士年 - 30 |
    | Rule 5W | 女性 index year = 丈夫進士年 - 27（30 + 3 調整） |
    | Rule 6 | index year = 舉人年 - 27 |
    | Rule 6W | 女性 index year = 丈夫舉人年 - 24（27 + 3 調整） |
    | Rule 7 | index year = 秀才年 - 21 |
    | Rule 7W | 女性 index year = 丈夫秀才年 - 18（21 + 3 調整） |

    **依親屬出生年推算規則**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 8 | 若知 ego 父生年（依 A3）：index year = 父生年 + 30 |
    | Rule 9 | 若知男性 ego 最長子女生年（依 A3）：index year = 長子女生年 - 30 |
    | Rule 9W | 若知女性 ego 最長子女生年（依 A3）：index year = 長子女生年 - 27 |
    | Rule 10 | 若知兄生年（依 A4）：index year = 兄生年 + 2 |
    | Rule 11 | 若知弟生年（依 A4）：index year = 弟生年 - 2 |
    | Rule 12 | 若知男性 ego 最年長女婿生年（依 A3&A4）：index year = 女婿生年 + 3 - 30 = 女婿生年 - 27 |
    | Rule 12W | 若知女性 ego 最年長女婿生年（依 A3&A4）：index year = 女婿生年 + 3 - 27 = 女婿生年 - 24 |
    | Rule 13 | 若知祖父生年（依 A3）：index year = 祖父生年 + 60 |

    **依親屬 Index Year 推算規則**

    Note：CBDB 會迭代使用已推算出的 index year。

    | Rule | Condition / Formula |
    |---|---|
    | Rule 14 | 若知父 index year（依 A3）：ego index year = 父 index year + 30 |
    | Rule 15 | 若知男性 ego 最長子女 index year（依 A3）：ego index year = 長子女 index year - 30 |
    | Rule 15W | 若知女性 ego 最長子女 index year（依 A3）：ego index year = 長子女 index year - 27 |
    | Rule 16 | 若知兄 index year（依 A4）：ego index year = 兄 index year + 2 |
    | Rule 17 | 若知弟 index year（依 A4）：ego index year = 弟 index year - 2 |
    | Rule 18 | 若知男性 ego 最年長女婿 index year（依 A3&A4）：ego index year = 女婿 index year + 3 - 30 = 女婿 index year - 27 |
    | Rule 18W | 若知女性 ego 最年長女婿 index year（依 A3&A4）：ego index year = 女婿 index year + 3 - 27 = 女婿 index year - 24 |
    | Rule 19 | 若知祖父 index year（依 A3）：ego index year = 祖父 index year + 60 |

    記錄上述人物基本傳記資訊的主表是 `BIOG_MAIN`。每位人物在 `BIOG_MAIN` 皆有唯一 ID。

    e. Floruit 年份（活動年）

    CBDB 會記錄兩個年份：最早與最晚。當缺乏 index year 或生卒年時，文本往往仍有可定年的活動紀錄。CBDB 會記錄目前已檢視史料中可確定的最早與最晚日期。

2. 親屬關係（Kinship）

    一筆人物親屬關係包含三個核心元素（另加來源資訊）：

        person
        kin
        kinship relation

    其結構為：「人物 A 與人物 B（親屬）之間是某種親屬關係」。例如 `{Wang Anshi, Wang Anli, B-}` 表示王安石與王安禮為弟兄關係（王安禮為弟）。

    親屬關係最基礎的 10 類符號為：

        e Ego（被展開親屬網的人）
        F Father
        M Mother
        B Brother
        Z Sister
        S Son
        D Daughter
        H Husband
        W Wife
        C Concubine

    另有修飾符號與擴展記法，可表示核心家庭外的更細關係：

        + 年長（如 B+ 兄）
        - 年幼（如 Z- 妹）
        * 嗣子（adopted heir）
        ° 過繼
        ! 庶出
        ^ 繼（step-）
        ½ 同父異母／同母異父（half-）
        ~ 名義上（如 M~，嫡妻作為妾生子女名義母親）
        % 已訂婚但未成婚
        y 最幼（如 Sy 最幼子）
        1,2,3… 表示次序（如 S1/S2；W1/W2）
        n 世代不明
        G-#, G+# 直系祖先（-）或後代（+）第 # 代
        G-n, G+n, Gn 世代不明的上代／下代／未知代直系
        (Gn) G-#B, BG+# 某代直系祖先之兄弟；或其兄弟之直系後代
        K, K-#, K+#, Kn 宗族親（同代、上代、下代或世代未知）
        K-, K+ 同代宗族親中的幼／長
        P, P-#, P+#, Pn 表親系（父姐妹或母系兄弟姐妹系）同代、上代、下代或未知代
        P-, P+ 同代表親中的幼／長
        A 姻親（affinal kin）

    關係代碼存於 `KINSHIP_CODES`。CBDB 雖完整保存各種親屬變體，但在親屬網絡查詢時，會使用四個「親屬距離」指標以簡化龐雜關係詞。`KINSHIP_CODES` 中每個代碼都對應：

        up：上代距離（如父=1、祖父=2）
        down：下代距離（如子=1、孫=2）
        collateral：旁系距離（如兄弟=1，兄弟之妻之姊妹=2）
        marriage：婚姻連結距離（如妻=1，妻父之妻=2）

    因此兄弟、繼兄弟、庶兄弟、義兄弟等都可映射到同一距離集合 `{up=0; down=0; collateral=1; marriage=0}`。人物間親屬關係資料存於 `KIN_DATA`。

3. 非親屬社會關係（Non-kinship Associations）

    a. 基本非親屬關係

    其三段結構為：person + association + associate。記錄人物一生中非親屬關係的主要挑戰，是控制史料導出類別的過度增殖。

    因關係本質是「成對人物」，因此必須有對稱關係類型。也就是說，若資料庫有 `{A is the student of B}`，則也應有 `{B is the teacher of A}`。目前系統可自動生成對應反向關係。故 ASSOCIATIONS 作為實體，內部結構包括：

        Association type
        Paired Association type
        Association Categories/subcategories（目前 3 層）

    編輯者新增某關係類別時，需同時建立其反向類別。互為關係（如朋友）例外，因其反向即自身：`{A friend of B}` 等於 `{B friend of A}`。多數關係中雙方角色不同，CBDB 需保留反向類別以完整記錄雙方視角，例如：A「追隨」B，從 B 視角即為「被 A 追隨」。

    b. 中介型關係（Mediated Associations）

    某些重要關係會透過機構或第三人中介形成。CBDB 透過在 association 中加入額外欄位記錄。例如 X 請 Y 為其母撰墓誌而形成關係。為容納這類變化，`ASSOC_DATA` 的紀錄結構變得較為複雜。

    c. Association 紀錄結構

    因前近代中國社會關係常高度複雜，CBDB 的 association 表使用較多欄位：

        基本資訊
        1. Person ID
        2. Associated person ID
        3. Association code（關係類型）
        4. 建立此關係的對象／事件數

        與關係形成有關的親屬／其他關係資訊
        5. 若透過人物親屬建立關係：該親屬關係
        6. 建立此關係的該親屬 ID
        7. 若透過對方親屬建立關係：對方親屬關係
        8. 建立此關係所經由之對方親屬 ID
        9. 主張該關係存在者 ID（例如子為父提出）

        關係發生時間與地點
        10. 關係發生地 ID
        11. 若未知實際日期，則記關係序次
        12. 關係日期（可含年、月、日）

        脈絡資訊
        13. 建立關係所涉社會機構代碼
        14. 建立關係時機／場合代碼
        15. 若相關，建立關係之文本文類代碼
        16. 若相關，建立關係之作品題名
        17. 建立關係所圍繞的學術主題代碼

        來源與註記
        18. Source ID
        19. Note

4. 身分（Status）

    CBDB 有資料表記錄人物在社會中的「區辨性」（被認知為何種身分／專長）。由於年代常不精確，表中另有序位欄可記錄先後。某些社會區辨會同時含多重角色（如以書法聞名的僧人，或經營印坊的文人）。目前 CBDB 先把不同面向分列於不同類別；未來仍待研究整合。

    人物一筆 status 紀錄結構：

        Person ID
        Status code
        Status sequence
        Date
        Source information and notes

    STATUS 作為「社會經驗類別」（而非某人物在其中的具體位置）是較簡單的實體：

        Status code
        Status description
        Status category and subcategory 1
        Status category and subcategory 2

    因社會區辨會隨時代改變，CBDB 會隨納入更早／更晚時期史料持續擴充現有清單。

5. 入門方式（Modes of Entry）

    ENTRY 本身是簡單實體：名稱、類型、子類型。現階段多描述入仕，但 CBDB 也開始追蹤僧侶受戒等類別。

    然而，人物「入門事件」實例會較複雜，因不同途徑需記錄的資訊不同。若經科舉入仕，需知考試類型與及第日期（CBDB 亦記錄落第）；若因他人功績或關係入仕，還需記錄該他人及其關係。

    例如張衛三因其叔張景裔之蔭補入仕，則可記為：

        Person: [ID of] Zhang Weisan
        Entry type: [code for] yin
        Entry relation type: [code for] Uncle
        Entry relation: [ID of] Zhang Jingyi

    又因也可能透過非親屬關係獲得入仕機會，「entry event」亦需容納非親屬關係欄位。最終 ENTRY 事件有多個屬性，但每筆實例通常只用到其中部分：

        Person ID
        Entry type code
        Entry relation type code（for kin）
        Entry associate type code（for non-kin）
        Entry associate ID（kin / non-kin 共用）
        Entry test date（西曆與年號＋年，若可得）
        Entry test ranking
        Entry address ID

6. 官職與任命（Offices and Postings）

    CBDB 目前列有 32,000 以上官名，並收錄其在唐、宋、元、明、清官僚體系中的位置。POSTINGS 是人物、官僚體系、地點三者交會的實體：人物在特定時點，於特定地點任某階官職。

    但實務上常有一職跨多行政單位，或一任命同時含多個官銜。依「一對多需拆表」原則（即一個 posting 可有多地址、亦可對應多官職），POSTINGS 需外加兩類一對多關係表：

    除基本 postings 主表外，另有：
    - posted-to-office（人物在該 posting 中對應哪些官職）
    - posted-to-office-address（人物／官職／地點關係）

    **Posting-Data**

        Posting ID（唯一值）
        Person ID
        Source and Notes

    **Posted-to-Office**

        Posting ID
        Office ID
        Appointment Type（正式、代理、榮銜等）
        Sequence（常只知任職先後，不知確切年份）
        Year（西曆與年號＋年；同一任內也可能增兼職）
        Sources and Notes

    **Posted-to-Address**

        Posting ID
        Office ID
        Address ID

    未來發展考量：

        1. 佛教與道教官職體系

        後續將把佛教、道教官僚位置納入 OFFICE / POSTINGS，
        但此事仍需大量研究以釐清兩套官僚體系歷史變化。

        2. 追蹤官僚結構的歷史變遷

        一個重要設計問題是：應在資料庫中捕捉中國帝制官僚體系多少複雜度。
        從漢到清，常見「官名不變、職掌變」或「職掌近似、官名變」。
        也有學者批評 Hucker《官職辭典》傾向在官名上強加功能連續性。
        但其英譯官名可索引，對不讀中文者仍具檢索價值。
        CBDB 規劃建立資料表以記錄特定官名所指功能之歷史變化。
        （即把 **Office Name** 與 **Office Function** 分成兩個實體。）
        對 CBDB 分析力而言，某一時點官職的細節職掌通常不是最核心；
        更重要的是：(1) 官職所代表的俸秩／實權、
        (2) 向哪個官職匯報、
        (3) 官職類型（中央軍職、州府文職等）。
        CBDB 目前已部分收錄此類資訊，但釐清官名演變本身仍是大型研究工作。

7. 地點（Places）

    CBDB 的地點編碼策略承襲 CHGIS（China Historical Geographic Information System）專案，並以 `ADDRESSES` 這個空間實體為核心。所謂 address，是指「具歷史時效的地名指稱」，且特指行政轄區。

    雖然縣、州、府等行政轄區本有面積邊界，CBDB 目前以行政治所座標作為地址表示，不直接提供邊界；邊界資料可由 CHGIS 下載。若邊界或名稱改變，需建立新 address 紀錄（新 ID）。

    這些歷史 address 也屬於行政層級。此資訊存於 `belongs-to` 表（功能相當於 CHGIS 的 `part-of`）。address ID 只有在單位形狀或名稱改變時才會改；僅因其上級行政單位變更，不改 address ID。故至少有兩張表：

    **Address Code**

        Address code
        Address name
        Administrative type
        X coordinate
        Y coordinate
        Address first year
        Address last year

    **Belongs to**

        Address code
        Belongs-to Address code
        Belongs-to first year
        Belongs-to last year

    由這兩表，CBDB 生成更便於檢索的 `Addresses` 表（線上版使用，獨立版亦可查），可輔助理解行政單位在官僚結構中的位置。其結構：

        Address code
        Address name
        Address first year（隸屬上級單位起始年）
        Address last year（隸屬上級單位終止年）
        Administrative type
        X coordinate
        Y coordinate
        belongs1（直屬上級）
        belongs2（上上級）
        belongs3
        belongs4
        belongs5

    為了跨朝比較長時段趨勢，資料庫需能追蹤同一地理位置在長時間中的變化。CBDB 因而依賴空間座標（x-y）資料。[^gis-xy] 分析表單允許以選定地址之 x-y 為中心建立方框，找出跨時期落入方框內的其他地址，再依指定時段做查詢。

    再次強調：CBDB 使用的是「行政治所」的 x-y 座標。

    Note：在 GIS 研究中，經緯度常以 x-y 座標表示。

8. 人物地理資訊（Biographical Place Information）

    人物與地點有多種連結：出生、居住、死亡、埋葬、任官、置產經商、旅行等。由於這些地點資訊源自 CBDB 不同活動表（如任官、財產），因此分散在多張表中，不在單一表內。人物與地點相關主要表如下：

        人物基本地點資訊（`BIOG_ADDR_DATA`）
        任官地點（`POSTED_TO_ADDR_DATA`）
        非親屬關係發生地（`ASSOC_DATA`）
        參與社會機構所在地（`BIOG_INST_DATA`）

    CBDB 的 LookAtPlace 表單可整合這些地點來源進行查詢。需注意：目前 CBDB 尚未系統性保存人物短暫停留地、受教育地、寫作地等資訊。

    CBDB 會嘗試給每位人物指定一個 index place。和 index year 一樣，這是依可得資訊推定；但資料常不完整，因此 CBDB 以地點關係類別層級來決定人物 index place。若可得，優先採「基本籍貫」。目前預設順序：

    1. 基本籍貫
    2. 戶籍地（明代）
    3. 落籍
    4. 最後已知地址
    5. 遷入地
    6. 八旗（清代）
    7. 替代性基本籍貫
    8. 流放地

    但這套層級對特定研究不一定最適。CBDB 允許使用者自行調整順序。詳見 Appendix X。

9. 文本（Texts）

    資料庫關注三大類文本：銘刻與其他出土／古文字材料、印刷本一手文本、二手學術研究（紙本與數位）。

    像黃宗羲《宋元學案》這類作品，同時是對前代文獻的學術彙編與其自身作品；而碑刻類材料亦常出自資料庫關注作者。對前近代文本而言，這些分類邊界並不清楚、也未必實用。因此 CBDB 以單一 TEXTS 實體統一處理。

    文本常見屬性包括：

        title
        文本型態（銘刻、手稿／印本）
        genre（當代常見書目分類）
        現行出版日期
        現行出版者
        現行出版地

    人物可與文本形成多種角色關係：

        author
        publisher
        editor
        collator
        translator
        annotator

    文本相關資料表：

    **Texts Codes**

        Text ID
        Text Name
        Date of composition
        Current status: extant or not
        Current Publication Information（if extant）

    **Text Data**

        Text ID
        Person ID
        Role ID（from `TEXT_ROLE_CODES`）

10. 社會機構（Social Institutions）

    人物以多種方式參與社群生活。例如某人曾任書院山長多年；該書院在同期有學生，其角色差異即形成重要社會連結。書院亦有捐助者參與興建與維持，進而圍繞機構形塑社群。佛寺與道觀也有類似模式。

    CBDB 正在建立可同時捕捉此類資訊與史料不確定性的記錄方式。舉例而言，同名「開元寺」至少有 39 座。某傳記資料可能僅說王安石曾捐資修繕「開元寺」，但未必可立刻確定是哪一座。日後或許可由其他資料釐清；在此之前，CBDB 會先記錄為「某一開元寺」。目前用四張表記錄：

    **Social Institution Names**

        Institution Name ID
        Institution Name

    **Social Institutions**

        Institution Name ID
        Institution Code（每個機構唯一 ID：名稱可變，但機構本體由 ID 識別；若史料顯示改名在當時被視為新機構，CBDB 也會給新 institution code）
        Institution Type ID
        Institution Dates（若可得，含起訖年，以及最早／最晚見證年份）

    **Social Institution Addresses**

        Institution Name ID
        Institution Code
        Address ID（以行政單位表示大致位置）
        XY-coordinates（可比 Address ID 更精確；機構可能在同一地區內搬遷）
        Address Type（由 Address ID 推導或獨立記錄）
        Address Dates

    **Relationship of People to Institutions**

        Person ID
        Institution Name ID
        Institution Code（若僅知機構名稱，該欄記 0）
        Institutional Role Code
        Role Dates

[^gis-xy]: 在 GIS 研究中，經度與緯度通常稱為 x-y 座標。
