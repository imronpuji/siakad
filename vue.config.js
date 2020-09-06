module.exports = {
  devServer: {
    proxy: {
      "^/": {
      target: 'https://cc9a5cfe5075.ngrok.io',
      ws: true,
      changeOrigin: true
    }
 },
},
    lintOnSave: false,
    runtimeCompiler: true,
    configureWebpack: {
      //Necessary to run npm link https://webpack.js.org/configuration/resolve/#resolve-symlinks
      resolve: {
         symlinks: false
      }
    },
    transpileDependencies: [
      '@coreui/utils'
    ]
  }