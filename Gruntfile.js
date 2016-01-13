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
                    archive: 'dist/<%= pkg.name %>.zip'
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

        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    livereload: 35729,
                    open: true,
                    base: ['app']

                }
            },
            test: {
                options: {
                    base: ['app']
                }
            }
        },

        copy: {
            main: {
                src: 'dist/<%= pkg.name %>.zip',
                dest: 'dist/<%= pkg.name %>.war'
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

        protractor: {
            options: {
                configFile: "./e2e/protractor.conf.js",
                args: {
                    baseUrl: getParameter('baseUrl', 'http://localhost:8080/app'),
                    params: {
                        login: {
                            username: getParameter('username', 'root@demo208'),
                            password: getParameter('password', 'root')
                        }
                    }
                }
            },
            e2e: {}
        },

        watch: {
            scripts: {
                files: ['Gruntfile.js', 'karma.conf.js', 'app/**/*', 'test/fixtures/**/*.json'],
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

    grunt.registerTask('default', ['jshint', 'karma:unit', 'clean', 'compress', 'copy']);
    grunt.registerTask('e2e-test', ['connect:test', 'protractor:e2e']);

    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-protractor-runner');

    function getParameter(value, defaultValue) {
        return grunt.option(value) ? grunt.option(value) : defaultValue;
    }
};