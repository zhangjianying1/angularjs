module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['js/utils/*.js']
        },
        watch: {
            script: {
                files: ["js/utils/*.js"],
                tasks: ["jshint"],
                options: {
                    debounceDelay: 250
                }
            },
            uglify: {
                files: ["js/utils/*.js", "js/app/*.js"],
                tasks: ["uglify"],
                options: {
                    debounceDelay: 250
                }
            },
            compass: {
                files: ["sass/*.scss", "sass/**/*.scss"],
                tasks: ["compass"],
                options: {
                    debounceDelay: 250
                }
            },
            cssmin: {
                files: ["stylesheets/*.css"],
                tasks: ["cssmin"],
                options: {
                    debounceDelay: 250
                }
            },
            livereload: {
                files: ["js/utils/*.js", "images/**/*.png", "stylesheets/*.css", "templates/**/*.html"],
                options: {
                    livereload: true
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    "dist/utils/caimi-core-ajax.js": [ "js/utils/caimi-core-ajax.js" ],
                    "dist/utils/entry.js": [ "js/utils/entry.js" ],
                    "dist/app.js": [ "js/app.js" ],
                    "dist/app/activity-app.js": [ "js/app/activity-app.js" ],
                    "dist/app/activity1.19-app.js": [ "js/app/activity1.19-app.js" ],
                    "dist/app/excharge-app.js": [ "js/app/excharge-app.js" ],
                    "dist/app/entry-app.js": [ "js/app/entry-app.js" ],
                    "dist/app/reword-app.js": [ "js/app/reword-app.js" ],
                    "dist/utils/caimi-core-form.js": [ "js/utils/caimi-core-form.js" ],
                    "dist/utils/caimi-core-url.js": [ "js/utils/caimi-core-url.js" ],
                    "dist/utils/caimi-imgload.js": [ "js/utils/caimi-imgload.js" ],
                    "dist/utils/caimi-tab.js": [ "js/utils/caimi-tab.js" ],
                    "dist/utils/caimi-version.js": [ "js/utils/caimi-version.js" ],
                    "dist/utils/caimi-core-layer.js": [ "js/utils/caimi-core-layer.js" ],
                    "dist/utils/caimi-core-islogin.js": [ "js/utils/caimi-core-islogin.js" ],
                    "dist/utils/caimi-core-versionnumber.js": [ "js/utils/caimi-core-versionnumber.js" ]
                }
            }
        },
        cssmin: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    "dist/login.min.css": [ "stylesheets/login.css" ]
                }
            }

        },
        compass: {
            dist: {
                options: {
                    config: 'config.rb'
                }
            }
        },
//        copy: {
//            main: {
//                files: [
//                    {expand: true, src: ['images/**/*'], dist: 'img/', filter: 'isFile'}
//                ]
//            }
//        },
        copy: {
            test: {
                flatten: true,
                expand: true,
                src: ['images/*'],
                dest: 'img/'
            }
        },
        imagemin: {
            dynamic: {
                files: [
                    {
                        expand: true,
                        cwd: 'img/',
                        src: ['**//*.{png,jpg,gif}'],
                        dist: 'images'
                    }
                ]
            }
        },
        requirejs: {
            compile: {
                "options": {
                    "baseUrl": "./",
                    "paths": {
                        "app": "js/app",
                        "test": "js/test",
                        "test2": "js/test2"
                    },
                    "include": [
                        "app",
                        "test",
                        "test2"
                    ],
                    "out": "js/libs.js"
                }
            }
        },
        clean: {
            files: ['img']
        },
        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 8
            },
            assets: {
                files: [
                    {
                        src: [
                            'img/**/*.{jpg,jpeg,gif,png}'
                        ]
                    }
                ]
            }
        },
        useminPrepare: {
            html: 'index.html',
            options: {
                dest: 'tep'
            }
        },
        usemin: {
            html: ['*.html'],      // 注意此处是build/
            options: {
                assetsDirs: ['tpl/']
            }
        }
       /*,
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                   // paths：js源码位置；
                    //themedir：文档模板位置；
                    //outdir：文档输出位置。
                    paths: 'js/',
                    themedir: 'theme/',
                    outdir: 'docs/'
                }
            }
        }*/
    });
    

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-usemin');
    //grunt.loadNpmTasks('grunt-contrib-imagemin');
    //grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.registerTask('default', [ 'uglify', 'jshint', 'watch', 'cssmin', 'compass', 'copy', "livereload", "requirejs", "rev", "usemin"]);
    grunt.registerTask('md5', ['clean', 'copy', 'rev']);
    grunt.registerTask('rev', ['useminPrepare', 'usemin']);
}; 