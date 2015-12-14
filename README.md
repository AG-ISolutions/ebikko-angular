# Ebikko Angular

AngularJS frontend for the **Ebikko** document management system

## Requirements
1. [GIT](https://git-scm.com)
2. [Node](https://nodejs.org)

## Installation Instructions
Clone the code from github

	git clone https://github.com/AG-ISolutions/ebikko-angular.git
	
Install the NPM dependencies, these are needed for the build process, for example zipping up all the files

	npm install
	
Run the build to generate a deployable artifact (located at dist/ebikko-angular.war)

	grunt
	
Deploy the generated artifact to a webserver. The simplest thing to do is copy the generated WAR file to the webapps folder in a tomcat instance, and tomcat will automatically unzip the file.

###Note

1. The output of the build file is just a zip file renamed to .war to make deploying to tomcat easy.
2. The app requires an instance of Ebikko to be running at the URL root, ie if the angular app is deployed to localhost:1234/app, localhost:1234 must point at Ebikko. The easiest way to do this is to have ebikko deployed as the root app in tomcat, and the angular app as a second app in the same tomcat

## Available Grunt tasks
[Grunt](http://gruntjs.com/) is used to automate various tasks involved with the app, including running the tests. To run the unit tests run

	grunt karma:unit
	
For e2e tests use

	grunt e2e-test
	
To continually run the tests whenever files are changed, run the following command

	grunt watch
	
This will watch for changes to any of the application files and run through all the unit tests when any changes are detected	