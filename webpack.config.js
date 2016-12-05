var path = require("path")
var I18nPlugin = require("i18n-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

var fs = require("fs")
var path = require("path")

var languages = {
	"en": require("./locals/en/trans.json"),
	"en_US": require("./locals/en_US/trans.json"),
	"zh": require("./locals/zh/trans.json"),
	"zh_CN": require("./locals/zh_CN/trans.json")
};

module.exports = Object.keys(languages).map(function(language) {
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
			new I18nPlugin( languages[language] ),
			new htmlWebpackPlugin({
				filename: 'index.html',
      	template: './src/index.html'
			})
		]
	};
});
