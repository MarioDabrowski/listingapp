# Front-End Grunt Template

Shortcut to this page: [GruntFile.com](http://gruntfile.com)

This grunt template is intended to be a great front-end starting boilerplate.

Below you'll see what's included in my build. As I come across more useful packages I will continue to update the list.

## Installation

1. [Install Grunt](http://gruntjs.com/getting-started) if you don't have it yet.
2. Pull down my repo.
3. In the repo folder run `npm install`
4. Run `grunt`

## Current Bower Packages

- [HTML5 Boilerplate](http://html5boilerplate.com/)
 - This is just used as a reference for now, until I figure out a good way to implement it.
- jQuery (1.11.0)
- [Normalize.css](https://code.google.com/p/normalize-css/)
- [Modernizr](http://modernizr.com/)
 - Including the entire build of modernizr is silly. But until I figure out how the modernizr grunt package works this will have to do for now.
- [html5shiv](https://code.google.com/p/html5shiv/)
 - This is included so that I don't have to throw modernizr in the head tag. Read more [here](http://stackoverflow.com/a/16085479/2040509)

## Current Grunt Packages

- [jshint](http://www.jshint.com/)
- [watch](https://github.com/gruntjs/grunt-contrib-watch)
- [connect](https://github.com/gruntjs/grunt-contrib-connect)
- [uglify](https://github.com/gruntjs/grunt-contrib-uglify)
- [cssmin](https://github.com/gruntjs/grunt-contrib-cssmin)
- [autoprefixer](https://github.com/nDmitry/grunt-autoprefixer)
- [compass](https://github.com/gruntjs/grunt-contrib-compass)
- [html validation](https://www.npmjs.org/package/grunt-html-validation)
- [githooks](https://www.npmjs.org/package/grunt-githooks)

## Git Hooks

When you modify the git hooks in the `Gruntfile.js` you have to make sure to run `grunt githooks` to update the `.git/hooks/pre-commit` file.

## SASS Mixins

- [Retina Images](http://chrisltd.com/blog/2013/05/retina-images-sass/)

## Issues & Concerns

- jsbeautifier doesn't auto format `.sass` files. It simply puts everything on one line. Look for an alternative linting script that includes sass.
- media query mixin creates a bunch of duplicate media queries. This is done purposely to keep cascading specificity. It does not create any issues after being minified and gzipped. If this still bothers you, you can use [this grunt plugin](https://github.com/buildingblocks/grunt-combine-media-queries) to fix it. 
