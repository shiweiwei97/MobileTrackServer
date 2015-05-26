'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        // Watch Config
        watch: {
            files: ['views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'assets/scripts/**/*.js',
                ]
            },
            css: {
                files: [
                    'assets/styles/**/*.css',
                ]
            },
            less: {
                files: ['assets/styles/**/*.less'],
                tasks: ['less:dev']
            },
            images: {
                files: [
                    'assets/images/**/*.{png,jpg,jpeg,webp}'
                ]
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            }
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist'
                    ]
                }]
            },
            server: ['.tmp']
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/scripts/**/*.js',
                '!assets/bower_components/**/*'
            ]
        },

        // Sass Config
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/styles/sass',
                    dest: 'assets/styles',
                    src: ['screen.scss'],
                    ext: '.css'
                }]
            }
        },

        less: {
            // Development not compressed
            dev: {
                options: {
                    // Whether to compress or not
                    compress: false
                },
                files: {
                    // compilation.css  :  source.less
                    'assets/styles/AdminLTE.css': 'assets/styles/less/AdminLTE.less',
                    //Non minified skin files
                    'assets/styles/skins/skin-blue.css': 'assets/styles/less/skins/skin-blue.less',
                    'assets/styles/skins/skin-black.css': 'assets/styles/less/skins/skin-black.less',
                    'assets/styles/skins/skin-yellow.css': 'assets/styles/less/skins/skin-yellow.less',
                    'assets/styles/skins/skin-green.css': 'assets/styles/less/skins/skin-green.less',
                    'assets/styles/skins/skin-red.css': 'assets/styles/less/skins/skin-red.less',
                    'assets/styles/skins/skin-purple.css': 'assets/styles/less/skins/skin-purple.less',
                    'assets/styles/skins/skin-blue-light.css': 'assets/styles/less/skins/skin-blue-light.less',
                    'assets/styles/skins/skin-black-light.css': 'assets/styles/less/skins/skin-black-light.less',
                    'assets/styles/skins/skin-yellow-light.css': 'assets/styles/less/skins/skin-yellow-light.less',
                    'assets/styles/skins/skin-green-light.css': 'assets/styles/less/skins/skin-green-light.less',
                    'assets/styles/skins/skin-red-light.css': 'assets/styles/less/skins/skin-red-light.less',
                    'assets/styles/skins/skin-purple-light.css': 'assets/styles/less/skins/skin-purple-light.less',
                    'assets/styles/skins/_all-skins.css': 'assets/styles/less/skins/_all-skins.less'
                }
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

        // Rev Config
        rev: {
            dist: {
                files: {
                    src: [
                        'dist/assets/scripts/**/*.js',
                        'dist/assets/styles/**/*.css',
                        'dist/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                        'dist/assets/styles/fonts/**/*.*'
                    ]
                }
            }
        },

        // Usemin Config
        useminPrepare: {
            options: {
                dest: 'dist/assets'
            },
            html: ['assets/{,*/}*.html', 'views/**/*.handlebars']
        },
        usemin: {
            options: {
                dirs: ['dist/assets'],
                basedir: 'dist/assets',
            },
            html: ['dist/assets/{,*/}*.html', 'dist/views/**/*.handlebars'],
            css: ['dist/assets/styles/{,*/}*.css']
        },

        // Imagemin Config
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'dist/assets/images'
                }]
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/assets/images'
                }]
            }
        },

        // HTML Config
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: 'assets',
                    src: '*.html',
                    dest: 'dist/assets'
                }]
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'assets',
                    dest: 'dist/assets',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: 'dist/views/',
                    src: '**/*.handlebars',
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'assets/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },

        // Concurrent Config
        concurrent: {
            dist: [
                'copy:styles',
                'svgmin',
                'htmlmin'
            ]
        },
    });

    // Register Tasks
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-svgmin');
    grunt.loadNpmTasks('grunt-usemin');

    // Workon
    grunt.registerTask('workon', 'Start working on this project.', [
        'jshint',
        'less:dev',
        'express:dev',
        'open:site',
        'watch'
    ]);

    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'
    ]);

    // Build
    grunt.registerTask('build', 'Build production ready assets and views.', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'imagemin',
        'concat',
        'uglify',
        'copy:dist',
        'rev',
        'usemin'
    ]);

};
