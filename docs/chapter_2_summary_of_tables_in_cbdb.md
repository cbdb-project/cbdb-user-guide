## Summary of Tables in CBDB

1. Basic Entities

These represent the basic elements of the social world of pre-modern China. Each has a
complex history and structure that are set out in additional ancillary tables. CBDB records the
interaction of people with these aspects of their world in the secondary tables.

| Table Name | Description |
|------------|-------------|
| `ADDR_CODES` | the units in the administrative geography of China |
| `ASSOC_CODES` | the non-kinship social relations that connected people |
| `BIOG_MAIN` | the people of pre-modern China |
| `ENTRY_CODES` | the means by which people entered into institutions |
| `KINSHIP_CODES` | the kinship categories of pre-modern China |
| `OFFICE_CODES` | the units of the bureaucratic organization of government |
| `SOCIAL_INSTITUTION_CODES` | a list of academies, monasteries, temples, etc. |
| `STATUS_CODES` | the means by which people attained social distinction |
| `TEXT_CODES` | the corpus of pre-modern writings and important secondary works |

2. Relations between Basic Entities

| Table Name | Description |
|------------|-------------|
| `ADDR_BELONGS_DATA` | data for the hierarchical structure of administrative units |
| `ALTNAME_DATA` | the many names by which people were known |
| `ASSOC_DATA` | the non-kinship relations between people |
| `BIOG_ADDR_DATA` | relations between people and administrative geography |
| `BIOG_INST_DATA` | the relations of people to social institutions |
| `BIOG_SOURCE_DATA` | the list of sources used in defining the CBDB data for a person |
| `BIOG_TEXT_DATA` | the relations of people to texts |
| `ENTRY_DATA` | the initiating relations between people and institutions |
| `KIN_DATA` | the kinship relations connecting people |
| `MERGED_PEOPLE_DATA` | a list of the person IDs merged into other person IDs |
| `OFFICE_TYPE_TREE` | the hierarchical structure of bureaucratic organizations |
| `POSTED_TO_ADDR_DATA` | the relations between people, office, and place |
| `POSTING_DATA` | the container table for postings: people linked to office |
| `POSTED_TO_OFFICE_DATA` | the details of people’s connection to office |
| `STATUS_DATA` | data on a person’s place in the system of social distinctions |
| `TEXT_INSTANCE_DATA` | data on editions and instances of editions of texts |

3. Relationship Type Information

| Table Name | Description |
|------------|-------------|
| `BIOG_ADDR_CODES` | the categories of relations between people and places |
| `ALTNAME_CODES` | the categories of names by which people were known |
| `APPOINTMENT_TYPE_CODES` | the categories of relations between people and postings: regular, acting, probationary, etc. |
| `ASSOC_TYPES` | broader categories of social relationships that organize the many non-kinship association codes into groups |
| `ASSUME_OFFICE_CODES` | indicating whether a person took up the posting |
| `BIOG_INST_CODES` | the roles a person plays in relation to an institution |
| `ENTRY_TYPE` | broader categories of entry to organize the entry codes into groups |
| `EXTANT_CODES` | indicating degree of the source and its known existence |
| `GENRE_CODES` | the bibliographic classifications of texts |
| `GENRE_TYPES` | the broader categories of bibliographic classifications |
| `LITERARYGENRE_CODES` | the forms of literary composition |
| `OCCASION_CODES` | the events in which people participated |
| `OFFICE_TYPES` | the categories of offices |
| `SCHOLARLYTOPICS_CODES` | the categories of topics of learning and scholarship |
| `SOCIAL_INSTITUTION_ADDR_TYPES` | the type of address (actual or derived) used for an institution |
| `SOCIAL_INSTITUTION_TYPES` | the categories of social institutions |
| `STATUS_TYPE` | the categories of social distinction |
| `TEXT_BIBLCAT_CODES` | the fine-grained categories by which texts are organized |
| `TEXT_BIBLCAT_TYPES` | the larger units for textual categorization |
| `TEXT_ROLE_CODES` | the categories of relations between people and texts |
| `YEAR_RANGE_CODES` | the relative degree of exactness of a date |

4. Historical Auxiliary Tables

| Table Name | Description |
|------------|-------------|
| `CHORONYM_CODES` | codes for the place + surname used to identify medieval clans |
| `COUNTRY_CODES` | codes for countries appearing in the data |
| `DYNASTIES` | codes for dynasties and periods |
| `ETHNICITY_TRIBE_CODES` | codes for ethnic groups appearing in the data |
| `GANZHI_CODES` | codes for the sixty two-character terms in the sexagenary cycle |
| `KIN_MOURNING` | codes for all kin relations and mourning obligations in the five degrees of mourning |
| `MEASURE_CODES` | codes for quantities of goods, money, books, and space |
| `NIAN_HAO` | codes for all reign period titles |
| `SOCIAL_INSTITUTION_ALTNAMES` | a list of alternative names for social institutions |
| `SOCIAL_INSTITUTION_ALTNAMES_TYPES` | codes for different types of alternative names |

5. Analytic Auxiliary Tables

| Table Name | Description |
|------------|-------------|
| `ASSOC_CODE_TYPE_REL` | the relationship of specific social relations to larger categories of social relations |
| `ENTRY_CODE_TYPE_REL` | the relationship of specific modes of entry to larger categories of entry |
| `GENRE_CODE_TYPE_REL` | the relationship of specific genre codes to larger categories of genres |
| `OFFICE_CODE_TYPE_REL` | the relationship of specific offices to the office hierarchy |
| `OFFICE_CATEGORIES` | the categories of offices: rank, honorary, etc. |
| `STATUS_CODE_TYPE_REL` | the relationship of specific status codes to the larger categories of social distinction |
| `TEXT_BIBLCAT_CODE_TYPE_REL` | grouping of bibliographic categories into larger categories |

6. Synthetic Tables

| Table Name | Description |
|------------|-------------|
| `ZZZ_ADDRESSES` | a useful table showing the hierarchical position of administrative units. This table replaces `ADDRESSES` |
| `ZZZ_BELONGS_TO` | This table is primarily for use in queries. It lists all the subunits that belong to any particular address code. |
| `ZZZ_NAMES` | This table is used for name searches and combines the names from `BIOG_MAIN` and from `ALTNAME_DATA` |
| `ZZZ_DISTANCE` | This table pre-calculates the “great circle distance” between kin and associates for whom we have index addresses. |

7. “Denormalized” Views (Queries)

The data tables for the relations between basic entities (group 2 above) are in normalized
form that uses codes that refer to other tables for the entities, relations, and historical
information. (Codes that derive their values from other tables are called **foreign keys**.) The
relational tables are therefore difficult to use for queries (See Chapter 4).

In order to simplify the process of writing queries, CBDB provides a set of pre-written, stored
queries (which other database systems call “views”) where the codes have been supplemented
by the values to which the codes refer (mostly text strings like the names of people, places,
official positions, etc.). Most of these views are kept simple (and therefore faster) because they
are used in the **Browser** and omit information about the person not needed by the
sub-forms in the Browser. These are marked with “[B].” The views are listed below:

| View Name | Description |
|-----------|-------------|
| `View_AltnameData` [B] | fills in alternate name type |
| `View_AssociationData` [B] | fills in information about associations (person’s name, associate’s name, description of association) |
| `View_BiogAddrData` [B] | fills in place name, the relationship to place, and the x-y coordinates |
| `View_BiogInstAddrData` [B] | fills in the institution name and its address(es) |
| (`View_BiogInstData`) | (this query is used by `View_BiogInstAddrData`) |
| `View_BiogSourceData` [B] | fills in the names of the source as well as the hypertext link for the source, if there is one |
| `View_BiogTextData` [B] | fills in the person’s role and the text data |
| `View_EntryData` [B] | fills in the person’s name, entry type, etc. Although used in the browser, this is a more complete query |
| `View_EventAddrData` [B] | fills in the event and address data |
| `View_EventData` [B] | fills in the event data |
| `View_KinAddrData` | this is the query for kinship, but it also provides the index place data for the person and the kin |
| `View_PeopleAddr` | fills in the index address information for people; this is a more limited (and therefore faster) version of `View_PeopleData` |
| `View_PeopleData` [B] | fills in index address, index year information, dynasty, nianhao, ethnicity, choronym, etc. |
| `View_PossessionsAddrData` [B] | fills in the possessions and the address associated with the possession, if any |
| (`View_PossessionsData`) | (used by `View_PossessionsAddrData`, which is more complete) |
| `View_PostingAddrData` [B] | fills in just the address information for postings from the `POSTED_TO_ADDR_DATA` table |
| `View_PostingOfficeData` [B] | fills in the office information for postings |
| `View_StatusData` [B] | fills in the status description |
