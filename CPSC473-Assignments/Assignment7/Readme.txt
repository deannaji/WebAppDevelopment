Assignment # 7:
--------------
This assignment is about creating a web API using node.js and mongodb, for tracking user links and how many
times the user is accessing those links. The server has three routes:
- GET /links : to show all the links stored in the DB.
- POST /links : to store the title and url of a link, and sets the click times to zero.
- GET /clicks/:title : to increment the clicks by 1, and redirect the user to the website.



Testing:
-------
An index.html file is provided, with two text fields, one for the title and the other is for url.
    