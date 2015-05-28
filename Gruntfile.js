'use strict';

module.exports = function (grunt) {

    var pkg = grunt.file.readJSON('package.json');

    grunt.initConfig({

        pkg: pkg,

        config: {
            imageTypes: 'jpg,jpeg,gif,png,svg',
            dirs: {
                assets: 'app/assets',
                distAssets: 'dist/app/assets',
                distViews: 'dist/app/views'
            }
        },

        // clean up generated dirs
        clean: {
            release: [ 'dist', '.tmp' ],
            temp: ['.tmp']
        },

        // use .jshintrc options
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= config.dirs.assets %>/scripts/**/*.js',
                '!app/bower_components/**/*'
            ]
        },

        // generate css from less
        less: {
            dev: {
                expand: true,
                cwd: '<%= config.dirs.assets %>/styles/less/',
                src: ['AdminLTE.less', 'skins/skin-*.less'],
                ext: '.css',
                dest: '<%= config.dirs.assets %>/styles/'
            }
        },

        // Usemin Config
        useminPrepare: {
            html: ['app/**/*.handlebars'],
            options: {
                dest: '<%= config.dirs.distAssets %>'
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
            // only copy the templates,
            // images, css and js files will be taken care of by imagemin, cssmin and uglify
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

        // rename images, js and css with content hash
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            release: {
                files: [{
                    src: [
                        '<%= config.dirs.distAssets %>/images/**/*.{<%=config.imageTypes%>}',
                        '<%= config.dirs.distAssets %>/scripts/*.js',
                        '<%= config.dirs.distAssets %>/styles/*.css',
                        '<%= config.dirs.distAssets %>/styles/skins/*.css'
                    ]
                }]
            }
        },

        // minify images
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dirs.assets %>/images',
                    src: '**/*.{<%=config.imageTypes%>}',
                    dest: '<%= config.dirs.distAssets %>/images'
                }]
            }
        },

        // minify html
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
                    cwd: '<%= config.dirs.distViews %>',
                    src: ['**/*.handlebars'],
                    dest: '<%= config.dirs.distViews %>'
                }]
            }
        },

        // usemin configurations
        usemin: {
            html: ['<%= config.dirs.distViews %>/**/*.handlebars'],
            css: [
                '<%= config.dirs.distAssets %>/styles/*.css',
                '<%= config.dirs.distAssets %>/styles/skins/*.css'
            ],
            options: {
                assetsDirs: ['<%= config.dirs.distAssets %>', '<%= config.dirs.distAssets %>/styles']
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
                    '<%= config.dirs.assets %>/scripts/**/*.js',
                ]
            },
            css: {
                files: [
                    '<%= config.dirs.assets %>/styles/**/*.css',
                ]
            },
            less: {
                files: ['<%= config.dirs.assets %>/styles/**/*.less'],
                tasks: ['less:dev']
            },
            images: {
                files: [
                    '<%= config.dirs.assets %>/images/**/*.{png,jpg,jpeg,webp}'
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
        'htmlmin',
        'clean:temp'
    ]);

};
