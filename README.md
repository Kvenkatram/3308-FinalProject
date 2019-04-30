# 3308-FinalProject

Not Climatune is an application designed to match a Spotify playlist to the current weather 
in your area. Using the application is simple, first sign in or register an account and after
logging in simply enter the location for where you would like the weather information to be from.
It will customize a playlist to that weather and display it on the page for your enjoyment. 

Structure:   
  Views: contains .html files for the webpages   
  node_modules: contains all of the files for the node server to run   
  resources: contains folders for the JavaScript and CSS files   
  views: contains the .ejs files and partials   
  .txt files: contains the code for the database   
  
How to Build/Run:   
  To run locally, comment out all sections marked "For Heroku" in server.js and uncomment all lines 
  marked "For local db". Uncomment "app.listen(2000);" and "console.log(...)" at the bottom of
  server.js.   
  To setup the database:   
    Follow instructions in StartDatabase.txt to create the database   
    Make sure the service is running in the background   
    For Linux users enter the following command into terminal   
    "sudo -u postgres service postgresql start"   
 
  Navigate to the directory of the project and run "node server.js"
  
