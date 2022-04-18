"use strict";
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
exports.id = "pages/profile";
exports.ids = ["pages/profile"];
exports.modules = {

/***/ "./pages/profile.tsx":
/*!***************************!*\
  !*** ./pages/profile.tsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst Page = ({ user  })=>{\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n        children: user.email\n    }, void 0, false));\n};\nasync function getServerSideProps() {\n    const res = await axios__WEBPACK_IMPORTED_MODULE_1___default().get('http://localhost:3000/api/v1/users/3');\n    const user = {\n        email: res.data.data.attributes.email\n    };\n    return {\n        props: {\n            user\n        }\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Page);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9maWxlLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRXlCO0FBTXpCLEtBQUssQ0FBQ0MsSUFBSSxJQUFJLENBQUMsQ0FBQ0MsSUFBSSxFQUFRLENBQUMsR0FBa0IsQ0FBQztJQUM5QyxNQUFNO2tCQUFJQSxJQUFJLENBQUNDLEtBQUs7O0FBQ3RCLENBQUM7QUFFTSxlQUFlQyxrQkFBa0IsR0FBRyxDQUFDO0lBQzFDLEtBQUssQ0FBQ0MsR0FBRyxHQUFHLEtBQUssQ0FBQ0wsZ0RBQVMsQ0FBeUIsQ0FBc0M7SUFDMUYsS0FBSyxDQUFDRSxJQUFJLEdBQVMsQ0FBQztRQUNsQkMsS0FBSyxFQUFFRSxHQUFHLENBQUNFLElBQUksQ0FBQ0EsSUFBSSxDQUFDQyxVQUFVLENBQUNMLEtBQUs7SUFDdkMsQ0FBQztJQUVELE1BQU0sQ0FBQyxDQUFDO1FBQUNNLEtBQUssRUFBRSxDQUFDO1lBQUNQLElBQUk7UUFBQyxDQUFDO0lBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsaUVBQWVELElBQUksRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWVkaXMtY2xpZW50Ly4vcGFnZXMvcHJvZmlsZS50c3g/ZGNlNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVXNlciBmcm9tICdAL3BhZ2VzL3Byb2ZpbGUvdHlwZXMvVXNlcic7XG5pbXBvcnQgVXNlclJlc3BvbnNlIGZyb20gJ0AvcGFnZXMvcHJvZmlsZS90eXBlcy9Vc2VyUmVzcG9uc2UnO1xuaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJztcblxudHlwZSBQcm9wcyA9IHtcbiAgdXNlcjogVXNlcjtcbn07XG5cbmNvbnN0IFBhZ2UgPSAoeyB1c2VyIH06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPD57dXNlci5lbWFpbH08Lz47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyU2lkZVByb3BzKCkge1xuICBjb25zdCByZXMgPSBhd2FpdCBheGlvcy5nZXQ8eyBkYXRhOiBVc2VyUmVzcG9uc2UgfT4oJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9hcGkvdjEvdXNlcnMvMycpO1xuICBjb25zdCB1c2VyOiBVc2VyID0ge1xuICAgIGVtYWlsOiByZXMuZGF0YS5kYXRhLmF0dHJpYnV0ZXMuZW1haWwsXG4gIH07XG5cbiAgcmV0dXJuIHsgcHJvcHM6IHsgdXNlciB9IH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBhZ2U7XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJQYWdlIiwidXNlciIsImVtYWlsIiwiZ2V0U2VydmVyU2lkZVByb3BzIiwicmVzIiwiZ2V0IiwiZGF0YSIsImF0dHJpYnV0ZXMiLCJwcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/profile.tsx\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/profile.tsx"));
module.exports = __webpack_exports__;

})();