# i18n-webpack-demos

基于webpack的国际化方案探索

## 如何使用该项目

```
$ npm install
$ npm start
```

## TODO

- html编译成多版本
- js 里面异步加载的资源也经过i18n处理

## 如何进行编译

### 基础参照json文件

示例如下，`locals`文件在该项目的 `locals/de.json`
```
{
	"Hello World": "Hallo Welt",
	"国际化解决方案": "internationnal",
	"哈哈": "haha"
}
```

### html文件多语言编译

源代码

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> ${__("国际化解决方案")} </title>
</head>
<body>
  <h1> ${__("哈哈")} </h1>
</body>
</html>

```

编译后效果

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title> internationnal </title>
</head>
<body>
  <h1> haha </h1>
<script type="text/javascript" src="de.output.js"></script></body>
</html>

```

### js文件多语言编译

源代码

```
console.log(__("Hello World"));
console.log(__("Missing Text"));
console.log(__("国际化解决方案"));

```

<details>
  <summary>查看编译后代码</summary>

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	console.log("Hallo Welt");
	console.log("Missing Text");
	console.log("internationnal");

/***/ }
/******/ ]);

</details>

## 相关信息

- [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
- [i18n-webpack-plugin](https://github.com/webpack/i18n-webpack-plugin)
- [淘宝前端国际化方案探索](http://www.taobaofed.org/blog/2016/03/21/internationalization/)
