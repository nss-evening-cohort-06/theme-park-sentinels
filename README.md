# Theme Park Map Builder - Sentinels

<hr>

## Requirements/Instructions for this project: 
Create a interactive map of a theme park. The park will include different areas with attractions and events. Each area will be interactive allowing the user to click in the area and a list of attractions within this area will populate on the left side of the page. This list will not include the attractions which are out of order or under maintanence.

<hr>

### Prerequisites and Installs Required

You will need to install the following:
* SASS
* JQuery 
* Grunt (with JSHINT) 
* Browserify
* Bootstrap
* Moment

<hr>

### Install Dependencies

- `cd lib`
- `npm init`
- `npm install grunt grunt-contrib-jshint matchdep grunt-sass grunt-contrib-copy grunt-contrib-clean grunt-contrib-watch grunt-browserify jshint-stylish --save-dev`
- `npm install jquery bootstrap --save`

<hr>

### Directory Structure:

```
  |- dist/
  |  - app.js (this is created when you run grunt)
  |- javascripts/
  |  - example_module.js
  |  - example_module2.js
  |  - main.js
  |- lib/
  |  - node_modules/ 
  |  - package.json 
  |  - Gruntfile.js 
  |- styles/
  |- sass/
  |  - main.scss
  | .gitignore
  | index.html
  | README.md
```

<hr>

### Deployment Instructions
1. At root: `firebase login`. (Once pre machine).
1. At root: `firebase init`. Selecting 'hosting', select 'correct Firebase project'. THEN YES TO ALL THE THINGS! (Once per project).
1. Update [Gruntfile.js](https://gist.github.com/morecallan/732a2923b18c99c14ffd8d9838bf3410#file-5_deploy_gruntfile-js)
1. Add any files you want to be in your 'public' (hosted) project to the 'copy .. / .. src' array.
1. Inside 'lib': `grunt deploy` (this creates 'public' folder at the root).
1. At root: `firebase deploy`.

<hr>

### When Actively Making Changes
1. Run `grunt cleanit` to 💥DESTROY💥 the public folder. If you don't do this, running http-server won't reflect your changes.
```

# NSS RESOURCES ON ALL OF THESE TOPICS:
- [npm](https://github.com/nashville-software-school/front-end-milestones/blob/master/3-modern-javascript-developer/resources/MJ_NPM_INTRO.md)
- [Grunt Setup](https://github.com/nashville-software-school/front-end-milestones/blob/master/3-modern-javascript-developer/resources/MJ_GRUNT_SETUP.md)
- [Browserify](https://github.com/nashville-software-school/front-end-milestones/blob/master/3-modern-javascript-developer/resources/MJ_BROWSERIFY_CONCEPTS.md)
```

<hr>


## How This Project Works
1. Search: When a user enters text into the search field, the areas which contain the searched text are outlined in red.

	https://user-images.githubusercontent.com/30094328/32582346-eea744fa-c4b3-11e7-9af5-709964db6813.png

2. When a user clicks on one of the colored areas, the attractions located in the selected area are shown on the left side of the page. If an attraction is closed or under maintenance, it will not appear.

	https://user-images.githubusercontent.com/30094328/32582377-1399c328-c4b4-11e7-8907-b156bbdfdea2.png

3. When a user selects an attraction showing on the left side, a description of the attraction will expand below the attraction name.  If applicable, event times will also be shown here.

	https://user-images.githubusercontent.com/30094328/32582436-722c1972-c4b4-11e7-802b-ad416fe9116a.png

4. When a user selects a time from the Time Picker, all attractions open at that time will appear on the page.

	https://user-images.githubusercontent.com/30094328/32582555-05b3b36c-c4b5-11e7-8716-d11967c7fddc.png

<hr>

## Built With

* SASS
* JQuery 
* Grunt (with JSHINT) 
* Promises
* Browserify
* Bootstrap Grid Framework
* Firebase for data storage and retrieval

<hr>

## Contributors

* [Ben Harrington](https://github.com/harringtonben)
* [Dre Randaci](https://github.com/DreRandaci)
* [Brook Lewis](https://github.com/belv2c)
* [Robbie Shock](https://github.com/RobertShock)
