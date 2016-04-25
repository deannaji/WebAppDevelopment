Assignment #8
by Dean Naji

This assignment is about adding a Real-time notification service to Amazerific website on chapter7.
When ever a user posts a new todo item, all other connected users get alerted, and the update shows up
on thier browsers without the need to refresh the page.
The content of a socket message is only a string saying that, a new post had been posted by someone.

On the server-side a microservices approach had been taken to seperate the Real-time messages functionality,
from the posts managment functionality.

Procfile is used to run the services in a single command:
$ foreman start 


Note:
-----
The is a node-modules folder, and these modules might need to be downloaded directly in the server using
NPM.
   