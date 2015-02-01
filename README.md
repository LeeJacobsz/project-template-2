# project-template-v2
A new and improved project template
We need a place to start our front-end work on projects, and this is it.
This makes use of the gulp system for automating tasks, such as:
- compiling scss and minifying css
- compiling and minifying js files

# Folder Structure:
This project template folder structure is set up for Craft CMS (Since this is our CMS of choice) and the servers the site will be hosted on.

The src folder will be above the web root and contains all of our scss, custom scripts and libraries/plugins which are compiled to public/assets/css and public/assets/js

# HTML
Our initial html files up will live in public/html. We start with a very basic index.html file. Nothing too exciting here. The header has an html5 shim to kick shitty browsers into gear, the footer has all the other javascript for speed reasons. The header file also has conditional statements to add ie specific classes to the html tag. We link to the latest version of jQuery but you'll want to set a specific version in production, unless you like living on the edge.

# CSS
We still use scss. Only now we have moved away from using codekit to compile to css. As mentioned above, we are now using gulp for this (and more). Bourbon is also being imported instead of Compass.

# JS
We have a fairly advanced set up here compared to the first project template. init.js is our old custom.js. More detail to follow.


