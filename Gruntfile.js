module.exports = function(grunt) {

	'use strict';

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		//
		php: {
			dev: {
				options: {
					hostname: '0.0.0.0',
					open: true,
					keepalive: true
				}
			}
		},

		//
		watch: {
			dev: {
				files: ['Gruntfile.js', 'assets/js/*.js', '*.html', 'index.php', 'assets/css/scss/*.scss'],
				tasks: ['dev'],
				options: {
					livereload: true
				}
			}
		},

		//
		jshint: {
			files: ['Gruntfile.js', 'assets/*/*.js']
		},

		//
		uglify: {
			default: {
				files: {
					'prod/js/base.min.js': ['assets/js/main.js']
				}
			}
		},

		//
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', 'ie 10']
			},
			global: {
				src: 'assets/css/main.css'
			}
		},

		//
		sass: {
			dev: {
				files: {
					'assets/css/main.css': 'assets/css/scss/main.scss'
				},
				options: {
					style: 'expanded' /* compressed */
				}
			}
		},

		// HTML Validation
		validation: {
			options: {
				flatten: true,
				relaxerror: ['Bad value X-UA-Compatible for attribute http-equiv on element meta.'],
				reset: true,
				reportpath: false,
				path: 'temp/validation-status.json'
			},
			files: {
				src: ['*.html']
			}
		},

		//
		jsbeautifier: {
			'default': {
				src: ['bower.json', 'package.json', '*.html', 'Gruntfile.js', 'assets/*'],
				options: {
					html: {
						indentChar: "	",
						indentSize: 1
					},
					css: {
						indentChar: "	",
						indentSize: 1
					},
					js: {
						indentChar: "	",
						indentSize: 1
					}
				}
			}
		},

		//
		githooks: {
			all: {
				'pre-commit': 'jsbeautifier jshint'
			}
		}

	});

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Tasks
	grunt.registerTask('default', ['php', 'watch']);
	grunt.registerTask('dev', ['newer:sass', 'autoprefixer', 'jshint', 'validation']);

};
