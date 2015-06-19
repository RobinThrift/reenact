
var gulp   = require('gulp'),
    Parsec = require('parsec'),
    config = {
        paths: {
            scripts: ['src/*.js', 'src/**/*.js'],
            tests: {
                unit: ['test/unit/*.spec.js']
            },
            dest: 'dist'
        }
    },
    args = Parsec.parse(process.argv)
                    .options('only', {default: undefined});


gulp.task('scripts:transpile', function() {
    var babel = require('gulp-babel');
    return gulp.src(config.paths.scripts)
        .pipe(babel())
        .pipe(gulp.dest(config.paths.dest));
});

gulp.task('scripts', ['scripts:transpile']);



gulp.task('tests:unit', ['scripts'], function() {
    var mocha = require('gulp-mocha');
    return gulp.src(config.paths.tests.unit, {read: false})
        .pipe(mocha({
            reporter: 'spec',
            ui: 'tdd',
            grep: args.only,
            require: ['should', __dirname + '/test/babelRegister']
        }));
});

gulp.task('tests', ['tests:unit']);

gulp.task('tests:unit:watch', function() {
    gulp.watch(config.paths.scripts, ['tests:unit']);
    gulp.watch(config.paths.tests.unit, ['tests:unit']);
});



gulp.task('build', ['scripts', 'tests']);
