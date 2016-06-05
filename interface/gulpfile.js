const gulp = require('gulp');
const concat = require('gulp-concat');

gulp.task('blockly', function() {
  return gulp
    .src([
      './node_modules/blockly/blockly_compressed.js',
      './node_modules/blockly/blocks_compressed.js',
      './node_modules/blockly/msg/js/pt-br.js'
    ])
    .pipe(concat('blockly.js'))
    .pipe(gulp.dest('./dist/'));
});
