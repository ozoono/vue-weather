//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
/*
    configureWebpack: {
        plugins: [
          new BundleAnalyzerPlugin()
        ]
    },
*/
    publicPath: process.env.NODE_ENV === 'production'
      ? './'
      : '/'    
};
