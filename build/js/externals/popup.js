/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(7);


/***/ }),

/***/ 7:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chrome_api__ = __webpack_require__(8);
// function addTag(tagName) { // sử dụng chrome storage để lưu trữ thẻ tag người dùng nhập thêm
//     chrome.storage.sync.get('myTags', function(data) {
//         if (Array.isArray(data.myTags)) {
//             data.myTags.push(tagName);
//         } else {
//             data.myTags = [tagName];
//         }
//         chrome.storage.sync.set({myTags: data.myTags}, function() {
//             console.log('The number is set to ' + data);
//             renderTag(tagName);
//         });
//     });
// }

// function deleteTag(tagName) { // Xóa bỏ tag từ chrome storage
//     chrome.storage.sync.get('myTags', function(data) {
//         let id = data.myTags.indexOf(tagName);
//         if (id !== -1) {
//             data.myTags.splice(id, 1);
//         }
//         chrome.storage.sync.set({myTags: data.myTags}, function() {
//             console.log('The number is set to ' + data);
//         });
//     });
// }

// function renderTag(tagName) { // render checkbox tương ứng với thẻ tag
//     $(".my-tags").append(`
//         <div class="checkbox-inline">
//             <label><input type="checkbox" value="${tagName}">${tagName}</label>
//             <span class="delete-tag"> x</span>
//         </div>`
//     );
// }

// function renderAllTag() { // render tất cả các thẻ tag của người dùng
//     chrome.storage.sync.get('myTags', function(data) {
//         if (Array.isArray(data.myTags)) {
//             data.myTags.forEach((item) => {
//                 renderTag(item)
//             });
//         }
//     });
// }

// document.addEventListener('DOMContentLoaded', function () { 
//     renderAllTag();
//     $("#pause").hide();
//     $('#play').on('click', () => {
//         chrome.tabs.executeScript(null, {code:"playImg()"});

//         $("#pause").show();
//         $("#play").hide();
//     });

//     $('#pause').on('click', () => {
//         chrome.tabs.executeScript(null,
//           {code:"pauseImg()"});
//         window.close();
//         $("#pause").hide();
//         $("#play").show();
//     });

//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) { // get trang thái pause, play của ảnh trên trang
//         chrome.tabs.sendMessage(tabs[0].id, {message: "get status"}, function(response) {
//             if (response.isPlaying) {
//                 $("#pause").show();
//                 $("#play").hide();
//             }
//             $(".checkbox-inline input").each((index, element) => {
//                 let thth = $(element)[0].value;
//                 let id = response.tagList.findIndex((tag) => { return tag === $(element)[0].value});
//                 if (id >= 0) {
//                     $(element).attr('checked', true);
//                 }
//             });
//         });
//     });

//     $(document).on('change', ".checkbox-inline input", (e) => { // thêm hoặc xóa tag khi người dùng click vào checkbox
//         let tag = e.target.value;
//         let message = '';
//         if (e.target.checked) {
//             message = 'add tag';

//         } else {
//             message = 'delete tag';
//         }
//         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//             chrome.tabs.sendMessage(tabs[0].id, {message: message, tag: tag});
//         });
//     })

//     $(".input-group-addon").on('click', () => { // thêm thẻ tag
//         let tag = $('#tag').val();
//         if (tag !== '') {
//             $('#tag').val('');
//             addTag(tag);
//         } else {
//             console.log('khong nhap gi');
//         }

//     });

//     $(document).on("mouseover", ".checkbox-inline", function() { //hiển thị nút xóa tag khi hover chuột qua checkbox
//         if (!$(this).find('input')[0].checked) {
//             $(this).find("span").css('display', 'inline');
//         }
//     });
//     $(document).on("mouseout", ".checkbox-inline", function() {
//         $(this).find("span").css('display', 'none');
//     });

//     $(document).on("click", ".delete-tag", function() { // khi người dùng xóa tag
//         let tagName = $(this).parent().find("input").val();
//         $(this).parent().remove();
//         deleteTag(tagName);
//     })
// });


// console.log(api);

var url = '';
chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        url = tabs[0].url;
        var matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);
        if (matches !== null && matches[1] && matches[1] !== userId) {
            userId = matches[1];
            chrome.tabs.sendMessage(tabs[0].id, { message: "get point", id: matches[1], api: '1' }, function (response) {
                //
            });
        }
    });
});

var userId = '';

chrome.tabs.onUpdated.addListener(function () {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
        // console.log('vaof', tabs[0]);

        if (url !== tabs[0].url) {
            url = tabs[0].url;
            var matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);
            if (matches !== null && matches[1] && matches[1] !== userId) {
                userId = matches[1];
                chrome.tabs.sendMessage(tabs[0].id, { message: "get point", id: matches[1] }, function (response) {
                    //
                });
            }
        }
    });
});

chrome.runtime.onMessage.addListener(function (params) {
    console.log(params);
    if (params.message === 'get point') {
        console.log('vào');

        chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
            url = tabs[0].url;
            console.log(url);

            var matches = url.match(/https:\/\/unipos.me\/.*?i=(.*)/);
            console.log(matches);

            if (matches !== null && matches[1]) {
                userId = matches[1];
                console.log('vàooooooo');

                chrome.tabs.sendMessage(tabs[0].id, { message: "get point", id: matches[1] }, function (response) {
                    //
                });
            }
        });
    }
});

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ChromeAPI = function () {
    function ChromeAPI() {
        _classCallCheck(this, ChromeAPI);

        console.log('va0f');
    }

    _createClass(ChromeAPI, [{
        key: 'getUrl',
        value: function getUrl() {
            var url = '';
            chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, function (tabs) {
                url = tabs[0].url;
            });
            return url;
        }
    }]);

    return ChromeAPI;
}();

var api = new ChromeAPI();
/* unused harmony default export */ var _unused_webpack_default_export = (api);

/***/ })

/******/ });