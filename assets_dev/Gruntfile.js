/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			dist: {
				src: ['../config.js', 'js/plugins.js', 'js/main.js'],
				dest: '../assets/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: '../assets/js/<%= pkg.name %>.min.js'
			}
		},
		compass: {
			dist: {
				options: {
					sassDir: 'sass',
					cssDir: '../assets/css'
				}
			}
		},
		cssmin: {
			minify: {
				src: ['../assets/css/app.css'],
				dest: '../assets/css/app.min.css'
			}
		},
		recess: {
			options: {
				compile: true,
				banner: '<%= banner %>'
			},
			bootstrap: {
				src: ['less/bootstrap.less'],
				dest: '../assets/css/bootstrap.css'
			},
			min: {
				options: {
					compress: true
				},
				src: ['less/bootstrap.less'],
				dest: '../assets/css/bootstrap.min.css'
			},
			theme: {
				src: ['less/theme.less'],
				dest: '../assets/css/bootstrap-theme.css'
			},
			theme_min: {
				options: {
					compress: true
				},
				src: ['less/theme.less'],
				dest: '../assets/css/bootstrap-theme.min.css'
			}
		},
		watch: {
			recess: {
				files: ['less/*'],
				tasks: ['recess']
			},
			compass: {
				files: ['sass/*'],
				tasks: ['compass']
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-recess');

	// Default task.
	grunt.registerTask('default', ['recess', 'compass', 'cssmin', 'concat', 'uglify']);
	grunt.registerTask('css', ['recess', 'compass', 'cssmin']);
	grunt.registerTask('js', ['concat', 'uglify']);
};
