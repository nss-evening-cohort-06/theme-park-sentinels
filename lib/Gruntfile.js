module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');


    grunt.initConfig({
        browserify: {
            js: {
                src: ['../javascripts/main.js'],
                dest: '../dist/app.js'
            }
        },
        jshint: {
            options: {
                predef: ["document", "console", "$", "firebase"],
                esnext: true,
                globalstrict: true,
                globals: {},
                browserify: true
            },
            files: ['../javascripts/**/*.js']
        },
        sass: {
            dist: {
                files: {
                    '../styles/main.css': '../sass/main.scss'
                }
            }
        },
        watch: {
            options: {
                livereload: true,
            },
            sass: {
                files: ['../sass/**/*.scss'],
                tasks: ['sass']
            },
            javascripts: {
                files: ['../javascripts/**/*.js'],
                tasks: ['jshint', 'browserify']
            }
        },
        clean: {
            options: { force: true },
            public: ['../public']
        },
        copy: {
            dev: {
                files: [{
                    expand: true,
                    cwd: "../",
                    src: [
                        "index.html",
                        "dist/app.js",
                        "styles/**/*.css",
                        "lib/node_modules/bootstrap/dist/css/bootstrap.min.css",
                        "lib/node_modules/jquery/dist/jquery.min.js",
                        "lib/node_modules/bootstrap/dist/js/bootstrap.min.js",
                        "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf",
                        "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff",
                        "lib/node_modules/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2"

                    ],
                    dest: "../public/"
                }]
            }
        }
    });

    grunt.registerTask('default', ['jshint', 'browserify', 'sass', 'watch']);
    grunt.registerTask('deploy', ['browserify', 'sass', 'copy']);
    grunt.registerTask('cleanit', ['clean']);
};