var path = require('path'),
    args = require('yargs').argv,
    fs = require('file-system'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace'),
    uglify  = require('gulp-uglify'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var experimentName = '';
var reStarted = false;

if (args.new == undefined && args.start == undefined) {
    console.log('Please use gulp --start experiment-folder-name or gulp --new experiment-folder-name')
    process.exit();
}
// Check if extension directory exists
if (!fs.existsSync('./ABdev_extension/experiments/' + args.start)) {
    if (args.new !== undefined) {
        if (!fs.existsSync('./ABdev_extension/experiments/' + args.new)) {
            fs.mkdir('./ABdev_extension/experiments/' + args.new);
            fs.mkdir('./ABdev_extension/experiments/' + args.new + '/js');
            fs.mkdir('./ABdev_extension/experiments/' + args.new + '/less');
            fs.writeFileSync('./ABdev_extension/experiments/' + args.new + '/js/experiment.js', '');
            fs.writeFileSync('./ABdev_extension/experiments/' + args.new + '/less/experiment.less', '');

            // Empty experiment mixed dist file
            fs.writeFileSync('./ABdev_extension/app/dist/experiment.mixed.min.js', '');
            var experimentName = args.new;

        } else {
            console.log('Experiment folder name already exists!');
            process.exit();
        }
    } else {
        console.log('Experiment folder name was not found!');
        process.exit();
    }
} else {
    var experimentName = args.start;
    var reStarted = true;
}

console.log('Experiment '+experimentName+' is now up and running!');

var paths = {
    src: {
        less: './ABdev_extension/experiments/' + experimentName + '/less/',
        js: './ABdev_extension/experiments/' + experimentName + '/js/'
    },
    dist: './ABdev_extension/app/dist/'
};

// Compile less files 
gulp.task('styles', function () {
    return gulp.src(paths.src.less + '*.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        /*
         * Replace all double quotes 
         * with single quotes - so we can 
         * use the css as a variable .js
         */
        .pipe(replace('"', "'"))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist));
});

// Compile js files 
gulp.task('scripts', function () {
    var b = browserify({
        entries: [paths.src.js + 'experiment.js'],
        paths: ['./node_modules', paths.src.js]
    });
    return b.bundle()
        .pipe(source('experiment.js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist));
});

// Compile js mixed with css
gulp.task('mix', function () {
    var css = fs.readFileSync(paths.dist + 'experiment.min.css', "utf8");
    var js = fs.readFileSync(paths.dist + 'experiment.min.js', "utf8");
    var mixed = '(function(){';
    mixed += 'var css = document.createElement("style");';
    mixed += 'css.type = "text/css";';
    mixed += 'css.innerHTML = "' + css + '";';
    mixed += 'document.body.appendChild(css);';
    mixed += '})();';
    mixed += ';';
    mixed += js;
    fs.writeFileSync(paths.dist + 'experiment.mixed.min.js', mixed)
});

// Default watch task
gulp.task('watch', function () {
    gulp.watch(paths.src.less + '**/*.less', ['styles']);
    gulp.watch(paths.src.js + '**/*.js', ['scripts']);
    gulp.watch([
        paths.dist + 'experiment.min.js',
        paths.dist + 'experiment.min.css'
    ], ['mix']);
});

// Run default gulp tasks
gulp.task('default', ['watch']);
if (reStarted) {
    gulp.start('styles', 'scripts', 'mix');
}
