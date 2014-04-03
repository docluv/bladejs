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
        concat: {
            dist: {
                src: ['src/license.txt',
                'src/js/dev/*.js'
                ],
                dest: 'src/js/bladejs.js',
                separator: ';'
            },
            license: {
                src: ['src/license.txt',
                'src/js/dev/bladejs.min.js'
                ],
                dest: 'src/js/bladejs.min.js',
                separator: ';'
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
    grunt.registerTask('default', ['uglify', 'concat']);

};