# todo_webpack

Application to comfortably manage planned tasks, made with webpack, vanilla JS + Redux

# Getting Started
installation ```npm install```\
build ```npm run build```\
run ```npm start```  -> go to localhost:8080

# Features of the current version:
- Add item
- Delete item
- Edit item
- Set item as done/undone
- Sort by status, priority


# Deployment
build ```npm run build```


# Authors
Danylo Soloviov 

# Detailed description 
Project was done with webpack module bundler with state management module Redux. No frameworks were used in the project, just vanilla JS. 
There are 3 separated folders (with sass, js and html). JavaScript code is devided into classes which partially use methods of each other. 
In index JS there are main functions such as render (triggered onstorechange), create note list etc. 
CSS code is written with a help of SASS preprocessor, there are separated files for each big HTML group of elements, variables such as colors and fonts 
are defined in global scope. 
