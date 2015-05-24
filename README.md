##ksrb.github.io

###[Master branch](https://github.com/ksrb/ksrb.github.io/tree/master)
* Github pages for a user are deployed under the repository [username].github.io under the master branch.
* Therefore to avoid polluting the development branch with unnecessary files (compiled css and js) the master
has been orphaned and all necessary changes are manually pulled from the [dev branch](https://github.com/ksrb/ksrb.github.io/tree/dev)
* Major releases will be tagged

###TODOs

####General
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
    * Consider removing gradients and SVGs entirely for pseudo elements and solid color
    
* Functionality (Pending refactoring)
    * Refactor for mobile
    * Animated skill meters
    * Tooltip for skills

####Experience section
* Content
    * Rewrite for clarity and strength of points
    
* Code Quality
    * Consider implementing modal and slider independently to reduce dependencies
    * If keeping dependencies consider using [angular-slick](https://github.com/vasyabigi/angular-slick)

* Functionality
    * Tooltip for skills 
    * Consider pie chart for skill usage (would probably require redesign)
    
####Convert Graphic Design portfolio to HTML
* Not implemented **secondary** to showing experience

####Get [Karma](http://karma-runner.github.io/0.12/index.html) in there
* Important but can wait

####Assets
* Consider creating a icon typeset to reduce network traffic

####Find a excuse to use Gradle
* Lowest priority more for fun than necessary
* Maybe necessary for custom deployment