var htmlWebpackPlugin = require("html-webpack-plugin")

var basePath = process.cwd()
var srcPath = basePath + '/src/'

var entrys = {}, templates = {}

var pageData = {
  "addexternalexpert": {
    "entry": srcPath + "addexternalexpert/index.js",
    "template": srcPath + "addexternalexpert/index.ejs"
  },
  "addinsideexpert": {
    "entry": srcPath + "addinsideexpert/index.js",
    "template": srcPath + "addinsideexpert/index.ejs"
  },
  "index": {
    "entry": srcPath + "index.js",
    "template": srcPath + "index.html"
  }
}

for (var v in pageData) {
  entrys[v] = pageData[v].entry

  templates[v] = pageData[v].template
}

/**
 * 批量设置plugins
 * @param  {[type]} entrys [description]
 * @param  {[type]} lang   [description]
 * @return {[type]}        [description]
 */
function multiPlugins(entrys){

  return function(lang){
    var htmlPlugins = []

  	for( v in entrys ){
  		htmlPlugins.push( new htmlWebpackPlugin({
  			title: v,
  			filename: v + "/index." + lang + ".html",
  			template: entrys[v],
        chunks: [v, 'commons'],
        hash: true,
        // minify: true
  		}) )
  	}

  	return htmlPlugins
  }

}

module.exports = {
  entrys: entrys,
  setMultiLangTemplates: multiPlugins( templates )
}
