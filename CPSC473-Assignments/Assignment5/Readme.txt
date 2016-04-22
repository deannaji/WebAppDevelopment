Assignment # 5:
--------------
The assignment name is "Coin flip API". This assignment contains only one file "Assignment5.js", 
it include server-side code which handles two types of user POST request, 
and a GET request to the url (.../stats). 
The POST request should include a json payload having "call" property and a value of either "head" or "tail". 
This POST request resembles the user coin guess.
The server responds to that POST request with a json object showing the result as "win" or "lose".
The GET request returns the current number of wins and loses, in json format.


Testing: 
--------
For testing use the code in the file (cURL test.txt).