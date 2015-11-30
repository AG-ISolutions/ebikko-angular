module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        bower: {
            install: {}
        },

        clean: {
            temp: {
                src: ['dist']
            }
        },

        compress: {
            dist: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [{
                    expand: true,
                    cwd: './app',
                    src: ['**/*', '!**/test/**'],
                    dest: '/'
                }]
            }
        },

        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['app/components/**/*.js', 'app/src/**/*.js', 'tmp/*.js'],
                dest: 'dist/app.js'
            }
        },

        jshint: {
            all: {
                src: ['Gruntfile.js', 'karma.conf.js', 'app/components/**/*.js', 'app/src/**/*.js', '!app/src/treetable/*']
            }
        },

        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            unit: {
                singleRun: true
            },

            continuous: {
                singleRun: false,
                autoWatch: true
            }
        },

        html2js: {
            dist: {
                src: ['app/components/**/*.html'],
                dest: 'tmp/templates.js'
            }
        },

        watch: {
            scripts: {
                files: ['Gruntfile.js', 'karma.conf.js', 'app/app.js', 'app/components/**/*.js', 'app/src/**/*.js'],
                tasks: ['karma:unit', 'jshint'],
                options: {
                    nospawn: true,
                },
            }
        },

        uglify: {
            dist: {
                files: {
                    'dist/app.js': ['dist/app.js']
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'karma:unit', 'clean', 'compress']);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
};