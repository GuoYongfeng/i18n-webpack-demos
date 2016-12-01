var path = require("path")
var I18nPlugin = require("i18n-webpack-plugin")
var htmlWebpackPlugin = require("html-webpack-plugin")

var languages = {
	"en": null,
	"de": require("./locals/de.json")
};

module.exports = Object.keys(languages).map(function(language) {
	return {
		name: language,
		entry: "./src/index.js",
		output: {
			path: path.join(__dirname, "dist"),
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
