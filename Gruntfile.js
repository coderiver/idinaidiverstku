// npm install
// npm install grunt --save-dev
// gem install slim

'use strict';
var path = require( 'path' );
var lrSnippet = require( 'grunt-contrib-livereload/lib/utils' ).livereloadSnippet;
var folderMount = function folderMount( connect, point ) {
	return connect.static( path.resolve( point ) );
};


module.exports = function(grunt) {

grunt.initConfig({
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
	slim: {
		dist: {
			files: {
				'src/rent.html': 'src/rent.slim',
				'src/sell.html': 'src/sell.slim',
				'src/agent-accept.html': 'src/agent-accept.slim'
			}
		}
	},
	csso: {
		dist: {
			src: 'src/css/screen.css',
			dest:'src/css/screen.min.css'
		}
	},
	regarde: {
		compile: {
			files: ['src/sass/*.sass', 'src/*.slim'],
			tasks: ['compass', 'slim', 'csso', 'clean:dev']
		}
	},
	clean: {
		dev: [ "src/css/lib" ],
		release: [ "src/*.html", "src/css" ]
	}
});
	//require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
	grunt.loadNpmTasks('grunt-contrib-compass'); //Компасс task: compass
	grunt.loadNpmTasks('grunt-slim'); // Slim препроцессор для хтмл task
	grunt.loadNpmTasks('grunt-regarde'); //Запускает много тасков и позволяет с ними работать не из консоли
	grunt.loadNpmTasks('grunt-contrib-clean'); // Удаляет/Очищает папки и файлы
	grunt.loadNpmTasks('grunt-csso'); // Минимизирует цсс


	grunt.registerTask( 'default', ['regarde']);
	grunt.registerTask( 'release', ['clean:release', 'compass', 'slim', 'csso', 'clean:dev']);

};