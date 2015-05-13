module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            options: {
                loadPath: [
                    'lib/foundation/scss'
                ]
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'dist/css/app.css': 'src/scss/app.scss'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/js/modernizr.min.js':     ['lib/modernizr/modernizr.js'],
                    'dist/js/jquery.min.js':        ['lib/jquery/dist/jquery.js'],
                    'dist/js/app.min.js':           ['src/js/app.js']
                }
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'src/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images/'
                }]
            }
        },

        copy: {
            main: {
                files: [
                    {expand: true, src: ['lib/foundation/js/foundation.min.js'], dest: 'dist/js/', flatten: true, filter: 'isFile'},
                ],
            },
        },

        watch: {
            options: { livereload: true },
            grunt: {files: ['Gruntfile.js']},

            sass: {
                files: [
                    'src/scss/**/*.scss',
                    'lib/foundation/scss/**/*.scss'
                ],
                tasks: ['sass']
            },

            uglify: {
                files: [
                    'src/js/**/*.js'
                ],
                tasks: ['uglify']
            },

            copy: {
                files: [
                    ['src/js/**/*.js']
                ],
                tasks: ['copy']
            },

            imagemin: {
                files: [
                    'src/images/**/*.*'
                ],
                tasks: ['imagemin']
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['sass', 'uglify', 'copy', 'imagemin']);
    grunt.registerTask('default', ['build', 'watch']);
}

