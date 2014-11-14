// dependencies

var gulp = require('gulp')
gulp.concat = require('gulp-concat')
gulp.compile = require('gulp-hogan-compile')

function build () {
  return gulp.dest('build')
}

// paths

var paths = {
  templates: [
    'templates/**/*.html',
  ],
  vendor: [
    // promises
    'bower_components/bluebird/js/browser/bluebird.js',

    // templates
    'bower_components/hogan/web/builds/3.0.2/hogan-3.0.2.js',

    // backbone
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/underscore.js',
    'bower_components/backbone/backbone.js',

    // firebase
    'bower_components/backfire/dist/backfire.js',

    // amd
    'bower_components/almond/almond.js',
  ],
  scripts: [
    'scripts/services/**/*.js',
    'scripts/models/**/*.js',
    'scripts/views/**/*.js',
    'scripts/setup.js',
  ],
  stylesheets: [
    'stylesheets/**/*.css',
  ]
}

// tasks

gulp.task('default', [ 'build', 'watch' ])

gulp.task('build', [ 'templates', 'scripts', 'stylesheets' ], function () {
  gulp.src(paths.vendor).pipe(gulp.concat('vendor.js')).pipe(build())  
})

gulp.task('watch', function () {
  Object.keys(paths).map(function (key) {
    gulp.watch(paths[key], [ key ])
  })
})

gulp.task('templates', function () {
  gulp.src('index.html').pipe(build())
  gulp.src(paths.templates).pipe(gulp.compile('jst.js', { wrapper: false })).pipe(build())
})

gulp.task('scripts', function () {  
  gulp.src(paths.scripts).pipe(gulp.concat('main.js')).pipe(build())
})

gulp.task('stylesheets', function () {
  gulp.src(paths.stylesheets).pipe(gulp.concat('style.css')).pipe(build())
})
