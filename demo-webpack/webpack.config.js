var path = require("path")
var fs = require("fs")
var I18nPlugin = require("i18n-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

var getEntry = require('./get-entry.js')()

var languages = {
	"en": require("./locals/en/trans.json"),
	"en_US": require("./locals/en_US/trans.json"),
	"zh": require("./locals/zh/trans.json"),
	"zh_CN": require("./locals/zh_CN/trans.json")
};

/**
 * 批量设置plugins
 * @param  {[type]} entrys [description]
 * @param  {[type]} lang   [description]
 * @return {[type]}        [description]
 */
function multiPlugins(entrys, lang){

	var htmlPlugins = []

	for( v in entrys ){
		htmlPlugins.push( new htmlWebpackPlugin({
			title: v,
			filename: v + "/index." + lang + ".html",
			template: entrys[v]
		}) )
	}

	return htmlPlugins
}

var configs = Object.keys(languages).map(function(language) {

	/**
	 * [conf description]
	 * @type {Object}
	 */
	var conf = {
		name: language,
		// entry: "./src/index.js",
		entry: getEntry.js,
		output: {
			path: path.join(__dirname, 'dist/'),
			filename: "/[name]/index." + language + ".js"
		},
		module: {
			loaders: [
				{ test: /\.jsx?$/, loader: 'babel' },
				{ test: /.html$/, loader: 'html?interpolate' },
				{ test: /\.ejs$/, loader: 'ejs' }
			]
		},
		plugins: [
			new I18nPlugin( languages[language] )
		]
	};

	conf.plugins = conf.plugins.concat( multiPlugins(getEntry.ejs, language) )

	return conf
});

module.exports = configs
