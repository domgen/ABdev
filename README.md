ABdev - The quickest way to develop A/B tests 
===================
ABdev is a tool that helps developers create and maintain a/b tests. Its super easy to get started and learn to use it. ABdev uses javascript & less css and with some help from GULP (node.js) compiles everything to a single .js file and also uses a build-in Chrome Extension that lets you preview everything instantly on any live website.

ABdev answers to this questions:
* How can you build a/b testing variations faster
* What other ways of creating complex a/b tests and beeing able to maintain them in the future
* How to scale a/b testings or how to build complicated tests using reusable code from modern build tools
* What are some better ways of coding javascript and css a/b tests without using the browser's console
* How can someone inject javascript and css into a website without having access to it
* What is the easyest way to build a complex a/b test in Optimizely, VWO, ABtasty or other testing platform

===================
#### How to install
Make sure you have node.js and npm installed first
```sh
$ git clone https://github.com/vilcuRob/ABdev.git
$ npm install -d
```
===================
#### Create a new experiment
```sh
$ gulp --new my-experiment-folder-name
```
> **Note:**
> Make sure that the name of the experiment does not contain spaces or other characters that would normaly fail when trying to create a new folder with that name. 

===================
#### Run existing experiment
```sh
$ gulp --start my-experiment-folder-name
```
> **Note:**
> Everytime you start an exsting experiment the gulpfile will run the default tasks and might take a few seconds untill you will see the experiment running in your browser.

===================
#### Install the chrome extension
Open Google Chrome, go to menu, more tools, extensions and check the "Developer mode" radio box from the top of the page.
Next click on the "Load unpacked extension.." and choose the "ABdev_extension" folder from this repository.
> **Note:**
> Now you should see the extension installed in your browser. Go to the page that you wish to create an split test, a/b test or multivariate test and click on the extension's icon. Now toggle the "ON" button inside the extension's popup and you should be able to see your a/b test in action if you managed to create a new extension first using gulp --new my-experiment-folder-name. 

===================
#### How it works
The structure of ABdev is the following:

 * **-ABdev-extension**
     * **-app** (holds the chrome extension core functionality)
         * **-dist** (holds the final distribution code generated from your experiments)
             * **-experiment.min.js** (minified js)
             * **-experiment.min.css** (minified less)
             * **-experiment.mixed.min.js** (minified js and css)
         * **-js** (extension chrome functionality)
         * **-extension.html** (holds the popup for the chrome extension)
         * **-icon.png** (the icon for the extension)
     * **-experiments** (holds all the experiments that you might want to create)
         * **-bacground-experiment** (test example)
             * **-js** 
                 * **-experiment.js**
             * **-less**
                 * **-experiment.less**
 * **-gulpfile.js**
 * **-package.json**

===================

- When you run, for example: "gulp --new homepage-redesign-page", gulp will create a folder called "homepage-redesign-page" inside **ABdev-extension/experiments** with a js and a less css file inside. Each time you save those files or any files included inside - gulp will run a task that will minify everything and generate one file called **experiment.mixed.min.js** located in **ABdev-extension/app/dist/**. If your chrome browser is opened and the extension is set to run on a particular page, then you should see the results instantly after a page refresh.
- If you run "gulp --start homepage-old" assuming that homepage-old is an experiment that was already existing, then GULP will still watch for any changes in that experiment and will also run a task that will build the experiment mixed file so you can see it in your browser instantly after a page refresh.

===================
#### How to use in production
```sh
$ gulp --start my-experiment-folder-name
```
> **Note:**
> Use this command to generate the latest build for your experiment. After that, simply navigate to the "dist" folder and use which files works best for you. For example in optimizely you could add the css and js separetly but with other tools you might not be able to add separate css. So just use the mixed.js file.

===================
#### Any questions?
If you have any questions about ABdev, feel free to contact me at: robert@crafton.ro
```



