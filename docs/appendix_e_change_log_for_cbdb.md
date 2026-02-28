# Appendix E. Change Log for CBDB

The Access version of CBDB was significantly reorganized with the AW release: the data and
the querying interface are now completely separate and can be updated independently. For all
more recent releases, changes in the data and in the interface are reported separately.

## Versions

## CBDB SQL Server Version 1

### Announcement
We are delighted to announce the introduction of CBDB_SS, a version of CBDB that is
identical to Version BC in its appearance and functionality, except that the data for
CBDB is now stored on a SQL Server Express database platform. SQL Server does not
have the limitation in file size in MS Access that required us to split the CBDB data
into three separate Access files and will allow us to continue to use the PC-based
version of CBDB for the foreseeable future.

The code for CBDB has been rewritten so that all queries are performed by the SQL
Server database and the results then become available to the CBDB user interface.
There are only a few insignificant (we hope) differences in behavior, and in general,
queries should run more quickly on the SQL Server version.

Users who create their own queries with MS Access Query Builder may encounter a
few problems created by inconsistencies between the versions of SQL in Access and in
SQL Server. Advanced users should consider downloading and installing MS SQL
Server Management Studio, which gives on direct access to the SQL Server CBDB
database.

## Build 20211110

### Design Change
In LookAtOffice, selecting an office now provides more information about the dynasty
of the selected office.

## Build 20210826

### Design Change
In the Browser for individuals, using pinyin now has three options:
(1) lower case: it looks for the string anywhere in the name;
(2) upper case: it looks for the string only at the beginnings of words (“Hao” will select
both Zhang Hao and Hao Jing;
(3) string beginning with “!:” it looks only at the beginning of the surname (just “Hao
Jing”)

## Build 20210609

### Bug Fixes
1. Added additional fields to ZZ_SCRATCH_BIOG_MAIN (these had been deleted
in recreating the SQL Server database from the Access database. I have added the fields
to the table in the SupplementalTablesSQL_Server.mdb file in the Migration subfolder.
2. Removed all references to `ZZZ_ALL_BIOG_ADDR`, which has been replaced in
functionality by `ZZZ_BIOG_MAIN`
3. Added the field c_kin_rel_count to ZZ_SCRATCH_KINNET_EDGE.
4. Because Access does not allow sorting of SQL Server tables opened as recordsets,
replaced all such recordset with sorted queries of the tables.

## Build 20210603

### Design Change
1. Created a filter-by-office-title function for selecting offices
2. In order to filter by office title, I added c_dy, c_dynasty, and c_dynasty_chn both to
ZZ_OFFICE_CODE and to Z_SCRATCH_DUMMY_OC.

### Bug Fixes
1. Cleared the scratch table for status codes when clicking on the highest tree level to
fix a duplicate-value bug.

## Build 20210601

This is the initial version created by using the new CBDB dataset in Access. Since
some scratch tables are unique to the SQL Server version, I have created an additional
Access file SupplementalTablesSQL_Server.mdb with those tables, which need to be
included in the migration

## CBDB Interface Version BH

### Changes
This version dynamically constructs a kinship network for the selected person in the
browser.

## CBDB Interface Version BG

### Changes
1. The ability to save and import lists of codes to be used in search has been added to
Query Associations, Query Office Holding, Query by Methods of Entry, Query
Status and Query Texts and Roles.
2. A sequence field for alternative names has been added in the browser.
3. The default value for option "Restrict to Place" for the address filter in Query Social Networks is now set to TRUE.
4. A search by office option has been added to Query Office Holding
5. The ability to select the biographical address codes one wants to use has been added to Query by Place Associations.
6. This version adds a command button to the browser that dumps the data on a person
to an HTML file.
7. A hyperlink field has been added to the Sources tab in the browser.

### Bug Fixes
1. A bug in the form for selecting entry codes in Query by Methods of Entry in which the
[All] option copied over no records to the code search list has been fixed.
2. A bug in how the dynasties filter works in Query Pair-wise Associations and Query
by Methods of Entry has been fixed.

## CBDB Interface Version BF

### Changes
1. A Neo4j export function has been added to all forms.
2. There is an accumulation of bug fixes in this release.

## CBDB Interface Version BE

### Changes
1. LookAtTexts, a form for looking at people’s role in the production of texts, has been
added.
2. LookAtGroupData, a form to quick collect data on groups of people, has been added.

## Build 20220627

### Design Changes
1. Made the changes necessary for users to export dynasty information from
LookAtKinship:
    a. Added c_dy, c_dynasty, c_dynasty_chn, c_kin_dy, c_kin_dynasty, and
    c_kin_dynasty_chn to ZZ_SCRATCH_KIN, ZZ_SCRATCH_KINNET,
    ZZ_SCRATCH_KINNET_EDGE, ZZ_SCRATCH_GEPHI_NODE, and
    ZZ_SCRATCH_GEPHI_NODE_DISTINCT
    b. Added the new fields to the forms frmZZ_SCRATCH_KIN and
    frmZZ_SCRATCH_KINNET
    c. Revised the code for exporting to UCINet and Gephi
2. Made the changes necessary for users to export dynasty information from
LookAtNetworks by revising the code for exporting to UCINet and Gephi
3. Created the form LookAtGroupData.
    a. Created tables Z_SCRATCH_DUMMY_OF,
    Z_SCRATCH_DUMMY_ENTRY, Z_SCRATCH_DUMMY_BA
    b. Added c_sequence, etc. to ZZ_SCRATCH_ENTRY
    c. Created the (sub)forms:
        ZZ_SCRATCH_GROUP_STATUS
        ZZ_SCRATCH_GROUP_OFFICE
        ZZ_SCRATCH_GROUP_ENTRY
        ZZ_SCRATCH_GROUP_TEXT
        ZZ_SCRATCH_GROUP_PLACE
    d. Added fields to `ZZZ_BIOG_ADDR_DATA`
    Created the table `ZZ_SCRATCH_BIOG_ADDR_DATA`
    e. Added a routine to rebuild `ZZZ_BIOG_ADDR_DATA` to DATA3

## Build 20220425

1. A “Simplify Kinship Terms” option has been added to Query Kinship.
2. A “Store Person ID” button has been added to the Browser, so that once the user has
selected a person, that person can be recalled for use in Query Kinship, Query Social
Networks, and Query Pair-wise Association by simply clicking on the “Recall
Person IDs” command button.

## Build 20220315

1. Information on sources for records has been added to all the forms.

## CBDB Interface Version BD

### Changes
1. The forms for selecting codes for association, entry into government service, office
titles, and status now support the multi-select option. The user can click on items in a
list to select those that are of interest.
2. The user can now filter office titles by name when selecting office. This feature replaces the earlier search function. Because the filtering produces a list of offices from different dynasties, the form now includes information about the dynasty associate with each office name.

## Build 20211102

### Design Change
1. In LookAtOffice, selecting an office now provides more information about the
dynasty of the selected office.
2. In the Browser for individuals, one can now search by Surname + Office Title in
either Chinese or in pinyin.

## Build 20210826

### Design Change
In the Browser for individuals, using pinyin now has three options:
(1) lower case: it looks for the string anywhere in the name;
(2) upper case: it looks for the string only at the beginnings of words (“Hao” will select both Zhang Hao and Hao Jing;
(3) string beginning with “!:” it looks only at the beginning of the surname (just “Hao
Jing”)

## Build 20210609

### Bug Fixes
1. Removed all references to `ZZZ_ALL_BIOG_ADDR`, which has been replaced in
functionality by `ZZZ_BIOG_MAIN`
2. Added the field c_kin_rel_count to ZZ_SCRATCH_KINNET_EDGE.

## Build 20210606

### Bug Fixes
1. Changed all references to TEXT_DATA to `BIOG_TEXT_DATA` in the Admin
Version of BD (the Used BC version had already been corrected).

## 20210603 (Initial build for BD)

### Design Change
1. Created a filter-by-office-title function for selecting offices
2. In order to filter by office title, I added c_dy, c_dynasty, and c_dynasty_chn both to
ZZ_OFFICE_CODE and to Z_SCRATCH_DUMMY_OC.

### Bug Fixes
1. Cleared the scratch table for status codes when clicking on the highest tree level to
fix a duplicate-value bug.

## CBDB Interface Version BC

### Changes
1. Index Place is now handled the way Index Year is: both are added to `BIOG_MAIN`.
Index Year derives from birth year or death year (values in `BIOG_MAIN`), if they are
known, and, if not, from data elsewhere in the system. A source code for the index
year value is included in `BIOG_MAIN`. Similarly, Index Place is derived from data in
`BIOG_ADDR_DATA`, and the type code for Index Place is included in `BIOG_MAIN`.
As a result, users should use `ZZZ_BIOG_MAIN` instead of `ZZZ_ALL_BIOG_ADDR`
as the table for building queries about people
2. Because scholars may prefer to use different categories of place association to define the
Index Place, the BC version of CBDB includes a form accessible from the Navigation
Pane through which the user can change the hierarchy of places associations used to
define Index Place. (See the explanation under the heading “Navigation Pane.”
3. Searching by dynasty behaves a bit differently. When one specifies that the “from” and
“to” dynasties are the same, for example from Yuan 元 to Yuan, the search routines
now look for data with that particular code (Yuan = 18) rather than for all dynasties that have a temporal overlap with the selected dynasty (for instance, the Yuan [1234-1367],
overlaps with the Song dynasty [960-1279]).
4. To select codes for Association, Entry, Office, Place, and Status, CBDB now allow
the user to select more than one category at a time. As a result, the form behaves a bit
differently than before: the form always moves to the bottom of the list for any type in
the right-hand list box, so that the user will need to scroll up to see the entire list. Also,
while the search function still works, it does not highlight the target record.
5. Various bugs were fixed in the behavior of the forms. In particular, the address tree
now does a better job checking and sorting out subordinate relations between
administrative units.

## CBDB Interface Version BB

### Changes
1. The Index Year has been significantly revised. It now represents the birth year of the
individual. For individuals for whom the year of birth is not known, CBDB uses a
series of calculations based on other data (see the main text for a detailed explanation).
While CBDB has derived the index year for individuals in the past, it now uses derived
index years to derive yet more index years when it is possible. The Index Year Type
Code preserves the steps in the derivation. Please note that each iteration is yet more
inaccurate, but we believe that for running queries an index year that is off by a decade
is still better than having no index year at all.
2. CBDB is now explicit that the address codes used for searches is an Index Place, a
construct analogous to Index Year. While the address codes used for searches always
have been assigned according to a hierarchy of place information, we believe that it is
better to be explicit about the status of index place. Even the “basic place affiliation”
(jiguan籍貫) has problems in its historical interpretation, so that it always remains
useful to be circumspect about the assignment of index places. They are largely—but
not entirely—reliable.
3. The approach to kinship searches has been revised. In concatenating kinship relations
in iterative searches, CBDB now automatically simplifies eight relationships:
    BB (brother’s brother)  Brother
    ZB (sister’s brother)  Brother
    BZ (brother’s sister)  Sister
    ZZ (sister’s sister)  Sister
    SB (son’s brother)  Son
    SZ (son’s sister)  Daughter
    DB (daughter’s brother)  Son
    DZ (daughter’s sister)  Daughter
    The effect of this change is that the “collateral” parameter in the relationship decreases by
    1, so that the relationship (and the person identified through the relationship) may now
    remain within the search limits specified by the user. Moreover, CBDB may identify additional new relations of the newly permitted individual who would not have appeared in the earlier version of the search.
4. CBDB now has a MS Access “Look at Status” form to allow users to explore categories
of social distinction.
5. All the MS Access query forms now permit using dynasty as a search parameter.
There remain many individuals for which CBDB lacks the data to assign an index year,
and while searches by dynasty define a rather broad time period, still it provides some
temporal specification that we believe may prove useful.

## CBDB Interface Version BA

### Changes
1. This release fixes a major bug in the way that the XY count is counted when outputting
data to Gephi.
2. This release adds the ability to export to Gephi in the Query Associations and Query
Pair-Wise Associations forms.
3. The output to Gephi now includes the XY coordinates to allow users to take advantage
of the Geographic Distribution visualization add-on in Gephi.

## CBDB Interface Version AZ

### Changes
1. Removal of the ability to filter by superior administrative unit when selecting places.
2. Addition of the ability to include or disallow the inclusion of subordinate
administrative units when running queries that involve restrictions to specific places.

## CBDB Interface Version AY

This release is effective as of 2019-04-29. Additions include:

1. Michael Fuller updated address selector to allow users to filter place names by superior
administrative units.
2. Edith Enright systematically refined our label translations in Access query interface.

## CBDB Data Release 20220312

### Changes
1. [To be Added]

## Build 20220315

1. Source information was added to `ZZZ_NONKIN_BIOG_ADDR`

## CBDB Data Release 20211222

### Changes
1. 19,286 new persons and their 3,689 alternative names, 19,576 records of entry data from the
most complete list of civil service examination passers for the Song period.(Contributor:
Yang Xu)
2. 34,574 pairs of Ming and Qing dynasties kinship relationships and 15,312 records of
postings data in Ming Dynasty from the Academia Sinica Name Authority Database.
3. 3,267 new Koryo and Choson persons in Korea history with their 6,939 alternative names,
3,031 records of social status from Chronicles and Biographies of Choson. (Contributor:
Yafei Chen)
4. 22,363 records of data from the biography chapter from Ming and Qing local
gazetteers. (Contributor: CBDB Crowdsourcing group)

## CBDB Data Release 20210525

### Changes
1. 17,000 new persons names and 10,486 social association for Ming and Qing dynasties from
Academia Sinica Name Authority Database.
2. 17,560 book titles from the Union Catalogue of Chinese Collectanea. (Contributor: Edith
Enright)
3. 20,678 entries, 2,180 alternative names and 16,020 postings information for the Ming and
Qing dynasties from local gazetteers.
4. 79 schools with 379 scholars belonging information. (Contributor: Mengxi Bi)
5. 600 new Ming and Qing persons with their data from the biography chapters in local
gazetteers were created by CBDB crowdsourcing contributors.

## CBDB Data Release 20201110

### Changes
1. The Index Year has been significantly revised. It now represents the birth year of the
individual. For individuals for whom the year of birth is not known, CBDB uses a
series of calculations based on other data. While CBDB has derived the index year for
individuals in the past, it now uses derived index years to derive yet more index years
when it is possible. The Index Year Type Code preserves the steps in the
derivation. Please note that each iteration is yet more inaccurate, but we believe that
for running queries an index year that is off by a decade is still better than having no
index year at all.
2. 417 garrison addresses for Ming dynasty. (Contributor: Ruoran Cheng)

3. 376 social status records for thinkers. (Contributor: Mengxi Bi)
4. Kinship and entry data mistakes were fixed. (Contributors: Moqin Zhou, Song Chen)
5. Added `TEXT_INSTANCE_DATA` table to collect version information of books.
(Contributors: Edith Enright, Song Chen)
6. Change TEXT_DATA table name to `BIOG_TEXT_DATA`.

## CBDB Data Release 20190424

### Changes
1. 18,124 new social assignations for Tang and Five Dynasties from The communication
poems for Tang and Five Dynasties figures唐五代人交往詩索引 with 4,380 new figures,
702 new alternative names and 671 new kinship relationships etc. (contributor: Shuhua
Zhang 張淑華, Qiong Yang 楊瓊, Yongqin Li 李永琴, Chengguo Pei 裴成國)
2. 5,895 new Tang addresses with 11,844 belongs data from General History of Chinese
Administrative Divisions中國行政區劃通史. (contributor: Chao Wei 魏
超, Yifan Wang 王一帆, Yun Xing 邢雲, Wen Luo 駱文, Yuying Yuan 袁鈺瑩)
3. 1,200 new address names with 670 new address belongs data for Jin Dynasty.
(contributor: Jingjia Qiu 邱靖嘉)
4. 1,765 new office titles for Jin dynasty. (contributor: Jingjia Qiu 邱靖嘉)

## CBDB Data Release 20180831

### Changes
1. 5,300 new persons added with 5,300 entries jiguan data, 4,000 other entries, and 2,300
alternative names from the Name Authority Database at Academia Sinica;
2. 8,000 person ID entries are mapped between CBDB and the Name Authority Database;
3. Bugs were fixed in pinyin entries and jiguan data etc.

## CBDB Interface Version AX
This release is effective as of 2018-12-14. Additions include:
1. An important feature of kinship network algorithm was added. The duplicate records
for kinship relationships can be calculated correctly in this new algorithm.
2. The query forms now have a Store Person IDs button to save the list of people created
in a query. That stored list of IDs can be recalled for use in other forms (where
relevant) through a new Recall Person IDs button.

## CBDB AW Version
This release is effective as of 2018-09-01. Changes to the interface include:
1. Michael Fuller created Relink Tables button on the Navigation panel as a new and
more efficient mechanism to connect the user interface and the backend data which is
now in three separate files with name that indicate the date of release of the data, for
example CBDB_20190424_DATA1.mdb, CBDB_20190424_DATA2.mdb,
CBDB_20190424_DATA3.mdb.
2. The database was thoroughly cleaned with the foreign key mechanism (contributor: Fu
Qunchao 傅群超);

## 20170829 CBDB AV Version
This release is effective as of 2017-09-07. Additions include:

### Data
1. 51,551 new persons with 34,447 posting from local gazetteers;
2. 467 Wuzhou jinshi degree holders from Song to Yuan dynasties;
3. 841 figures with 1,725 kinship associations and 381 social associations from 全元文，
宋濂全集，遜志齋集 etc. (contributor: Yu Wen 于文);

### Interface
1. Michael Fuller and Chen Song has designed a Rerun function in Query Social
Networks to run queries using the results from the previous query.
2. A new query function named Query Place Associations.
3. The Office holding query form now allows the user to select both the place of the
posting and the index place of the office-holder.

## 20170424 CBDB AU Version
This release is effective as of 2017-04-25. The Access interface has not changed: It
remains the AU version, but the data has been updated to the 2010425 release.
Additions include:

### Data
1. 789 Wuzhou figures with 500 biographical address data, 1,800 kinship relations and
other data from 全宋文 and 金華府志 (contributor : Du Feiran 杜斐然);
2. 700 biographical addresses, 3,000 kinship relations, 500 postings and other data from 全
元文, 宋濂全集 and 藥房樵唱 (contributor : Yu Wen 于文);

3. 6,700 figures were connected to the 明清人名權威檔案 database (contributor: Institute
of History and Philology, Academia Sinica);
4. Tang bureaucratic tree added (contributor: Lik Hang Tsui 徐力恆)
5. Fixed several mistakes in the bureaucratic and biographical data. Thanks to Chu
Pingtzu 祝平次 and Yang Guang 楊光's for reporting them.

## 20170310 CBDB AU Version
This release is effective as of 2017-03-13. Additions include:

### Data
1. Data on 8,836 Tang figures and their 15,138 postings (source: 唐九卿考, 唐刺史考全編);
2. 5,921 Tang personid were disambiguated (contributor: Wen Xin 文欣);
3. 770 figures from 全元文 (contributor: Yu Wen 于文);
4. 1498 social status data from the Tang Dynasty (source: 唐五代人物傳記資料綜合索
引);

### Interface
1. Updated User Guide with English and Chinese versions (collated by Lik Hang Tsui 徐
力恆);
2. Michael Fuller and Chu Ping-tzu rewrote several critical codes in CBDB Access
Database so that it can run on both 32-bit and 64-bit MS Windows;
3. Michael Fuller added import person id list function to the Query Mediated Associations
interface.

## 20150202 CBDB AS Version
This release is effective as of 2015-03-18. Additions to previous versions include:

### Data
1. 36,826 new persons and 38,565 new entry records of Ming and Qing Civil Service
Jinshi Degree holder (source: 明清人物題名碑);
2. 3,142 Liao Dynasty office titles with Liao office tree (contributor: Cao Liu 曹流);
3. Yuan office tree (contributor: Yi Ding 丁一, Yu Yue 于月);
4. 1,004 Song Yuan Academies (contributor: Stephen P. Ford);
5. 272 China emperors with their Posthumous Name (謚號), Honorific name (廟號);

### Interface
1. Revised Help Files.
2. Place name filter to select a set of places for search
3. Searching places based on geographic coordinates and proximity

## 20140310 CBDB AR Version
This release, on date 2014-03-10, is built upon the Oct. 8 2013 dataset. Major changes in
this version include:

### Data
1. 27,000 association data from Ming Biographical Materials (明人傳記資料索
引)(contributor: Qiaomei Tang 唐巧美 and Hui Cheng 程卉)
2. 5,000 entry data from Ming civil service high degree holders (jinshi)
3. 3,700 posting data from Ming civil service high degree holders (jinshi)
4. 3,300 books from the Ming Qing Women Writers database (MQWW) and Ming
Biographical Materials (明人傳記資料索引)
5. 2,800 address codes were updated (contributor: Yi Ding 丁一)

### Interface
1. This release also fixed minor mistakes in the posted_to_office data and altname data in
the previous standalone database.
2. In addition, new search and selection features have been added to the “LookAt” forms as
well as greater flexibility in choosing whether to use index years. All the search
routines have been rewritten in SQL to greatly speed up the searches.

## 20131008 CBDB AQ Version
This release 20131008CBDBaq.mdb, on date 2013-10-08, is built upon the Sep. 21 2013
dataset. This version adds biographical data on 200,000 new men and women to the dataset
from the 7th to the 20th century, resulting in a total number of 325,000 individuals.
Major new additions include:

### Data
1. 50,000 principals and kin from Tang and Five Dynasties tomb biographies
2. data on 14,000 civil service high degree holders (jinshi) and 130,000 of their kin from
52 Ming dynasty examination years
3. principals and kin from the 1148 and 1256 examinations

4. selected biographical data from the Index of Ming Biographical Materials (明人傳記資料索
引)
5. new data on the kin and social relations of women writers
6. a variety of new and expanded code tables
7. New data was developed through the contributions by and in collaboration with Profs.
Ping Yao, Nicolas Tackett, Liu Cheng-yun, and Grace Fong.

## CBDB Patch
[Important!] This is the patch for fixing the TreeView selection problem. If your copy of
Access gives you an error when you try to select an office via the TreeView in
LookAtOffices (Query Office Holding) or select an association in
LookAtAssociations (Query Associations), this is because you do not have the correct
version of the "Microsoft Windows Common Controls 6.0 (SP6)" added to your Visual
Basic environment.
We have prepared a document to walk you through the steps for fixing this
problem. Please download this RAR file, unzip it, and follow the instructions in the PDF
file.

## 20130610 CBDB AN Version
This release, on date 2013-07-08, is built upon the June 10th 2013 dataset which adds
biographical information for 12,773 new individuals to the January 2012 dataset and
results in 128,923 as the total number of individuals. The following lists the details of the
addition:

### Data
1. Incorporated individuals, their kin and their associates from: the Ming Qing Women
Writers database (MQWW) (contributor: Professor Grace Fong and the CBDB Beida
editors), Quan Song Wen letters全宋文書信 (contributor: Pingtzu Chu 祝平次, Beida,
Chen Liu 劉晨), Song Lian Quan Ji宋濂全集 (contributor: Qiaomei Tang 唐巧美), Ji
Yun 紀昀’s associates (contributor: Clea Walford), Lu You 陸游’s associates
(contributor: Ziyu Zhou 周子鈺), and the 1148 紹興十八年 exam passers
(contributor: Ziyu Zhou 周子鈺).
2. Collaborated with IHP, Academia Sinica 中研院史語所 to incorporated the basic
information, alternative names, and entry data for 2,912 individuals from the 明清檔
案人名權威資料 database (system number 13197 to 16110). It results in 2,134 new
individuals (because some of the them already exist in CBDB), 6,540 alternative
names, and 2,515 entry data.
3. Collaborated with IHP to incorporate the basic biographical data, alternative names, and
address data for the 9,900 individuals in the Ming Ren Chuan Ji Zi Liao Suo Yin 明人傳記資料索引, which has given us 7,400 new individuals, 15,000 alternative names,
and 8,600 biog address data.
4. Added 987 new individuals who were the kin of the subjects in the biographies section
of Song Shi 宋史.
5. Added 8,800 social association data from the Quan Song Wen letters 全宋文書信 and
114,000 associations from Index to Song Biographical Materials宋人傳記資料索引.
6. Added 14,447 posting data from the Kyoto Tang database 唐代人物知識ベース and
22,067 from Index to Yuan Biographical Materials元人傳記資料索引.

### Interface
1. From the system side, in this release we also refactored a bunch of database tables (for
example, social institutions) in order to accommodate more detailed information about
one’s life and to enable such queries.

## 20120105 CBDB AM Version
This release, on date 2013-03-14, is built upon the January 2012 dataset and the
20120105CBDBal.mdb. Major changes in this version:

### Data
1. Addition of 18,000 Tang-Wudai, Yuan, Ming, and Qing office codes.
2. Restructure of Social Institution tables: 8 code tables and 1 data table where we can
record the relation between a person and a social institution.

## 20120105 CBDB AL Version
This release 20120105CBDBal.mdb, on date 2012-08-27, is built upon the January 2012
dataset. It contains the biographical information for 116,149 historical figures in the
Chinese history. It also comes with the most up-to-date built-in queries, including the
latest revision of the Query Kinship and Query Social Network functionalities. Major
changes in this version:

### Data
1. It includes Han addresses (漢代地名) and a new Ethnicity/Tribe code table.
2. It uses the new ethnicity coding for people.

### Interface
1. "Look up Data on an Individual 按人查詢" now accepts search via alternative names. E.g.
You are able to find 蘇軾 via 蘇東坡 now.
3. Bug fixed in "Query Association 查詢社會關係" and improve the search performance.

NOTE: It is known that some of the CBDB built-in queries do not function on 64-bit
version of Microsoft Office 2010. It is because the 64-bit Office is not compatible with
former VBA programs (see the official annoucement here), which the CBDB queries
were built with. Therefore, if you are running a 64-bit Office, please consider to re-
install a 32-bit version Office 2010 on your 64-bit Windows machine. (Yes, you can
still run the 64-bit Windows Operating System). Not sure which version are you
running? Follow this link.

## 20110705 CBDB AF Version
This release, on date 2012-02-07, is the last release for the July 2011 dataset.

### Data
1. It does not add significant new data to the July 2011 release but some code tables have
been improved and duplicates have been removed.

### Interface
NOTE: Some of the built in queries do not function on 64 bit machines. This will be
corrected in the near future.
1. Bug fixed for the "Enter Biographical Data 輸入傳記資料"
2. Bug fixed in the "Look up Data on an Individual 按人查詢" buttons.
