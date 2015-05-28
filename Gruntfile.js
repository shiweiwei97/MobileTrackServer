'use strict';

module.exports = function (grunt) {


    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        // clean up generated dirs
        clean: {
            release: [ 'dist', '.tmp' ]
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'app/assets/scripts/**/*.js',
                '!app/bower_components/**/*'
            ]
        },

        less: {
            dev: {
                expand: true,
                cwd: 'app/assets/styles/less/',
                src: ['AdminLTE.less', 'skins/skin-*.less'],
                ext: '.css',
                dest: 'app/assets/styles/'
            }
        },

        // Usemin Config
        useminPrepare: {
            html: ['app/**/*.handlebars'],
            options: {
                dest: 'dist/app/assets'
            }
        },

        concat: {
            options: {
                separator: ''
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            }
        },

        copy: {
            // copy templates
            release: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        src: [
                            'views/**/*.handlebars'
                        ],
                        dest: 'dist/app'
                    }
                ]
            }
        },

        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            // rev images, js, css
            release: {
                files: [{
                    src: [
                        'dist/app/assets/images/**/*.{jpg,jpeg,gif,png,svg}',
                        'dist/app/assets/scripts/*.js',
                        'dist/app/assets/styles/*.css',
                        'dist/app/assets/styles/skins/*.css'
                    ]
                }]
            }
        },

        imagemin: {
            // minimized images
            release: {
                files: [{
                    expand: true,
                    cwd: 'app/assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'dist/app/assets/images'
                }]
            }
        },

        htmlmin: {
            options: {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeOptionalTags: true
            },
            release: {
                files: [{
                    expand: true,
                    cwd: 'dist/app/views',
                    src: ['**/*.handlebars'],
                    dest: 'dist/app/views'
                }]
            }
        },

        usemin: {
            html: ['dist/app/views/**/*.handlebars'],
            css: [
                'dist/app/assets/styles/*.css',
                'dist/app/assets/styles/skins/*.css'
            ],
            options: {
                assetsDirs: ['dist/app/assets', 'dist/app/assets/styles']
            }
        },

        // Express Config
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Open Config
        open: {
            site: {
                path: 'http://localhost:3000',
                app: 'Google Chrome'
            }
        },

        // Watch Config
        watch: {
            files: ['app/views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'app/assets/scripts/**/*.js',
                ]
            },
            css: {
                files: [
                    'app/assets/styles/**/*.css',
                ]
            },
            less: {
                files: ['app/assets/styles/**/*.less'],
                tasks: ['less:dev']
            },
            images: {
                files: [
                    'app/assets/images/**/*.{png,jpg,jpeg,webp}'
                ]
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    // Invoked when grunt is called
    grunt.registerTask('default', 'Default task', [
        'jshint',
        'less:dev',
        'express:dev',
        'open:site',
        'watch'
    ]);

    grunt.registerTask('release', 'Creates a release in /dist', [
        'clean',
        'jshint',
        'less:dev',
        'useminPrepare',
        'imagemin',
        'concat',
        'uglify',
        'cssmin',
        'copy',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

};
