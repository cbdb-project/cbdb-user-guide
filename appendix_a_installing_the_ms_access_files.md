### Appendix A: Installing the MS Access Files
In order to keep the database files within the two gigabyte limit for Microsoft Access files,
CBDB is divided into four files: three “Base” files with the tables of data, and a “User” file
with the user interface. The User file draws on the tables in the Base files as “linked tables.”
When you install the CBDB files, the Access program will automatically create the links
between the User and Base files that you have installed in a shared directory. If that link fails
or you need to recreate the link when you download new data files, the Navigation pane
provides a way to recreate the links.
To install the MS Access database
1. Create a folder into which to extract the four files that you have downloaded from the
CBDB website. Extract the files.
2. Double-click on the User file to open it in Microsoft Access. You will see:
Note the arrows next to most of the tables in the list on the left side of the screen. The arrow
indicates that the table is a linked table from the Base files.
3. Double-click on any linked table, and if the table is successfully linked, it will open.
If the link is broken, you will see the message:

4. If you get an error message, double-check that the three data files are in the same directory
as the User file. If they are, write down the name of one of the data files, e.g.
CBDB_20210225_DATA1.mdb. The date “20210225” (in YYYYMMDD format) gives
the date of the data release.
5. Next, click on the “Relink Tables” command button in the Navigation Pane. This will
open a form that will ask for the date of the data release:
Write the date into the form and click “OK.” The form will relink the tables.
6. The User file is now ready to use.

