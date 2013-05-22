'use strict';
var path = require( 'path' );
var lrSnippet = require( 'grunt-contrib-livereload/lib/utils' ).livereloadSnippet;
var folderMount = function folderMount( connect, point ) {
	return connect.static( path.resolve( point ) );
};


module.exports = function(grunt) {

grunt.initConfig({
	connect: {
		livereload: {
			options: {
				port: 9001,
				base: 'production',
				middleware: function( connect, options ) {
					return [lrSnippet, folderMount( connect, options.base )]
				}
			}
		}
	},
	csso: {
		dist: {
			src: 'src/css/screen.css',
			dest:'production/css/screen.min.css'
		}
	},
	compass: {
		dist: {
			options: {
				basePath: 'src/',
				config: 'src/config.rb',
				cssDir: 'css',
				environment: 'production'
			}
		}
	},
	copy: {
		main: {
			files: [
				{expand: true, cwd: 'src/img/', src: ['**'], dest: 'production/img'}, // copy all the pics
				//{expand: true, cwd: 'src/sass', src: ['**'], dest: 'production/sass'}, //im not sure we need that
				{expand: true, cwd: 'src/css', src: ['**'], dest: 'production/css'},
				{expand: true, cwd: 'src/js', src: ['**'], dest: 'production/js'}
			]
		}
	},
	styleguide: {
		styledocco: {
			options: {
				framework: {
					name: 'styledocco'
				},
				template: {
					include: ['production/css/screen.css','production/js/app.js']
				},
				name: 'MySite Style Guide'
			},
			files: {
				'production/docs': 'src/sass/*.scss'
			}
		},
	},
	min: {
		dist: {
			'src': ['production/js/app.js'],
			'dest': 'production/js/app.min.js'
		}
	},
	imagemin: {
		dist: {
			options: {
				optimizationLevel: 3
			},
			files: {
				'production/img/*.png': 'src/img/*.png'
				//'production/img/*.jpg': 'src/img/*.jpg'
			}
		}
	},
	slim: {
		dist: {
			files: {
				//'production/rent.html': 'src/rent.slim'
			//	'production/sell.html': 'src/sell.slim'
			}
		}
	},
	regarde: {
		compile: {
			files: ['src/sass/*.scss', 'src/*.slim', 'src/js/*.js'],
			tasks: ['compass', 'copy', 'slim', 'csso', 'clean:dev', 'livereload']
		},
		reload: {
			files: ['production/*.*', 'production/**.*'],
			tasks: [ 'livereload' ]
		}
	},
	clean: {
		dev: ["production/_*.html", "production/css/lib", "src/css", 'production/docs'],
		release: ["production/*",]
	}
});
	//require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-contrib-compass'); //Компасс task: compass
	grunt.loadNpmTasks('grunt-yui-compressor'); // Минимизируем цсс и жс task: min, cssmin
	grunt.loadNpmTasks('grunt-slim'); // Slim препроцессор для хтмл task
	grunt.loadNpmTasks('grunt-contrib-copy'); //Копирует файлы из одного места в другое task: copy
	grunt.loadNpmTasks('grunt-regarde'); //Запускает много тасков и позволяет с ними работать не из консоли
	grunt.loadNpmTasks('grunt-contrib-clean'); // Удаляет/Очищает папки и файлы
	grunt.loadNpmTasks('grunt-contrib-concat'); // Объединяет файлы, похоже используют для объединения жса
	grunt.loadNpmTasks('grunt-csso'); // Минимизирует цсс 
	grunt.loadNpmTasks('grunt-styleguide'); //Universal CSS styleguide generator for grunt
	grunt.loadNpmTasks('grunt-contrib-connect'); //Start a connect web server.
	grunt.loadNpmTasks('grunt-contrib-livereload'); // Обновляет страницу браузера при сохранении
	//grunt.loadNpmTasks('grunt-yui-compressor');
	// grunt.loadNpmTasks('grunt-imgo');
	grunt.loadNpmTasks('grunt-contrib-imagemin'); //Minify PNG and JPEG images


	grunt.registerTask( 'default', ['livereload-start', 'connect', 'regarde' ]);
	//grunt.registerTask( 'release', ['clean:release', 'compass', 'slim', 'copy', 'concat', 'csso', 'min', 'styleguide']);


};