module.exports = {
  apps: [{
    script: 'node_modules/lambda-edge-server/server.js',
    args: '--handler src/app.js',
    cwd: '{{appName}}',
    error_files: '.devcontainer/error.log',
    out_file: '.devcontainer/debug.log',
    watch: ['{{appName}}/src'],
    watch_delay: 5000,
    instances: 1,
    exec_mode: 'fork'
  }]
};
