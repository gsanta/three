/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./msw_mock_api/mocks/handlers.ts":
/*!****************************************!*\
  !*** ./msw_mock_api/mocks/handlers.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handlers\": () => (/* binding */ handlers)\n/* harmony export */ });\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msw */ \"msw\");\n/* harmony import */ var msw__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(msw__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _jsons_sprites_json__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../jsons/sprites.json */ \"./msw_mock_api/jsons/sprites.json\");\n\n\nconst token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjQxNjczOTYyLCJleHAiOjE2NDE3NjAzNjIsImp0aSI6ImE1YWMxZmNkLWNmMjQtNGI4OC04OWY4LTZjNTg5NDVjYjQxYSJ9.3zZFQDMe4EeUvb-yBcTRkLXfMzhDVAKn0HGsRmJF0WE';\nconst testUser = {\n    email: 'user1@test.com',\n    password: '123456'\n};\nconst isAuthorized = (req)=>{\n    const authHeader = req.headers.get('Authorization');\n    return authHeader?.endsWith(token);\n};\nconst handlers = [\n    msw__WEBPACK_IMPORTED_MODULE_0__.rest.post('/api/v1/auth/login', async (req, res, ctx)=>{\n        const { user  } = req.body;\n        if (user.email === testUser.email && user.password === testUser.password) {\n            const header = ctx.set('Authorization', `Bearer ${token}`);\n            const loginResponse = {\n                data: {\n                    attributes: {\n                        email: user.email\n                    }\n                }\n            };\n            return res(header, ctx.json(loginResponse));\n        } else {\n            return res(ctx.json('not successful login'));\n        }\n    }),\n    msw__WEBPACK_IMPORTED_MODULE_0__.rest.get('/api/sprite/name/:spriteName', async (req, res, ctx)=>{\n        const { spriteName  } = req.params;\n        const sprite = _jsons_sprites_json__WEBPACK_IMPORTED_MODULE_1__.sprites.find((s)=>s.name === spriteName\n        );\n        return res(ctx.json(sprite));\n    }),\n    msw__WEBPACK_IMPORTED_MODULE_0__.rest.get('/api/v1/sprite_sheet', async (_req, res, ctx)=>{\n        const sprites = _jsons_sprites_json__WEBPACK_IMPORTED_MODULE_1__.sprites;\n        if (!isAuthorized) {\n            return res(ctx.status(401), ctx.json('Login required.'));\n        }\n        return res(ctx.json(sprites));\n    }), \n];\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tc3dfbW9ja19hcGkvbW9ja3MvaGFuZGxlcnMudHMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUMwQjtBQUNxQjtBQUUvQyxLQUFLLENBQUNFLEtBQUssR0FDVCxDQUEyTjtBQUU3TixLQUFLLENBQUNDLFFBQVEsR0FBRyxDQUFDO0lBQ2hCQyxLQUFLLEVBQUUsQ0FBZ0I7SUFDdkJDLFFBQVEsRUFBRSxDQUFRO0FBQ3BCLENBQUM7QUFTRCxLQUFLLENBQUNDLFlBQVksSUFBSUMsR0FBWSxHQUFLLENBQUM7SUFDdEMsS0FBSyxDQUFDQyxVQUFVLEdBQUdELEdBQUcsQ0FBQ0UsT0FBTyxDQUFDQyxHQUFHLENBQUMsQ0FBZTtJQUVsRCxNQUFNLENBQUNGLFVBQVUsRUFBRUcsUUFBUSxDQUFDVCxLQUFLO0FBQ25DLENBQUM7QUFFTSxLQUFLLENBQUNVLFFBQVEsR0FBRyxDQUFDO0lBQ3ZCWiwwQ0FBUyxDQUFjLENBQW9CLDRCQUFTTyxHQUFHLEVBQUVPLEdBQUcsRUFBRUMsR0FBRyxHQUFLLENBQUM7UUFDckUsS0FBSyxDQUFDLENBQUMsQ0FBQ0MsSUFBSSxFQUFDLENBQUMsR0FBR1QsR0FBRyxDQUFDVSxJQUFJO1FBRXpCLEVBQUUsRUFBRUQsSUFBSSxDQUFDWixLQUFLLEtBQUtELFFBQVEsQ0FBQ0MsS0FBSyxJQUFJWSxJQUFJLENBQUNYLFFBQVEsS0FBS0YsUUFBUSxDQUFDRSxRQUFRLEVBQUUsQ0FBQztZQUN6RSxLQUFLLENBQUNhLE1BQU0sR0FBR0gsR0FBRyxDQUFDSSxHQUFHLENBQUMsQ0FBZSxpQkFBRyxPQUFPLEVBQUVqQixLQUFLO1lBQ3ZELEtBQUssQ0FBQ2tCLGFBQWEsR0FBcUIsQ0FBQztnQkFDdkNDLElBQUksRUFBRSxDQUFDO29CQUNMQyxVQUFVLEVBQUUsQ0FBQzt3QkFDWGxCLEtBQUssRUFBRVksSUFBSSxDQUFDWixLQUFLO29CQUNuQixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDVSxHQUFHLENBQUNJLE1BQU0sRUFBRUgsR0FBRyxDQUFDUSxJQUFJLENBQUNILGFBQWE7UUFDM0MsQ0FBQyxNQUFNLENBQUM7WUFDTixNQUFNLENBQUNOLEdBQUcsQ0FBQ0MsR0FBRyxDQUFDUSxJQUFJLENBQUMsQ0FBc0I7UUFDNUMsQ0FBQztJQUNILENBQUM7SUFFRHZCLHlDQUFRLENBQUMsQ0FBOEIsc0NBQVNPLEdBQUcsRUFBRU8sR0FBRyxFQUFFQyxHQUFHLEdBQUssQ0FBQztRQUNqRSxLQUFLLENBQUMsQ0FBQyxDQUFDUyxVQUFVLEVBQUMsQ0FBQyxHQUFHakIsR0FBRyxDQUFDa0IsTUFBTTtRQUVqQyxLQUFLLENBQUNDLE1BQU0sR0FBR3pCLDZEQUF3QixFQUFFNEIsQ0FBQyxHQUFLQSxDQUFDLENBQUNDLElBQUksS0FBS04sVUFBVTs7UUFFcEUsTUFBTSxDQUFDVixHQUFHLENBQUNDLEdBQUcsQ0FBQ1EsSUFBSSxDQUFDRyxNQUFNO0lBQzVCLENBQUM7SUFFRDFCLHlDQUFRLENBQUMsQ0FBc0IsOEJBQVMrQixJQUFJLEVBQUVqQixHQUFHLEVBQUVDLEdBQUcsR0FBSyxDQUFDO1FBQzFELEtBQUssQ0FBQ1ksT0FBTyxHQUFHMUIsd0RBQW1CO1FBRW5DLEVBQUUsR0FBR0ssWUFBWSxFQUFFLENBQUM7WUFDbEIsTUFBTSxDQUFDUSxHQUFHLENBQUNDLEdBQUcsQ0FBQ2lCLE1BQU0sQ0FBQyxHQUFHLEdBQUdqQixHQUFHLENBQUNRLElBQUksQ0FBQyxDQUFpQjtRQUN4RCxDQUFDO1FBRUQsTUFBTSxDQUFDVCxHQUFHLENBQUNDLEdBQUcsQ0FBQ1EsSUFBSSxDQUFDSSxPQUFPO0lBQzdCLENBQUM7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FtZWRpcy1jbGllbnQvLi9tc3dfbW9ja19hcGkvbW9ja3MvaGFuZGxlcnMudHM/MzQ3YyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dpblJlc3BvbnNlRHRvIH0gZnJvbSAnQC9mZWF0dXJlcy9hdXRoL0xvZ2luUmVzcG9uc2VEdG8nO1xuaW1wb3J0IHsgcmVzdCB9IGZyb20gJ21zdyc7XG5pbXBvcnQgc3ByaXRlc0pzb24gZnJvbSAnLi4vanNvbnMvc3ByaXRlcy5qc29uJztcblxuY29uc3QgdG9rZW4gPVxuICAnZXlKaGJHY2lPaUpJVXpJMU5pSjkuZXlKemRXSWlPaUl5SWl3aWMyTndJam9pZFhObGNpSXNJbUYxWkNJNmJuVnNiQ3dpYVdGMElqb3hOalF4Tmpjek9UWXlMQ0psZUhBaU9qRTJOREUzTmpBek5qSXNJbXAwYVNJNkltRTFZV014Wm1Oa0xXTm1NalF0TkdJNE9DMDRPV1k0TFRaak5UZzVORFZqWWpReFlTSjkuM3paRlFETWU0RWVVdmIteUJjVFJrTFhmTXpoRFZBS24wSEdzUm1KRjBXRSc7XG5cbmNvbnN0IHRlc3RVc2VyID0ge1xuICBlbWFpbDogJ3VzZXIxQHRlc3QuY29tJyxcbiAgcGFzc3dvcmQ6ICcxMjM0NTYnLFxufTtcblxuaW50ZXJmYWNlIFVzZXJSZXF1ZXN0IHtcbiAgdXNlcjoge1xuICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgcGFzc3dvcmQ6IHN0cmluZztcbiAgfTtcbn1cblxuY29uc3QgaXNBdXRob3JpemVkID0gKHJlcTogUmVxdWVzdCkgPT4ge1xuICBjb25zdCBhdXRoSGVhZGVyID0gcmVxLmhlYWRlcnMuZ2V0KCdBdXRob3JpemF0aW9uJyk7XG5cbiAgcmV0dXJuIGF1dGhIZWFkZXI/LmVuZHNXaXRoKHRva2VuKTtcbn07XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVycyA9IFtcbiAgcmVzdC5wb3N0PFVzZXJSZXF1ZXN0PignL2FwaS92MS9hdXRoL2xvZ2luJywgYXN5bmMgKHJlcSwgcmVzLCBjdHgpID0+IHtcbiAgICBjb25zdCB7IHVzZXIgfSA9IHJlcS5ib2R5O1xuXG4gICAgaWYgKHVzZXIuZW1haWwgPT09IHRlc3RVc2VyLmVtYWlsICYmIHVzZXIucGFzc3dvcmQgPT09IHRlc3RVc2VyLnBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBoZWFkZXIgPSBjdHguc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3Rva2VufWApO1xuICAgICAgY29uc3QgbG9naW5SZXNwb25zZTogTG9naW5SZXNwb25zZUR0byA9IHtcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIGVtYWlsOiB1c2VyLmVtYWlsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHJlcyhoZWFkZXIsIGN0eC5qc29uKGxvZ2luUmVzcG9uc2UpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlcyhjdHguanNvbignbm90IHN1Y2Nlc3NmdWwgbG9naW4nKSk7XG4gICAgfVxuICB9KSxcblxuICByZXN0LmdldCgnL2FwaS9zcHJpdGUvbmFtZS86c3ByaXRlTmFtZScsIGFzeW5jIChyZXEsIHJlcywgY3R4KSA9PiB7XG4gICAgY29uc3QgeyBzcHJpdGVOYW1lIH0gPSByZXEucGFyYW1zO1xuXG4gICAgY29uc3Qgc3ByaXRlID0gc3ByaXRlc0pzb24uc3ByaXRlcy5maW5kKChzKSA9PiBzLm5hbWUgPT09IHNwcml0ZU5hbWUpO1xuXG4gICAgcmV0dXJuIHJlcyhjdHguanNvbihzcHJpdGUpKTtcbiAgfSksXG5cbiAgcmVzdC5nZXQoJy9hcGkvdjEvc3ByaXRlX3NoZWV0JywgYXN5bmMgKF9yZXEsIHJlcywgY3R4KSA9PiB7XG4gICAgY29uc3Qgc3ByaXRlcyA9IHNwcml0ZXNKc29uLnNwcml0ZXM7XG5cbiAgICBpZiAoIWlzQXV0aG9yaXplZCkge1xuICAgICAgcmV0dXJuIHJlcyhjdHguc3RhdHVzKDQwMSksIGN0eC5qc29uKCdMb2dpbiByZXF1aXJlZC4nKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcyhjdHguanNvbihzcHJpdGVzKSk7XG4gIH0pLFxuXTtcbiJdLCJuYW1lcyI6WyJyZXN0Iiwic3ByaXRlc0pzb24iLCJ0b2tlbiIsInRlc3RVc2VyIiwiZW1haWwiLCJwYXNzd29yZCIsImlzQXV0aG9yaXplZCIsInJlcSIsImF1dGhIZWFkZXIiLCJoZWFkZXJzIiwiZ2V0IiwiZW5kc1dpdGgiLCJoYW5kbGVycyIsInBvc3QiLCJyZXMiLCJjdHgiLCJ1c2VyIiwiYm9keSIsImhlYWRlciIsInNldCIsImxvZ2luUmVzcG9uc2UiLCJkYXRhIiwiYXR0cmlidXRlcyIsImpzb24iLCJzcHJpdGVOYW1lIiwicGFyYW1zIiwic3ByaXRlIiwic3ByaXRlcyIsImZpbmQiLCJzIiwibmFtZSIsIl9yZXEiLCJzdGF0dXMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./msw_mock_api/mocks/handlers.ts\n");

/***/ }),

/***/ "./msw_mock_api/mocks/index.ts":
/*!*************************************!*\
  !*** ./msw_mock_api/mocks/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("if (true) {\n    // eslint-disable-next-line @typescript-eslint/no-var-requires\n    const { server  } = __webpack_require__(/*! ./server */ \"./msw_mock_api/mocks/server.ts\");\n    server.listen();\n} else {}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tc3dfbW9ja19hcGkvbW9ja3MvaW5kZXgudHMuanMiLCJtYXBwaW5ncyI6IkFBQUEsRUFBRSxFQUFFLElBQTZCLEVBQUUsQ0FBQztJQUNsQyxFQUE4RDtJQUM5RCxLQUFLLENBQUMsQ0FBQyxDQUFDQSxNQUFNLEVBQUMsQ0FBQyxHQUFHQyxtQkFBTyxDQUFDLGdEQUFVO0lBQ3JDRCxNQUFNLENBQUNFLE1BQU07QUFDZixDQUFDLE1BQU0sRUFJTiIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVkaXMtY2xpZW50Ly4vbXN3X21vY2tfYXBpL21vY2tzL2luZGV4LnRzP2FiYWEiXSwic291cmNlc0NvbnRlbnQiOlsiaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdmFyLXJlcXVpcmVzXG4gIGNvbnN0IHsgc2VydmVyIH0gPSByZXF1aXJlKCcuL3NlcnZlcicpO1xuICBzZXJ2ZXIubGlzdGVuKCk7XG59IGVsc2Uge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXZhci1yZXF1aXJlc1xuICBjb25zdCB7IHdvcmtlciB9ID0gcmVxdWlyZSgnLi9icm93c2VyJyk7XG4gIHdvcmtlci5zdGFydCh7IG9uVW5oYW5kbGVkUmVxdWVzdDogJ3dhcm4nIH0pO1xufVxuIl0sIm5hbWVzIjpbInNlcnZlciIsInJlcXVpcmUiLCJsaXN0ZW4iLCJ3b3JrZXIiLCJzdGFydCIsIm9uVW5oYW5kbGVkUmVxdWVzdCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./msw_mock_api/mocks/index.ts\n");

/***/ }),

/***/ "./msw_mock_api/mocks/server.ts":
/*!**************************************!*\
  !*** ./msw_mock_api/mocks/server.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"server\": () => (/* binding */ server)\n/* harmony export */ });\n/* harmony import */ var msw_node__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! msw/node */ \"msw/node\");\n/* harmony import */ var msw_node__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(msw_node__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./handlers */ \"./msw_mock_api/mocks/handlers.ts\");\n\n\nconst server = (0,msw_node__WEBPACK_IMPORTED_MODULE_0__.setupServer)(..._handlers__WEBPACK_IMPORTED_MODULE_1__.handlers);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tc3dfbW9ja19hcGkvbW9ja3Mvc2VydmVyLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBc0M7QUFDRDtBQUU5QixLQUFLLENBQUNFLE1BQU0sR0FBR0YscURBQVcsSUFBSUMsK0NBQVEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nYW1lZGlzLWNsaWVudC8uL21zd19tb2NrX2FwaS9tb2Nrcy9zZXJ2ZXIudHM/YTRkYSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXR1cFNlcnZlciB9IGZyb20gJ21zdy9ub2RlJztcbmltcG9ydCB7IGhhbmRsZXJzIH0gZnJvbSAnLi9oYW5kbGVycyc7XG5cbmV4cG9ydCBjb25zdCBzZXJ2ZXIgPSBzZXR1cFNlcnZlciguLi5oYW5kbGVycyk7XG4iXSwibmFtZXMiOlsic2V0dXBTZXJ2ZXIiLCJoYW5kbGVycyIsInNlcnZlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./msw_mock_api/mocks/server.ts\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ MyApp)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_reflex_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-reflex/styles.css */ \"./node_modules/react-reflex/styles.css\");\n/* harmony import */ var react_reflex_styles_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_reflex_styles_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/dist/antd.css */ \"./node_modules/antd/dist/antd.css\");\n/* harmony import */ var antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_dist_antd_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _src_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/app.scss */ \"./src/app.scss\");\n/* harmony import */ var _src_app_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_src_app_scss__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n// import '../src/components/canvas.scss';\nif (true) {\n    __webpack_require__(/*! ../msw_mock_api/mocks */ \"./msw_mock_api/mocks/index.ts\");\n}\nfunction MyApp({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"/Users/gergely.santa/Dev/gamedis/client/pages/_app.js\",\n        lineNumber: 10,\n        columnNumber: 10\n    }, this));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBZ0M7QUFDTDtBQUNIO0FBQ3hCLEVBQTBDO0FBQzFDLEVBQUUsRUFBRUEsSUFBOEMsRUFBRSxDQUFDO0lBQ25ERyxtQkFBTyxDQUFDLDREQUF1QjtBQUNqQyxDQUFDO0FBRWMsUUFBUSxDQUFDQyxLQUFLLENBQUMsQ0FBQyxDQUFDQyxTQUFTLEdBQUVDLFNBQVMsRUFBQyxDQUFDLEVBQUUsQ0FBQztJQUN2RCxNQUFNLDZFQUFFRCxTQUFTO1dBQUtDLFNBQVM7Ozs7OztBQUNqQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2FtZWRpcy1jbGllbnQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdyZWFjdC1yZWZsZXgvc3R5bGVzLmNzcyc7XG5pbXBvcnQgJ2FudGQvZGlzdC9hbnRkLmNzcyc7XG5pbXBvcnQgJy4uL3NyYy9hcHAuc2Nzcydcbi8vIGltcG9ydCAnLi4vc3JjL2NvbXBvbmVudHMvY2FudmFzLnNjc3MnO1xuaWYgKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9NT0NLSU5HID09PSAndHJ1ZScpIHtcbiAgcmVxdWlyZSgnLi4vbXN3X21vY2tfYXBpL21vY2tzJylcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9KSB7XG4gIHJldHVybiA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG59XG4iXSwibmFtZXMiOlsicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9NT0NLSU5HIiwicmVxdWlyZSIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./node_modules/antd/dist/antd.css":
/*!*****************************************!*\
  !*** ./node_modules/antd/dist/antd.css ***!
  \*****************************************/
/***/ (() => {



/***/ }),

/***/ "./node_modules/react-reflex/styles.css":
/*!**********************************************!*\
  !*** ./node_modules/react-reflex/styles.css ***!
  \**********************************************/
/***/ (() => {



/***/ }),

/***/ "./src/app.scss":
/*!**********************!*\
  !*** ./src/app.scss ***!
  \**********************/
/***/ (() => {



/***/ }),

/***/ "msw":
/*!**********************!*\
  !*** external "msw" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("msw");

/***/ }),

/***/ "msw/node":
/*!***************************!*\
  !*** external "msw/node" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("msw/node");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "./msw_mock_api/jsons/sprites.json":
/*!*****************************************!*\
  !*** ./msw_mock_api/jsons/sprites.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"sprites":[{"name":"player","tileWidth":64,"tileHeight":64,"columns":22,"tiles":45,"src":"sprites/player.png"}]}');

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();