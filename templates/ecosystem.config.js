module.exports = {
  apps: [{
    script: 'cd {{appName}}; node_modules/lambda-edge-server/server.js --handler src/app.js',
    error_files: '.devcontainer/error.log',
    out_file: '.devcontainer/debug.log',
    watch: ['{{appName}}/src'],
    watch_delay: 1000
  }]
};
