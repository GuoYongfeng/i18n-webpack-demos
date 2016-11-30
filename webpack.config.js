var path = require("path");
var I18nPlugin = require("i18n-webpack-plugin");

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
		plugins: [
			new I18nPlugin(
				languages[language]
			)
		]
	};
});
