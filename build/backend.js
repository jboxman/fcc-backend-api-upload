require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var app = (0, _express2.default)();

  var port = process.env.PORT || 3100;

  // __dirname is '/' after babel
  app.use(_express2.default.static(process.cwd() + '/public'));

  app.use(_bodyParser2.default.json());

  app.post('/post', (0, _multer2.default)({
    dest: '/tmp',
    limits: { fileSize: 1024 * 1024 * 5 }
  }).any(), function (req, res) {
    var fileSize = 0;
    var fileName = '';
    var path = '';

    if (req.files && req.files[0]) {
      fileSize = req.files[0].size;
      fileName = req.files[0].originalname;
      path = req.files[0].path;
    }

    // unlink
    if (path) {
      _fs2.default.unlinkSync(path);
    }

    res.status(200).json({
      fileName: fileName,
      fileSize: fileSize
    });
  });

  app.use(function (req, res, next) {
    res.status(404).send('Not Found');
  });

  app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).render('error');
  });

  var server = app.listen(port, function () {
    return console.log('Listening on ' + port);
  });
  return server;
};

var _fs = __webpack_require__(3);

var _fs2 = _interopRequireDefault(_fs);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _multer = __webpack_require__(4);

var _multer2 = _interopRequireDefault(_multer);

var _bodyParser = __webpack_require__(1);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

// For testing:
// https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/

/***/ },
/* 1 */
/***/ function(module, exports) {

module.exports = require("body-parser");

/***/ },
/* 2 */
/***/ function(module, exports) {

module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

module.exports = require("fs");

/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = require("multer");

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

__webpack_require__(0).default();

/***/ }
/******/ ]);
//# sourceMappingURL=backend.js.map