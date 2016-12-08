var path = require("path")
var fs = require("fs")
var I18nPlugin = require("i18n-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")
var glob = require("glob")
var HtmlDependencyWebpackPlugin = require('./html-addon-plugin.js')
var languages = {
	"en": require("./locals/en/trans.json"),
	"en_US": require("./locals/en_US/trans.json"),
	"zh": require("./locals/zh/trans.json"),
	"zh_CN": require("./locals/zh_CN/trans.json")
};

var plugins = []


var a = glob('src/**/*.html', function(err, files){

	files.forEach(function( html ){
		plugins.push(new htmlWebpackPlugin({
	    template: html,
	    filename: path.basename(html, '.html')
	  }))
	})

	return plugins

})

console.log( plugins )



var configs = Object.keys(languages).map(function(language) {
	/**
	 * [conf description]
	 * @type {Object}
	 */
	var conf = {
		name: language,
		entry: "./src/index.js",
		output: {
			path: path.join(__dirname, 'dist/'),
			filename: language + ".output.js"
		},
		module: {
			loaders: [
				{
					test: /\.jsx?$/,
					loader: 'babel'
				},
				{
					test: /.html$/,
					loader: 'html?interpolate'
				}
			]
		},
		plugins: [
			new I18nPlugin( languages[language] )
		]
	};

	return conf
});

module.exports = configs
