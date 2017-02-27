const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());

function resolvePath(relativePath) {
      return path.resolve(appDirectory, relativePath);
}

module.exports = {
    context: resolvePath('src/'),
    appIndexJs: resolvePath('src/index.js'),
    appStyle: resolvePath('src/styles/main.scss'),
    appHtml: resolvePath('public/index.html'),
    vendor: ['react', 'react-dom'],
    appBuild: resolvePath('build'),
}
