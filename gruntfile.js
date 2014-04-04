module.exports = function (grunt) {

    require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
                pkg: grunt.file.readJSON('package.json'),

        lint: {
            all: ['grunt.js', 'src/js/dev/*.js']
        },
        jshint: {
            options: {
                browser: true
            }
        },
        uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        //'<%= grunt.template.today("yyyy-mm-dd") %> */'
        //    },

            dist: {
                src: ['src/js/dev/*.js'],
                dest: 'src/js/dev/bladejs.min.js'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', ['uglify']);

};