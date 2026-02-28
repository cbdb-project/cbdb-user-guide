## Chapter 4. Advanced Query Techniques

The Access version of CBDB permits a variety of increasingly complex and powerful
approaches to analyzing the data. The first level of advanced query simply is to use the output
from one form as the input for a second search. The next step, taken when one has become
relatively familiar with the data structures in CBDB, is to use the Access built-in Query
Design form to create free-form queries. As one’s command of the concepts of SQL
(Structured Query Language) deepens, one can create ever more sophisticated queries. This
chapter considers one example of using the output from CBDB forms as input for other
queries and then introduces the basic ideas of SQL and illustrates them through an example
that requires two steps in query design.
### A. Kinship Networks for Examination Graduates in Putian, Fujian during the Song
One question in the study of social history during the Song dynasty is whether local elites
remained stable and controlled access to the cultural resources needed to gain entrance to
official status or whether there was in fact social mobility where marginal families managed to
join the elite stratum through the educational success of their sons. To explore this question,
one can look at the kinship structures for those who entered government service through
examinations in localities at different times during the Song and see if there is any change in
organization. In our example, we consider Putian in Fujian during two periods: 1050-1100
and 1200-1250. We first use the LookAtEntry form:

2
1
4
3
5

The procedure is:
(1) Use Select Entry to choose all types in the category of “Examination” 科舉門.
(2) Set the range of examinations first to 1050-1100. (Here I show 1200-1250.)
(3) Use Select Place to choose Putian 莆田 during the Song Dynasty.
(4) Run the Query
(5) Use Store Person IDs to copy the IDs of the selected people into a temporary table.
Once you have the table of the IDs of people from Putian who entered government through
examination for the specified period, open the form LookAtKinship and have the form read
the stored table of people for 1050-1100:
Here, the procedure is:
(1) Recall the list of people IDs with the Recall Person IDs command button at the top of
the form.
(2) You will get confirmation that the table was correctly imported when you see “[Recalled
List].”
(3) Set the kinship parameters to 2 up, 2 down, 1 collateral, and 1 marriage.
(4) After you run the query, save the results into a Pajek file that uses UTF-8 encoding. Set
the output to not include 0-degree nodes (nodes with no connections to other nodes).
(5) Repeat the process for the people from 1200-1250 and create a second Pajek file.
Open your Social Network program and “Draw” the results. In this example we use Pajek:

The initial layout for visualizing networks in Pajek is “Circular.” A more useful layout for
looking at groups of kinship networks is to select “Separate Components” in the “Kamada-
Kawai” layout listings.
When one select and closely looks at the components of the kinship networks for men
from Putian who passed an examination for the years 1050-1100 and 1200-1250, one gets:
Putian Examination Kinship Networks, 1050-1100

Putian Examination Kinship Networks, 1200-1250
Note that by the later period, the “principal component” (the largest component in the
network) has grown to include not only a Fang 方, Chen 陳, and Lin 林 clan, but also
members of Zheng 鄭 and Gu 顧 clans. The Song 宋 surname largely has disappeared. In the
diagrams, the white nodes are the men who passed the examinations, and the blue squares are
their kin.
### B. Using the Access Query Designer
Another extremely powerful capacity built into Access is the ability to design SQL queries to
look at the CBDB data from whatever angle you wish. There are a few concepts to master, but
the Query Designer in Access allows end-users to begin to explore the data without any
knowledge of SQL (Structured Query Language). As you become more familiar with
queries, you can learn more about the formalisms to help you work with the data better.
In order to use the Query Designer, you will need some knowledge of the tables in
CBDB and their relations to one another. We have simplified some of the tasks by creating a
set of tables that are “denormalized,” that is, where we have added descriptive fields to explain
the codes in the fields that rely on IDs. For example, the table `BIOG_ADDR_DATA` records
lists of places associated with individuals: where they were born, where their “basic affiliation”
was, where they moved, where they were buried, etc. The key information for each record,
however, is a set of three codes: a person ID, an address ID, and an address type ID. We have
created a second table, `ZZZ_BIOG_ADDR_DATA`, that takes information from other
tables (`BIOG_MAIN`, `ADDR_CODES`, `BIOG_ADDR_CODES`) to give the name of the
person, the name of the place, and the description of the type of address, along with other

useful data. Using these tables with descriptions and codes simplifies the task of building a
useful query. The tables are:
1. `ZZZ_ALT_NAME_DATA`
(fills in alternate name type)
2. `ZZZ_BIOG_ADDR_DATA`
(fills in address and address type)
3. `ZZZ_BIOG_MAIN`
(fills in nianhao, ethnicity)
4. `ZZZ_ENTRY_DATA`
(fills in entry type)
5. `ZZZ_KIN_BIOG_ADDR`
(this is the table for kinship, but it also provides the main entry for biographical
address)
6. `ZZZ_NONKIN_BIOG_ADDR`
(this is the table for associations, but it also provides the main entry for biographical
address)
7. `ZZZ_POSTED_TO_ADDR_DATA`
(fill in address information)
8. `ZZZ_POSTED_TO_OFFICE_DATA`
(fills in office information)
9. `ZZZ_TEXT_DATA`
(fills in text data)
I. An Example:
The mode of entry into government of near kin of the successful jinshi
degree candidates of the 1148 examination
How might one use an SQL query to determine how many of the people who passed the jinshi
examination in 1148 (for which we have a complete list) had close relatives who had entered
government service?
1. In the Create menu (next to the Home tab at the top of the main screen) , Select Query
Design:

In the “Show Table” window, select `ZZZ_ENTRY_DATA` and click Add
2. Double-click on c_personid, c_entry_code, and c_year to add them to the query.
Unclick the “Show” check-box for c_entry_code so that you can next specify a value but
have the field not appear in the results of the query, since in every record, the value of the
field will be the same.

3. Then in “Criteria” specify the value 36 for c_entry_code (jinshi), and the year 1148.
4. Check the results by right-clicking on the top border of the Query form and switching to
Datasheet View:

5. There are 273 records. (Please note that as CBDB adds data, these results will change.)
6. Now add the kinship table `ZZZ_KIN_BIOG_ADDR` by clicking on Show Table along
the Query Tools menu at the top of the screen and select `ZZZ_KIN_BIOG_ADDR` from the
"Show Table" window:
a. Create a link between the two tables by clicking on c_personid in
`ZZZ_ENTRY_DATA` and dragging it to the c_personid in `ZZZ_KIN_BIOG_ADDR`.
The query builder may ask you to confirm that you want to select only those pairs of
records from the two tables which share the same person IDs.
b. From the kinship table, add the following fields:
c_person_name_chn (the name of the person identified by c_personid)
c_node_id (the ID of the relative)
c_node_chn (the name of the relative)
c_upstep (the number of generations up in the kinship relation)
c_dwnstep (the number of generations down in the kinship relation)
c_marstep (the number of marriage relations involved in the kinship relation)
c_colstep (the number of brother/sister relations involved in the kinship relation)
c_link_desc (the English description of the kinship relation)
c_link_chn (the Chinese description of the kinship relation)
c. Set the limit for generations up (c_upstep) to 2 (i.e., FF, FFB, etc.)
Set the limit for generations down (c_dwnstep) to 0 (i.e, we want to look only at
ancestors)
Set the limit for affines (c_marstep) to 0

Set the limit for brother/sister (c_colstep) to at most 1
d. Repeat this process, but allow cousins (i.e. FBS or FFBS: 1 down step, at least 1 up)
6. Check the results: There are 621 relatives that meet the criteria

7. Now add a second version of the `ZZZ_ENTRY_DATA` table and link that table to the
`ZZZ_KIN_BIOG_ADDR` table by making c_node_id = c_personid:
8. Add the two fields c_entry_desc and c_entry_desc_chn from ZZZ_ENTRY_DATA_1 (to
get the mode of entry of the kin) and check the results:
86 kin from the 273 initial degree recipients have data on how they entered officialdom

9. Simply adding a 1 to the c_marstep will allow one to look at affinal relations as well. Using
the criterion “<2” means that a c_marstep of either 0 or 1 in the record will be acceptable:
This produces 6 additional records for a total of 92.

II. Some Useful Additional Procedures for Queries
A. Null Information can be Useful
In the above query, we dealt only with those relatives for whom information about their mode
of entering government service was known. Suppose, however, that we wanted a list of all the
relatives as well as the available information about their mode of entering service. Such a list
helps clarify the percentage for whom we have data.
Our initial design looked like:
We need to change the way Access selects its records. To do this we need to modify
the link between the entry data for the kin and the kin themselves, which we created by
equating c_node_id (i.e., the ID for the kin) in `ZZZ_KIN_BIOG_ADDR` with c_personid in
ZZZ_ENTRY_DATA_1, the second copy of `ZZZ_ENTRY_DATA` you added to the query.
`ZZZ_KIN_BIOG_ADDR`. c_node_id = ZZZ_ENTRY_DATA_1. c_personid
To modify that link, double-click on the line connecting c_node_id and c_personid. This will
open a dialog box:

Select option 2 and click OK. Note the arrow pointing to c_personid. This arrow indicates a
“left join” in the language of SQL. This left join includes all the records from
`ZZZ_KIN_BIOG_ADDR` (the left table) that match the other query criteria as well as the
fields from ZZZ_ENTRY_DATA_1 (the right table) where there is a match in kin IDs and
entry IDs. (Left and Right are determined by the order in which the tables are linked.)
When we execute the query, we get records for all the initial 621 kin.
B. The TablesFields Table
For getting information on additional people involved in various types of social interactions,
you need to know which fields in a table refer to IDs for people. When in doubt, you can open
the TablesFields table from the list of tables on the left of the main Access interface and look
for the fields in the table you want to explore. Those that have “`BIOG_MAIN`” in the
“foreign key” column and “c_personid” in the ForeignKeyBase column refer to people.2 For
example, in `ASSOC_DATA`, we have:
2 In a normalized database, “foreign key” simply refers to those fields that use the IDs defined (as primary keys) in
other tables.

Among all these, the following are IDs of people:
c_assoc_claimer_id (the ID of the person claiming the existence of the association)
c_assoc_id (the ID of the associate)
c_assoc_kin_id (the ID of the kin of the associate through who the association exists,
if any)
c_kin_id (the ID of the kin of the main person in the record through who the association
exists, if any)
c_personid (the person whom the record is about)

