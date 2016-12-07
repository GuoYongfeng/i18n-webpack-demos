var I18nPlugin = require("i18n-webpack-plugin")

function htmlAfterI18nPlugin(options) {
  this.language = options.language || ""
}

htmlAfterI18nPlugin.prototype.apply = function(compiler) {
  // ...
  compiler.plugin('compilation', function(compilation) {
    console.log('The compiler is starting a new compilation...');

    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
      // html assets plugin.HtmlWebpackPlugin.options.filename
      console.log(htmlPluginData.outputName);
      console.log(htmlPluginData.assets.js);

      htmlPluginData.html += 'The magic footer';

      compilation.plugin('i18n-webpack-plugin', function(data, cb){
        console.log( data )


      })
      callback(null, htmlPluginData);
    });


  });

};

module.exports = htmlAfterI18nPlugin;
