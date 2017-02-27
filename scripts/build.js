process.env.NODE_ENV = 'production';
process.noDeprecation = true

const webpack = require('webpack');
const config = require('../config/webpack.config');
const paths = require('../config/paths');
const chalk = require('chalk');
const fs = require('fs-extra');

// Print out errors
function printErrors(summary, errors) {
  console.log(chalk.red(summary));
  console.log();
  errors.forEach(err => {
    console.log(err.message || err);
    console.log();
  });
}

// Remove all files inside build path
fs.emptyDirSync(paths.appBuild);

webpack(config).run((err, stats) => {
    if(err) {
        printErrors('Failed to compile.', [err]);
        process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    console.log(chalk.green('Compiled successfully.'));
})
