import autoprefixer from "autoprefixer";
import BrowserSync from "browser-sync";
import cp from "child_process";
import gulp from "gulp";
import gutil from "gulp-util";
import imagemin from "gulp-imagemin";
import mozjpeg from "imagemin-mozjpeg";
import postcss from "gulp-postcss";
import cssNano from "gulp-cssnano";
import responsive from "gulp-responsive";
import sass from "gulp-sass";
import svgSprite from "gulp-svg-sprite";
import webpack from "webpack";
import webpackConfig from "./webpack.conf";

const browserSync = BrowserSync.create();
const hugoBin = "hugo";
const defaultArgs = ["-d", "../dist", "-s", "site", "-v"];

gulp.task("hugo", (cb) => buildSite(cb));
gulp.task("hugo-preview", (cb) => buildSite(cb, ["--buildDrafts", "--buildFuture"]));

gulp.task("build", ["css", "js", "hugo", "img:build", "svg"]);
gulp.task("build-preview", ["css", "js", "hugo-preview"]);

gulp.task("css", () => (
  gulp.src("./src/scss/*.scss")
    .pipe(sass({
      outputStyle:  "nested",
      precision: 10,
      includePaths: ["node_modules"],
    }))
    .pipe(postcss([ autoprefixer() ]))
    .pipe(cssNano())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
));

gulp.task("js", (cb) => {
  const myConfig = Object.assign({}, webpackConfig);

  webpack(myConfig, (err, stats) => {
    if (err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString({
      colors: true,
      progress: true
    }));
    browserSync.reload();
    cb();
  });
});

gulp.task("img", () =>
  gulp.src("./src/img/**.*")
    // Resize images (use with <img> shortcode in hugo)
    .pipe(responsive({
      "*": [{
        width: 480,
        rename: {suffix: "-sm"},
      }, {
        width: 480 * 2,
        rename: {suffix: "-sm@2x"},
      }, {
        width: 675,
      }, {
        width: 675 * 2,
        rename: {suffix: "@2x"},
      }],
    }, {
      silent: true,              // Don't spam the console
      withoutEnlargement: false, // Allow image enlargement
    }))
    .pipe(gulp.dest("./dist/img")
));

gulp.task("img:build", ["img"], () =>
  gulp.src(["./dist/img/*.{jpg,png,gif,svg}"])
    // Optimise images
    .pipe(imagemin([
      imagemin.gifsicle(),
      imagemin.optipng(),
      imagemin.svgo(),
      mozjpeg(),
    ]))
    .pipe(gulp.dest("./dist/img"))
);

gulp.task("svg", () =>
  gulp.src("src/svg/*.svg")
    .pipe(svgSprite({
      mode: {
        inline: true,
        symbol: true
      },
      svg: {
        xmlDeclaration: false,
      }
    }))
    .pipe(gulp.dest("./site/layouts/partials"))
);

gulp.task("server", ["hugo", "css", "js", "img"], () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
  gulp.watch("./src/js/**/*.js", ["js"]);
  gulp.watch("./src/scss/**/*.scss", ["css"]);
  gulp.watch("./site/**/*", ["hugo"]);
});

function buildSite(cb, options) {
  const args = options ? defaultArgs.concat(options) : defaultArgs;
  return cp.spawn(hugoBin, args, {stdio: "inherit"}).on("close", (code) => {
    if (code === 0) {
      browserSync.reload();
      cb();
    } else {
      browserSync.notify("Hugo build failed :(");
      cb("Hugo build failed");
    }
  });
}
