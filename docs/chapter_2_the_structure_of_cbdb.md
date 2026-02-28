## Chapter 2. The Structure of CBDB

### A. An Overview of the Entities in the Database

Database design uses tables to give concrete form to more abstract objects which we simply call
“entities.” Since the goal of a database is to capture the relational information about entities, it
remains useful to keep the abstract objects separate from the tables that represent their
relations. That way, one can more easily ask the question of how the tables need to change to
better stand in for the entities they represent.

The central entity that defines biography in the database is, of course:

1. People

But since a relational database tracks the ways in which people form relations with other people,
with their society (their political, social, economic and cultural institutions), and with the
physical world, we also need entities with which people interact. First, relationships with
people (these entities will be discussed in greater detail later):

2. Kinship
3. Social (Non-kin) Associations

Next, with political and socio-cultural institutions and activities:

4. Status (modes of social distinction such fame for calligraphy or serving as a monk)
5. Modes of Entry into Government or other careers (e.g., passing the civil-service
examinations, nepotism or the yin protection privilege)
6. Postings to office (e.g., a magistrate or general)
7. Social Institution in which people collectively participated (from Buddhist temples
and Confucian academies to the repair of city walls and bridges)
There also are texts that people produced and through which we know about people:
8. Texts (including primary texts, secondary texts, and paleographic data). These include
data sources from which CBDB draws its information (primary sources, secondary
scholarly compilations, and digital resources).

Then, there are structured aspects of the world with which people interacted that must be
included in CBDB. The two aspects on which we have focused are administrative geography
and bureaucratic structure:

9. Administrative Geographic Hierarchy (defined in political terms as superior and
subordinate administrative units)
10. Bureaucratic Organization (the changes in bureaucracy and reporting
responsibilities over time)

### B. Details of Entities
NOTE: The database allows one to record the source of information, including the pages in the
source from which the information comes, and to add additional notes as seems appropriate.
Every item in the database that records information on an individual has the attributes of source,
pages, and notes. Therefore I will not note these in the discussions below.

1. People

    a. Basic Data: name, male or female, date of birth, and date of death.

    Precise dates of birth and death often are not available, and all we have is a period of years
    of activity(“floruit” dates). Sometimes, not even that is available: we simply know the reign
    period(nianhao)or dynasty. In order to capture the level of precision in the data, the
    database allows the use of reign period information for all dates. One can give a specific
    year within the reign period, but one also can simply indicate “beginning,” “middle”,
    “end”, or “unspecified.” For analytic purposes, the database will algorithmically produce
    Western dates from the reign period information for birth, death, years of activity, and any
    other date given in the traditional Chinese nianhao designation, but it will preserve the
    vagueness in the nianhao coding.

    b. Ethnicity and Tribe Affiliation

    CDBD tracks ethnicity, like Han, Uighur, Tibetan, etc. We have over 465 codes at
    present. These codes are in the table ETHICITY_TRIBE_CODES, which organizes
    ethnicity and tribe designations by group and subgroup and includes variant forms for
    ethnicity names.

    c. Choronym

    From the Six Dynasties into the Tang, membership in a clan was of central importance
    in defining one’s social status. From the Song Dynasty onward people did make claims
    descent from a particular clan from a particular place (like the Cui clan of Boling) but
    they carried little social or political weight. The combination of place name and clan
    name defined a choronym. The codes for these choronyms are in the table
    `CHORONYM_CODES`.

    d. Index Year

    For computational purposes, CBDB needs a single year value to locate a person in
    time. The index year is an artificial value used in analyses. In earlier versions of the
    database, index year was based on when the person would have turned 60 sui.
    However, starting with the 2021 dataset, the index year has been based on the known
    or projected year of birth. The rules for calculating the value are based on the following
    assumptions.

    **Assumptions**

    | Code | Assumption |
    |---|---|
    | A1 | A man received Jinshi (進士) at age 30, Juren (舉人) at 27, and Xuicai/licentiate (秀才/生員) at 21. |
    | A2 | A wife was 3 years younger than her husband. |
    | A3 | The first child was born when the father was age 30 and the mother age 27 (per A2). |
    | A4 | Male children were born 2 years apart. |
    | A5 | A man died at age 63 and a woman at age 55. |

    **Rules Based on a Person’s Birth/Death Dates**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 1 | Ego’s index year = ego’s birth year. |
    | Rule 2 | If we know ego’s death year and age at death: ego’s index year = ego’s death year − age at death. |
    | Rule 3 | If we know only ego’s death year (per A5): ego’s index year = death year − 63 (men), death year − 55 (women). |
    | Rule 4W | Ego’s index year = husband’s birth year + 3. (If the woman was a concubine/second wife, Rule 9W precedes Rule 4W.) |

    **Rules Based on Degree Dates**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 5 | Ego’s index year = Jinshi year − 30. |
    | Rule 5W | Ego’s index year = husband’s Jinshi year − 27 (30 + 3 adjustment). |
    | Rule 6 | Ego’s index year = Juren year − 27. |
    | Rule 6W | Ego’s index year = husband’s Juren year − 24 (27 + 3 adjustment). |
    | Rule 7 | Ego’s index year = Xuicai year − 21. |
    | Rule 7W | Ego’s index year = husband’s Xuicai year − 18 (21 + 3 adjustment). |

    **Rules Based on Birth Years of Kin**

    | Rule | Condition / Formula |
    |---|---|
    | Rule 8 | If we know ego’s father’s birth year (per A3): ego’s index year = father’s birth year + 30. |
    | Rule 9 | If we know a male ego’s oldest child birth year (per A3): male’s index year = oldest child’s birth year − 30. |
    | Rule 9W | If we know a female ego’s oldest child birth year (per A3): female’s index year = oldest child’s birth year − 27. |
    | Rule 10 | If we know ego’s older brother’s birth year (per A4): ego’s index year = older brother’s birth year + 2. |
    | Rule 11 | If we know ego’s younger brother’s birth year (per A4): ego’s index year = younger brother’s birth year − 2. |
    | Rule 12 | If we know a male ego’s oldest son-in-law birth year (per A3 & A4): male’s index year = oldest son-in-law birth year + 3 − 30 = oldest son-in-law birth year − 27. |
    | Rule 12W | If we know a female ego’s oldest son-in-law birth year (per A3 & A4): female’s index year = oldest son-in-law birth year + 3 − 27 = oldest son-in-law birth year − 24. |
    | Rule 13 | If we know ego’s grandfather’s birth year (per A3): ego’s index year = grandfather’s birth year + 60. |

    **Rules Based on Index Years of Kin**

    Note: CBDB iteratively uses derived index years for these values.

    | Rule | Condition / Formula |
    |---|---|
    | Rule 14 | If we know ego’s father’s index year (per A3): ego’s index year = father’s index year + 30. |
    | Rule 15 | If we know a male ego’s oldest child’s index year (per A3): ego’s index year = oldest child’s index year − 30. |
    | Rule 15W | If we know a female ego’s oldest child’s index year (per A3): female’s index year = oldest child’s index year − 27. |
    | Rule 16 | If we know ego’s older brother’s index year (per A4): ego’s index year = older brother’s index year + 2. |
    | Rule 17 | If we know ego’s younger brother’s index year (per A4): ego’s index year = younger brother’s index year − 2. |
    | Rule 18 | If we know a male ego’s oldest son-in-law’s index year (per A3 & A4): ego’s index year = oldest son-in-law index year + 3 − 30 = oldest son-in-law index year − 27. |
    | Rule 18W | If we know a female ego’s oldest son-in-law’s index year (per A3 & A4): ego’s index year = oldest son-in-law index year + 3 − 27 = oldest son-in-law index year − 24. |
    | Rule 19 | If we know ego’s grandfather’s index year (per A3): ego’s index year = grandfather’s index year + 60. |

    The CBDB table that records this basic biographical information is `BIOG_MAIN`.
    `BIOG_MAIN` assigns each person a unique ID.

    e. Floruit years

    CBDB gives two years: the earliest and the latest. Often when there is no data for
    index year or for birth and death dates, texts nonetheless provide datable references to
    individuals. CBDB gives the earliest and the latest known dates given in the textual
    sources we have examined so far.

2. Kinship

    An instance of the Kinship relationship for an individual has three components (plus the
    source information):

        person
        kin
        kinship relation

    This relationship is structured as: “Person A has Person B (the kin) as his/her Kinship
    Relation.” E.g. {Wang Anshi, Wang Anli, B-} means Wang Anshi has Wang Anli as a
    younger brother.

    The building-block relations for Kinship are the 10 basic categories:

        e Ego (the person whose kinship is being explored)
        F Father
        M Mother
        B Brother
        Z Sister
        S Son
        D Daughter
        H Husband
        W Wife
        C Concubine

    There are also variations on the nature of the relationship, as well as additional types of
    notation to represent types of kinship relations beyond the nuclear family:

        + Older (e.g. older brother B+, 兄)
        - Younger (e.g. younger sister Z‐，妹)
        * Adopted heir (as in S*, adopted son)
        ° Adopted
        ! Bastard
        ^ Step- (as in S^ step-son)
        ½ half- (as in Z½ , half-sister)
        ~ Nominal (as in M~ , legitimate wife as nominal mother to
        children of concubine)
        % Promised husband or wife (marriage not completed at time of
        record)
        y Youngest (e.g., Sy is the youngest known son)
        1, 2, 3… Numbers distinguish sequence (e.g., S1, S2 for first and second sons; W1, W2 for the first and the successor wives)
        n precise generation unknown
        G-#, G+# lineal ancestor (–) or descendant (+) of #th generation
        G-n, G+n, Gn lineal kin of an unknown earlier generation (G-n), or unknown later generation (G+n), or unknown generation
        (Gn) G-#B, BG+# a brother of a lineal ancestor of # generation; a brother’s lineal descendant of # generation
        K, K-#, K+#, Kn Lineage kin, of the same, earlier (–), later (+) or unknown (n) generation. CBDB uses “lineage kin” for cases where kinship is attested but the exact relationship is not known. Lineage kin are presumably not lineal (direct descent) kin.
        K–, K+ Lineage kin of the same generation, younger (-) or elder (+).
        P, P-#, P+#, Pn Kin related via father’s sisters or mother’s siblings, of the same, earlier (–), later (+) or unknown (n) generation. Signified by the term biao (表) in Chinese. (CBDB uses these codes only when the exact relationship is not known).
        P–, P+ Kin related via father's sisters or mother's siblings, of the same generation, younger (-) or elder (+).
        A Affine/Affinal kin, kin by marriage

    The codes for the types of relationships are in the table `KINSHIP_CODES`. Although
    CBDB records all the many variations of kinship, searches for kinship networks in CBDB
    use an important set of four metrics for kinship distance to simplify the vast proliferation
    of terms. Each code `KINSHIP_CODES` table has values for

        up, i.e., ancestor generation: father = 1, grandfather = 2, and so on
        down, i.e., descendent generation: son = 1, grandson = 2, etc.
        collateral relation: brother = 1, brother’s wife’s sister” =2....
        marriage relation: wife = 1, wife’s father’s wife = 2, and so on.

    Thus brothers, step-brothers, bastard brothers, and adopted brothers all have set of values
    {up = 0; down = 0; collateral = 1; marriage = 0}. The data recording the kinship relations
    between people is stored in the table `KIN_DATA`.

3. Non-kinship Associations

    a. Simple Non-kinship Associations

    These have a three-part structure: person + association + associate. The major challenge
    in recording the non-kinship Associations that individuals formed over their lives is to
    control the proliferation of categories derived from the historical texts.
    Because associations are between pairs of people, there must be symmetrical types of
    associations. That is, if {A “is the student of” B} is in the database, then {B “is the teacher
    of” A} also should be so. In fact, the current version of the program automatically
    generates this second entry. Thus, ASSOCIATIONS as an entity has an internal structure:

        Association type
        Paired Association type
        Association Categories/subcategories (3 levels at present)

    When editors for CBDB create a new category of association, they must also create its
    converse. Mutual associations, of course, are their own converse: {A “is friend of” B} is
    the same as {B “is friend of” A}. In most associations, however, the two people play
    distinct roles, and CBDB needs the converse category to capture the roles of the two
    people from their different perspectives: to record for A that {A “followed” B} also means
    that for B, {B “was followed by” A}.

    b. Mediated Associations

    In some important cases, associations form through the mediation of institutions or people.
    CBDB captures these types of relations by adding additional data to associations. For
    example, we might know of a relation between X and Y because X asked Y to write a
    biography for his mother’s tomb. In order to record all the variations, the record structure
    for the table `ASSOC_DATA` has become rather challenging to understand.

    c. Structure of an Association Record

    Because associations in pre-modern Chinese society often are complex, the table tracking
    associations in CBDB uses a correspondingly large number of fields:

        Basic Information

        1. Person ID
        2. Associated person ID
        3. The kind of association (association code)
        4. The number of objects or events establishing the association

        Information about Kinship and Other Relations that played a role in the Association

        5. The kinship relation, if the association was established through a relative of the
        person
        6. The ID of the person whose kinship relation established the association
        7. The kinship relation of the associate, if the association was established through a
        relative of the associated person
        8. The ID of the kin of the associate through whom the association was established
        9. The ID of the person who claimed the existence of the association: for example,
        a son claiming it for his father

        Time and Place of the Association

        10. The ID of the place of the association
        11. The sequence of an association, if one does not know the actual date
        12. The date of the association (year, month, and day, if known)

        Contextual Information

        13. The code for the social institution at or through which the association was
        established
        14. The code for the occasion on which the association was established
        15. The code for the genre of the writing that establishes the association, if relevant
        16. The title of the work that established the association, if relevant
        17. The code for the scholarly topic around which the association was formed
        Source and Notes
        18. Source ID
        19. Note

4. Status

    CBDB has a table to take note of “social distinctiveness,” that for which people were
    known in society. Since the dating often is uncertain, however, the table has a field to
    record sequence if known. Some forms of social distinctiveness may combine roles (a
    Buddhist monk known for his calligraphy, or a literatus who runs a printing firm). At
    present, CBDB records the different aspects of status under distinct categories. This is a
    question awaiting future research.

    The structure of a Status datum for a person is:

        Person ID
        Status code
        Status sequence
        Date
        Source information and notes

    STATUS as a category of social experience (as opposed to any particular person’s status
    within the structure of social distinction) is a simple entity:

        Status code
        Status description
        Status category and subcategory 1
        Status category and subcategory 2

    Since social distinctions change over time, CBDB will continue to add to its current list as
    it draws upon sources for earlier and later periods.

5. Modes of Entry

    ENTRY itself is a simple entity, just a name, a type, and a subtype. At present it largely
    describes entry into government, but CBDB also has begun to track categories like monks’
    ordinations. Because different routes of entry entail different types of information, the
    instance of an ENTRY event for an individual is more complex. If a person enters
    government through the examination system, for example, we would like to know the type
    of examination and the date of the degree. (CBDB also tracks failed examinations.) If, in
    contrast, one enters government through the merit of someone else, the person, and the
    relationship to the person should also be recorded, if known. Thus if Zhang Weisan
    entered office through yin protection privilege deriving from his uncle Zhang Jingyi, the
    entry would be:

        Person: [ID of] Zhang Weisan
        Entry type: [code for] yin
        Entry relation type: [code for] Uncle
        Entry relation: [ID of] Zhang Jingyi

    Since it is also possible that one can enter office through the yin privilege of a non-kin
    associate, the “entry event” will need to have a way to record the non-kinship relation. In
    the end, then, the ENTRY event has many attributes, only some of which are relevant to
    any particular instance:

        Person ID
        Entry type code
        Entry relation type code (for kin)
        Entry associate type code (for non-kin)
        Entry associate ID (used for both kin and non-kin)
        Entry test date (both Western and nianhao + year (if known))
        Entry test ranking
        Entry address ID

6. Offices and Postings

    CBDB currently lists over 32,000 office titles and—for the Tang, Song, Yuan, Ming, and
    Qing—their place in the government bureaucracy. POSTINGS is an entity at the
    intersection of people, the bureaucracy, and—since most instances will be away from the
    capital—places. A person serves in an office at a given rank in particular place at a specified
    time. However, there are instances when a posting includes jurisdiction over more than
    one administrative unit, and there are times when a single posting entails more than one
    official position. Following the rule that one-to-many relations (i.e., one posting may have
    more than one address and one posting may involve more than one office title) require
    separate tables, information about instances of POSTINGS requires two additional
    categories of one-to-many relations: in addition to the basic postings table, there are a
    posted-to-office table (relationship of people to office created in the POSTINGS event)
    and a posted-to-office-address table (relationship of people to office to place).

    **Posting-Data**

        Posting ID (this is a unique number)
        Person ID
        Source and Notes

    **Posted-to-Office**

        Posting ID
        Office ID
        Appointment Type (regular, provisional, honorary, etc.)
        Sequence (since often only the order of office is known with no further
        information about the years for any of the postings)
        Year (both Western and nianhao + year: a person may have duties added
        while still serving in a post)
        Sources and Notes

    **Posted-to-Address**

        Posting ID
        Office ID
        Address ID

    Considerations for Future Development

        1. Buddhism and Daoism

        Buddhist and Daoist bureaucratic positions eventually will be added to the OFFICE
        and POSTINGS entities. This, however, also entails significant research to clarify the
        historical changes in the structure of the Buddhist and Daoist bureaucracies.

        2. Tracking Historical Change in Bureaucratic structure

        One of the design issues that need to be considered again is how much of the
        complexity of the Chinese imperial bureaucratic system should be captured in the
        database. In the Chinese system from the Han through the Qing, the duties of a
        position may change even though the title of the office remains constant, or the duties
        may remain constant although the title changes. Scholars have objected that Charles
        Hucker’s Dictionary of Official Titles tries to force a continuity of function onto office
        names when it would have been more useful to simply acknowledge the drifts. Hucker’s
        translated titles are indexed, however, and provide those who do not read Chinese with
        an easy means of further investigation. CBDB is planning to create tables that will
        capture the historical changes in the functions designated by any particular office title.
        (**Office Name** would become one entity and **Office Function** would be another.)
        Most of the actual duties of an office at any particular time are not relevant to the CBDB
        because these details contribute little to the analytic power of the database; the attributes
        of an office that do matter are (1) office as an indication of salary/rank or actual function,
        (2) the other office to which it reports, and (3) the type of the office (i.e. central military,
        prefectural civil, etc.) At present, CBDB has captured some of this information, but
        clarifying the changes in office title is in itself a major research project.

7. Places

    CBDB uses a strategy for coding places that derives from the China Historical Geographic
    Information System (CHGIS) project and relies on the spatial entity ADDRESSES.
    Addresses are specifically historical instances of place designation that refer to an
    administrative jurisdiction. Although administrative jurisdictions such as counties (xian)
    and prefectures (zhou and fu) were bounded spatial entities, CBDB uses the coordinates for
    the administrative seat as the address; it does not provide boundaries. Boundaries can be
    downloaded from CHGIS. If either the boundaries or the name changes, a new address
    record (and ID) must be created. These historical instances, however, are part of
    administrative hierarchies: this information is preserved in a “belongs-to” table that serves
    the same function as the “part-of” table in CHGIS. Since an address ID changes only
    when the unit changes shape or name, it does not change ID simply when it becomes part of
    a different higher level administrative unit. Thus there are two tables:

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

    From these two tables CBDB generates a convenient Addresses table that is used in the
    online database and can be consulted in the stand-alone version to provide information
    about the role of administrative units in the bureaucratic structure. Its structure is:

        Address code
        Address name
        Address first year (that the address belongs to the superior place)
        Address last year (that the address belongs to the superior place)
        Administrative type
        X coordinate
        Y coordinate
        belongs1 (the parent: the larger administrative unit it reports to)
        belongs2 (the parent of the parent)
        belongs3 (etc.)
        belongs4
        belongs5

    To allow the examination of trends across dynastic boundaries, the database needs a way to
    examine what happens in a particular location over long periods of time. For this, CBDB
    relies on data about physical location, the x-y coordinates on the map.1 The analytic forms
    allow one to use the x-y data for the addresses one has selected to define squares around
    those x-y coordinates and locate additional addresses across time that fall within those
    squares. These addresses then can be searched across the time period one has specified.
    To reiterate, CBDB uses the x-y coordinates of the seat of the administrative unit.

    Note: In Geographic Information Systems (GIS) research, longitude and latitude typically are referred to as x-y
    coordinates.

8. Biographical Place Information

    People have many connections to place: where they were born, lived, died, and were
    buried, where they served in office, where they held property and ran businesses, where
    they visited. Since these relations to place arise out of activities recorded in separate tables
    in CBDB (e.g., office holding, and possessions), the information appears in these various
    tables rather than in one place. The tables that record information about people and places
    are:

        Basic biographical information relating to place (`BIOG_ADDR_DATA`)
        Place of official service (`POSTED_TO_ADDR_DATA`)
        The place where a non-kinship relation took place (`ASSOC_DATA`)
        The place where people participated in social institutions (`BIOG_INST_DATA`)

    The CBDB form (LookAtPlace) allows the user to ask questions that integrate all these
    sources of place information. Note that at present CBDB does not systematically preserve
    information about places persons briefly visited, where they received their education, or
    where they wrote texts.

    CBDB attempts to associate each person with an index place. As with index year, CBDB
    assigns these place associations based on available information, but the data is often
    incomplete. Therefore CBDB uses a hierarchy of categories of place association to assign a
    person’s index place. CBDB first uses the “basic affiliation” 籍貫, if available. The order
    of assigning address affiliations is as follows:

    1. Basic affiliation 籍貫
    2. Household address 戶籍地 (Ming dynasty)
    3. Actual residence 落籍
    4. Last known address
    5. Moved to
    6. Eight Banners (Qing dynasty)
    7. Alternative basic affiliation
    8. Place of exile

    However, this hierarchy of codes to use in assigning the index place may not be the most
    suitable for particular research projects. Thus, CBDB allows the user to change this order.
    See Appendix X for discussion.

9. Texts

    There are three major types of texts of concern to the database: inscriptional and other
    paleographic material, printed primary texts, and secondary scholarship (in both print and
    digital form). Since a work like Huang Zongxi’s Song Yuan xue’an is both a scholarly
    compendium of earlier writings and a work in its own right, and since the paleographic
    materials also were written by authors who are of interest to the database, these distinctions
    for pre-modern texts of any sort are neither clear nor useful. CBDB accordingly treats all
    three types as TEXTS. Texts have the attributes one can expect:

        title
        category of writing (inscription or manuscript/printed)
        genre (the bibliographic categories common to that period)
        current publication date
        current publisher
        current publication location

    People can relate to the text in a variety of roles:

        author
        publisher
        editor
        collator
        translator
        annotator

    The tables for texts are:

    **Texts Codes**

        Text ID
        Text Name
        Date of composition
        Current status: extant or not
        Current Publication Information (if extant)

    **Text Data**

        Text ID
        Person ID
        Role ID (from the table `TEXT_ROLE_CODES`)

10. Social Institutions

    People participated in the lives of their communities in many ways. A man, for example,
    may have served for several years as the director of an academy. That academy had
    students during this period: their respective roles in the academy would have served as
    important social links between the man and the students. The academy also had donors
    who contributed to its creation and upkeep and helped to define a community centered on
    the institution. Similar patterns appeared for Buddhist monasteries and Daoist temples.

    CBDB is beginning to track this information in a way that captures the uncertainty we find
    in the historical sources. There are, for example, thirty-nine temples with the name
    Kaiyuansi 開元寺. A biographical source may tell us that Wang Anshi contributed funds
    to repairs at a Kaiyuansi, but we may not know (yet) which Kaiyuansi was the recipient.
    Other sources eventually may clarify the point, but for the moment CBDB simply records
    “a Kaiyuansi.” There are four tables used to record this information:

    **Social Institution Names**

        Institution Name ID
        Institution Name

    **Social Institutions**

        Institution Name ID
        Institution Code (this is a unique ID for each institution: the name is an attribute that may change, but what the institution is, identified by the ID, does not. Of course, if the textual data shows that the name change signified to the people at the time that this was a new institution, then CBDB assigns the institution a new institution code as well.)
        Institution Type ID
        Institution Dates (this includes the beginning and ending years, if known, as well as the first known and last known years

    **Social Institution Addresses**

        Institution Name ID
        Institution Code
        Address ID (this gives an approximate location by identifying an administrative unit)
        XY-coordinates (this may be more precise than the coordinates associated with the Address ID. An institution may move within its locality.)
        Address Type (derived from Address ID or recorded independently)
        Address Dates

    **Relationship of People to Institutions**

        Person ID
        Institution Name ID
        Institution Code (if only the name is known, CBDB assigns a 0 to this field)
        Institutional Role Code
        Role Dates
