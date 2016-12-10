var path = require("path")
var fs = require("fs")
var I18nPlugin = require("i18n-webpack-plugin")
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var getEntry = require('./get-entry.js')
var setMultiLangTemplates = getEntry.setMultiLangTemplates

var languages = require('./languages.js')


var configs = Object.keys(languages).map(function(language) {

	// multiple extract instances
	var extractLESS = new ExtractTextPlugin('[name]/index.' + language + '.css');

	/**
	 * [conf description]
	 * @type {Object}
	 */
	var conf = {
		name: language,
		entry: getEntry.entrys,
		context: path.resolve(__dirname, "../src"),
		output: {
			path: path.resolve(__dirname, "../dist"),
			filename: "[name]/index." + language + ".js",
			publicPath: '../'
		},
		module: {
			loaders: [
				{ test: /\.jsx?$/, loader: 'babel' },
				{ test: /.html$/, loader: 'html?interpolate' },
				{ test: /\.ejs$/, loader: 'ejs' },
				{ test: /\.less$/, loader: extractLESS.extract(['css','less']) }
			]
		},
		plugins: [
			new I18nPlugin( languages[language] )
		]
	};

	conf.plugins = conf.plugins.concat( setMultiLangTemplates(language) )
	conf.plugins.push( extractLESS )

	return conf
});

module.exports = configs
