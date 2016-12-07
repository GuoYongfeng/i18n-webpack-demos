var path = require("path")
var fs = require("fs")
var I18nPlugin = require("i18n-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

var languages = {
	"en": require("./locals/en/trans.json"),
	"en_US": require("./locals/en_US/trans.json"),
	"zh": require("./locals/zh/trans.json"),
	"zh_CN": require("./locals/zh_CN/trans.json")
};

var configs = Object.keys(languages).map(function(language) {
	return {
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
			new htmlWebpackPlugin({
				filename: 'index.html',
				template: './src/index.html'
			}),
			new I18nPlugin( languages[language] )
		]
	};
});

module.exports = configs
