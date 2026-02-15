# CBDB 数据新增建议：张礼父子神道碑（《陇右文博》2022-1）

## 1. 方案概览（基于 user guide + MCP 实库）
- 采用 CBDB 的“人（`BIOG_MAIN`）-文本（`TEXT_CODES`）-来源（`BIOG_SOURCE_DATA`）-关系（`KIN_DATA`）-仕历（`POSTING_DATA` + `POSTED_TO_OFFICE_DATA`）”范式。
- 先新增文本来源，再新增/补人物与关系，最后补仕历，避免直接覆盖旧数据。
- 史料原文片段写入相应记录的 `c_notes` 字段。

## 2. 史料依据与置信度

| 数据点 | 史料依据（节录） | 置信度 | 说明 |
|---|---|---|---|
| 张礼（碑主）存在，且为张伯仪之父 | “公讳礼…嗣子伯仪…张伯仪亡父礼” | 高 | 关系直接明示。 |
| 张礼卒年为开元二十一年（733） | “开元廿有一年冬十一月旬有一日，倾逝于家之正寝” | 高 | 年份明确。 |
| 张礼获赠官：光禄少卿、殿中监 | “恩制赠光禄少卿…乃赠殿中监” | 高 | 赠官明确。 |
| 张伯仪历任节度留后/节度使等 | “十一年春正月，充岭南节度留后。十二年夏五月，正授节度” | 中高 | 年份明确，官名在碑文中清楚。 |
| 张伯仪加御史大夫 | “其年秋九月，又加御史大夫” | 中高 | 官名明确。 |
| 张伯仪任安南邕府两管经略使 | “拜侍御史兼安南都护…充安南邕府两管经略使” | 中 | 碑文有残缺，但官名主体可识别。 |
| 颜真卿为撰者，魏瓊为书丹/篆额 | “颜真卿撰…魏琼书并篆额” | 高 | 题名直接明示。 |
| 合并 `445971 -> 194940`（张伯仪重复） | 两者同名同朝，`194940`已有多条来源/仕历而 `445971` 为空 | 中 | 为去重建议，需人工终审。 |

## 3. SQL 变更包

### 3.1 `verify_pre.sql`
```sql
-- 预检查：同名、重复、已有关联
SELECT c_personid, c_name_chn, c_dy, c_birthyear, c_deathyear, c_notes
FROM BIOG_MAIN
WHERE c_name_chn IN ('張禮', '張伯儀', '顏真卿', '魏瓊');

SELECT c_personid, c_kin_id, c_kin_code, c_source, c_pages
FROM KIN_DATA
WHERE c_personid = 194940 AND c_kin_code = 75;

SELECT c_personid, c_office_id, c_firstyear, c_source, c_pages
FROM POSTED_TO_OFFICE_DATA
WHERE c_personid = 194940
  AND c_office_id IN (10499, 10469, 10472, 912, 10463);

SELECT c_textid, c_title_chn, c_text_type_id, c_text_dy
FROM TEXT_CODES
WHERE c_title_chn LIKE '%張公神道碑銘并序%'
   OR c_title_chn LIKE '%陇右文博%'
   OR c_title_chn LIKE '%隴右文博%';
```

### 3.2 `forward.sql`
```sql
START TRANSACTION;

-- 统一标签，便于回滚
SET @tag := 'ai_proposal_zhang_stele_20260215';

-- 既有人物：张伯仪（主ID）与颜真卿
SET @pid_boyi := 194940;
SET @pid_yan  := 95025;

-- 新ID（建议执行时再次确认）
SET @next_person := (SELECT IFNULL(MAX(c_personid), 0) + 1 FROM BIOG_MAIN);
SET @pid_zhangli := @next_person;
SET @pid_weiqiong := @next_person + 1;

SET @next_text := (SELECT IFNULL(MAX(c_textid), 0) + 1 FROM TEXT_CODES);
SET @tid_article := @next_text;
SET @tid_stele := @next_text + 1;

SET @next_posting := (SELECT IFNULL(MAX(c_posting_id), 0) + 1 FROM POSTING_DATA);
SET @post_10499 := @next_posting;      -- 经略使（767）
SET @post_10469 := @next_posting + 1;  -- 节度留后（776）
SET @post_10472 := @next_posting + 2;  -- 节度使（777）
SET @post_912   := @next_posting + 3;  -- 御史大夫（772）
SET @post_10463 := @next_posting + 4;  -- 节度副大使知节度事（780）

-- A) 新增文本：研究论文 + 碑文文本
INSERT INTO TEXT_CODES
(
  c_textid, c_title_chn, c_title, c_text_type_id, c_text_dy, c_bibl_cat_code,
  c_source, c_pages, c_notes, c_created_by
)
SELECT
  @tid_article,
  '唐故张府君神道之碑考释',
  'Tang gu Zhang fujun shendao zhi bei kaoshi',
  '0203', 0, 0,
  0,
  '《陇右文博》2022•1（总第69期）15-19页',
  '原文摘录：\"碑文记录了碑主张礼及其子张伯仪的生平事迹\"；\"此碑撰文者为颜真卿\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM TEXT_CODES WHERE c_title_chn = '唐故张府君神道之碑考释'
);

INSERT INTO TEXT_CODES
(
  c_textid, c_title_chn, c_title, c_text_type_id, c_text_dy, c_bibl_cat_code,
  c_source, c_pages, c_notes, c_created_by
)
SELECT
  @tid_stele,
  '唐故处士赠光禄少卿殿中监张公神道碑铭并序',
  'Tang gu chushi zeng guanglu shaoqing dianzhongjian Zhang gong shendao beiming bing xu',
  '010215', 6, 6,
  @tid_article,
  '见《陇右文博》2022•1:15-19',
  '原文摘录：\"公讳礼\"；\"张伯仪亡父礼\"；\"颜真卿撰，魏琼书并篆额\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM TEXT_CODES WHERE c_title_chn = '唐故处士赠光禄少卿殿中监张公神道碑铭并序'
);

-- B) 新增人物：张礼（碑主，父）与魏瓊（书并篆额）
INSERT INTO BIOG_MAIN
(
  c_personid, c_name_chn, c_name, c_surname_chn, c_surname, c_mingzi_chn, c_mingzi,
  c_dy, c_female, c_deathyear, c_dy_nh_year, c_notes, c_created_by
)
SELECT
  @pid_zhangli, '張禮', 'Zhang Li', '張', 'Zhang', '禮', 'Li',
  6, 0, 733, 21,
  '原文摘录：\"公讳礼\"；\"开元廿有一年冬十一月旬有一日，倾逝于家之正寝\"；\"赠光禄少卿…乃赠殿中监\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_MAIN
  WHERE c_name_chn = '張禮' AND c_dy = 6 AND c_deathyear = 733
);

INSERT INTO BIOG_MAIN
(
  c_personid, c_name_chn, c_name, c_surname_chn, c_surname, c_mingzi_chn, c_mingzi,
  c_dy, c_female, c_notes, c_created_by
)
SELECT
  @pid_weiqiong, '魏瓊', 'Wei Qiong', '魏', 'Wei', '瓊', 'Qiong',
  6, 0,
  '原文摘录：\"儒林郎守京兆府咸阳县令魏琼书并篆额\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_MAIN
  WHERE c_name_chn = '魏瓊' AND c_dy = 6
);

-- C) 人物-文本来源
INSERT INTO BIOG_SOURCE_DATA
(c_personid, c_textid, c_pages, c_notes, c_main_source, c_created_by)
SELECT @pid_boyi, @tid_stele, '15-19', '原文摘录：\"张伯仪亡父礼\"；\"十一年春正月，充岭南节度留后\"。', 1, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_SOURCE_DATA WHERE c_personid=@pid_boyi AND c_textid=@tid_stele AND c_pages='15-19'
);

INSERT INTO BIOG_SOURCE_DATA
(c_personid, c_textid, c_pages, c_notes, c_main_source, c_created_by)
SELECT @pid_zhangli, @tid_stele, '15-19', '原文摘录：\"公讳礼\"；\"开元廿有一年…倾逝\"。', 1, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_SOURCE_DATA WHERE c_personid=@pid_zhangli AND c_textid=@tid_stele AND c_pages='15-19'
);

INSERT INTO BIOG_SOURCE_DATA
(c_personid, c_textid, c_pages, c_notes, c_main_source, c_created_by)
SELECT @pid_yan, @tid_stele, '15-19', '原文摘录：\"颜真卿撰\"。', 0, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_SOURCE_DATA WHERE c_personid=@pid_yan AND c_textid=@tid_stele AND c_pages='15-19'
);

INSERT INTO BIOG_SOURCE_DATA
(c_personid, c_textid, c_pages, c_notes, c_main_source, c_created_by)
SELECT @pid_weiqiong, @tid_stele, '15-19', '原文摘录：\"魏琼书并篆额\"。', 0, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_SOURCE_DATA WHERE c_personid=@pid_weiqiong AND c_textid=@tid_stele AND c_pages='15-19'
);

-- D) 文本角色（撰者/书者）
INSERT INTO BIOG_TEXT_DATA
(c_textid, c_personid, c_role_id, c_source, c_pages, c_notes, c_created_by)
SELECT @tid_stele, @pid_yan, 1, @tid_stele, '15-19', '原文摘录：\"颜真卿撰\"。', @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_TEXT_DATA
  WHERE c_textid=@tid_stele AND c_personid=@pid_yan AND c_role_id=1
);

INSERT INTO BIOG_TEXT_DATA
(c_textid, c_personid, c_role_id, c_source, c_pages, c_notes, c_created_by)
SELECT @tid_stele, @pid_weiqiong, 0, @tid_stele, '15-19', '原文摘录：\"魏琼书并篆额\"（书丹/篆额）。', @tag
WHERE NOT EXISTS (
  SELECT 1 FROM BIOG_TEXT_DATA
  WHERE c_textid=@tid_stele AND c_personid=@pid_weiqiong AND c_role_id=0
);

-- E) 父子关系：张伯仪 -> 张礼（父）
INSERT INTO KIN_DATA
(c_personid, c_kin_id, c_kin_code, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, @pid_zhangli, 75, @tid_stele, '15-19',
  '原文摘录：\"张伯仪亡父礼\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM KIN_DATA
  WHERE c_personid=@pid_boyi AND c_kin_id=@pid_zhangli AND c_kin_code=75
);

-- F) 补张伯仪仕历（碑文明示，采用已存在官职码）
-- 1) 经略使（office_id=10499），大历二年=767
INSERT INTO POSTING_DATA (c_posting_id, c_personid, c_created_by)
SELECT @post_10499, @pid_boyi, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10499 AND c_firstyear=767 AND c_source=@tid_stele
);

INSERT INTO POSTED_TO_OFFICE_DATA
(c_personid, c_office_id, c_posting_id, c_firstyear, c_dy, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, 10499, @post_10499, 767, 6, @tid_stele, '15-19',
  '原文摘录：\"大历二年秋七月，拜侍御史兼安南都护…充安南邕府两管经略使\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10499 AND c_firstyear=767 AND c_source=@tid_stele
);

-- 2) 节度留后（office_id=10469），大历十一年=776
INSERT INTO POSTING_DATA (c_posting_id, c_personid, c_created_by)
SELECT @post_10469, @pid_boyi, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10469 AND c_firstyear=776 AND c_source=@tid_stele
);

INSERT INTO POSTED_TO_OFFICE_DATA
(c_personid, c_office_id, c_posting_id, c_firstyear, c_dy, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, 10469, @post_10469, 776, 6, @tid_stele, '15-19',
  '原文摘录：\"十一年春正月，充岭南节度留后\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10469 AND c_firstyear=776 AND c_source=@tid_stele
);

-- 3) 节度使（office_id=10472），大历十二年=777
INSERT INTO POSTING_DATA (c_posting_id, c_personid, c_created_by)
SELECT @post_10472, @pid_boyi, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10472 AND c_firstyear=777 AND c_source=@tid_stele
);

INSERT INTO POSTED_TO_OFFICE_DATA
(c_personid, c_office_id, c_posting_id, c_firstyear, c_dy, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, 10472, @post_10472, 777, 6, @tid_stele, '15-19',
  '原文摘录：\"十二年夏五月，正授节度\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10472 AND c_firstyear=777 AND c_source=@tid_stele
);

-- 4) 御史大夫（office_id=912），大历七年=772
INSERT INTO POSTING_DATA (c_posting_id, c_personid, c_created_by)
SELECT @post_912, @pid_boyi, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=912 AND c_firstyear=772 AND c_source=@tid_stele
);

INSERT INTO POSTED_TO_OFFICE_DATA
(c_personid, c_office_id, c_posting_id, c_firstyear, c_dy, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, 912, @post_912, 772, 6, @tid_stele, '15-19',
  '原文摘录：\"大历七年…又加御史大夫\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=912 AND c_firstyear=772 AND c_source=@tid_stele
);

-- 5) 节度副大使知节度事（office_id=10463），建中元年=780
INSERT INTO POSTING_DATA (c_posting_id, c_personid, c_created_by)
SELECT @post_10463, @pid_boyi, @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10463 AND c_firstyear=780 AND c_source=@tid_stele
);

INSERT INTO POSTED_TO_OFFICE_DATA
(c_personid, c_office_id, c_posting_id, c_firstyear, c_dy, c_source, c_pages, c_notes, c_created_by)
SELECT
  @pid_boyi, 10463, @post_10463, 780, 6, @tid_stele, '15-19',
  '原文摘录：\"岭南节度副大使、知节度事\"。',
  @tag
WHERE NOT EXISTS (
  SELECT 1 FROM POSTED_TO_OFFICE_DATA
  WHERE c_personid=@pid_boyi AND c_office_id=10463 AND c_firstyear=780 AND c_source=@tid_stele
);

-- G) 可选：张伯仪重复ID合并（先人工复核后执行）
INSERT INTO MERGED_PERSON_DATA
(c_personid, c_merged_from_personid, c_notes, c_source, c_pages, c_created_by)
SELECT
  194940, 445971,
  '去重建议：同名同朝（張伯儀/唐），194940有多条来源与仕历，445971为空壳记录。',
  @tid_stele, '15-19', @tag
WHERE NOT EXISTS (
  SELECT 1 FROM MERGED_PERSON_DATA
  WHERE c_personid=194940 AND c_merged_from_personid=445971
);

COMMIT;
```

### 3.3 `verify_post.sql`
```sql
-- 人物
SELECT c_personid, c_name_chn, c_dy, c_deathyear, c_notes
FROM BIOG_MAIN
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215'
   OR c_personid IN (194940, 95025);

-- 文本
SELECT c_textid, c_title_chn, c_text_type_id, c_text_dy, c_notes
FROM TEXT_CODES
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

-- 人物-文本来源
SELECT c_personid, c_textid, c_pages, c_main_source, c_notes
FROM BIOG_SOURCE_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

-- 文本角色
SELECT c_textid, c_personid, c_role_id, c_notes
FROM BIOG_TEXT_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

-- 亲属关系
SELECT c_personid, c_kin_id, c_kin_code, c_source, c_notes
FROM KIN_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

-- 仕历
SELECT p.c_posting_id, p.c_personid, o.c_office_id, o.c_firstyear, o.c_source, o.c_notes
FROM POSTING_DATA p
JOIN POSTED_TO_OFFICE_DATA o ON p.c_posting_id = o.c_posting_id
WHERE p.c_created_by = 'ai_proposal_zhang_stele_20260215';

-- 去重建议记录
SELECT c_personid, c_merged_from_personid, c_notes
FROM MERGED_PERSON_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';
```

### 3.4 `rollback.sql`
```sql
START TRANSACTION;

-- 先删依赖表
DELETE FROM MERGED_PERSON_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM POSTED_TO_OFFICE_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM POSTING_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM KIN_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM BIOG_TEXT_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM BIOG_SOURCE_DATA
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM TEXT_CODES
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

DELETE FROM BIOG_MAIN
WHERE c_created_by = 'ai_proposal_zhang_stele_20260215';

COMMIT;
```

## 4. 风险与执行顺序
- 风险等级：中。主要风险是同名人误并、碑文残缺导致个别官职年份解释偏差。
- 执行顺序：`verify_pre.sql` -> `forward.sql` -> `verify_post.sql`。
- 回滚触发：若出现误并（194940/445971）或官职映射争议，执行 `rollback.sql`。
