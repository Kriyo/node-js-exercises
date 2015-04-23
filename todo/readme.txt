-------------------------------------------------------------------------------
Project Name: Advanced Todo List
-------------------------------------------------------------------------------
Student Name: Fan Zhang
Student Number: 20062507
-------------------------------------------------------------------------------
Project description:

The objective of this project is to devlope an advanced to do list with rich functionalities. 
The implementation for this project mainly involved the following techniques: The first is the use of node.js,which provides server side REST api. The second one has been applied
to this project is backbone.js which is for front-end service. The communication between them is using JSON format objects.

Functionalities Provided

User Authentication
In this function, multiple authentication ways are provided for authorising users to access the application. User can login with their social networking accounts e.g. Facebook and Twitter. If the user does not want to login with their social networking accounts, alternatively the user can register with this application through the registration form provided. Once 
the user login successfully, the system will store user in the session, which keeps the login status in the system. 

Routing
The application provides routing mechanism which utilise the front-end service to communicate the back-end service. This enables the front-end service to efficiently obtain or send information.  

Html Rendering
This application provides html rendering function. The application uses the third party library called ’ejs’ which facilitates the html template rendering. The enables the application to render html pages without manual configuration.

Add Todo
This function enables the user to add one to-do item in her/his to-do list. The information contained in the item includes to-do thing, current location information, created date and user information.

Update/ Delete Todo
This function enables the user to update or delete the to-do list.  When the user taps on one of to-do items, there will be a popup window showing on the screen. This popup window allows the user to modify or delete the taped item.

Read Todo
This function enables the user to review the to-do list.  When the user taps on one of to-do items, there will be a popup window showing on the screen. This popup window displays the detail of the item, which includes the to-do thing and location information.

User Profile Displaying
On the main screen, there is a button called ‘user profile’ on the left-hand side. When the user tap on this button, there will be a popup window showing on the screen. This popup window displays the user profile.

Logout
Once user wants to logout with this application, the user can tap on the left-hand side menu bar which contains the option for logging off the user and clear the session.

Object Relational Mapping
This application uses the ‘Mongoose’ as the object relational mapping layer. 

Geolocation records
This application enables the user to add to-do item with her/his current location, which helps the user to recall the to-do things.

Crosse-Platform
This application has been tested on multiple device e.g. Sony Xperia (Android 4.3), Motorola Xoom(Android 3.2), Ipad(IOS 7.0).

-------------------------------------------------------------------------------
Dependencies:

"express" : "latest",    
"ejs" : "latest", 
"passport-local" : "latest",  
"passport-facebook" : "latest", 
"passport-twitter" : "latest",  
"passport-google-oauth" : "latest",
"connect-flash" : "latest",  
"bcrypt-nodejs" : "latest",  
"mongoose" : "latest",
"underscore" : "latest",
"backbone" : "latest", 
"nodemon" : "latest"  
-------------------------------------------------------------------------------
Documentation:

Readme.txt
-------------------------------------------------------------------------------
Installation instructions

node node/lib/db-server.js
-------------------------------------------------------------------------------