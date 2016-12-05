var fs = require('fs')

var checkedFiles = []

function getHtmlPath(path){

  fs.readdir(path, function(err, files){
  	if(err) throw err

  	var b = files.forEach(function(file){
  		fs.stat(path + '/' + file, function(err, stat){
  			if(err){
          console.log(err)
          return
        }

  			if(stat.isDirectory()){
  				getHtmlPath(path + '/' + file);
  			}else{
  				var pathName = path + '/' + file

  				if( /\.html$/.test(pathName) ) {
            checkedFiles.push({
              path: pathName,
              filename: file
            })

            // console.log( checkedFiles )
          }
  			}
  		});
return checkedFiles

  	});
    return checkedFiles

  });

  return checkedFiles
}

var a = getHtmlPath("./src");

console.log(a)

module.exports = getHtmlPath
