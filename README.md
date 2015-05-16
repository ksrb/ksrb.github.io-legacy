##ksrb.github.io

###[Master branch](https://github.com/ksrb/ksrb.github.io/tree/master)
* Github pages for a user are deployed under the repository [username].github.io under the master branch.
* Therefore to avoid polluting the 'production' branch with unnecessary developments files (bower and scss) the master branch
has been orphaned and all necessary changes are manually pulled from the [dev branch](https://github.com/ksrb/ksrb.github.io/tree/dev)
* Major releases will be tagged

###TODOs

####Improve interactivity with Angular

* Code Quality
    * Testing not implemented
    * Folder structure questionable need to consult best practices guide

####Navbar section
* Content
    * Consider putting name into logo

####About section
* Content
    * Rewrite to sound more professional

####Skills section

* Code Quality 
    * Possibly refactor skill/icon code
    * Move gradients to CSS (?) - not possible SVGs are only compatible with <linearGradient>s
    * Generate SVG meters dynamically (?)
    
* Functionality (Pending refactoring)
    * Refactor for mobile
    * Animated skill meters
    * Tooltip for skills

####Experience section

* Content
    * Rewrite for clarity and strength of points

* Functionality
    * Create a modal slider for work samples
    * Tooltip for skills 
    
####Convert Graphic Design portfolio to HTML

* Not implemented **secondary** to showing experience

####Get [Karma](http://karma-runner.github.io/0.12/index.html) in there

* Important but can wait

####Assets

* Consider creating a icon typeset to reduce network traffic

####Find a excuse to use Gradle

* Lowest priority more for fun than necessary
* Maybe necessary for custom deployment