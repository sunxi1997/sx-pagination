"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Pagination = /*#__PURE__*/function () {
  /**
   * @property page
   * @type Number
   * @desc 当前页码
   */

  /**
   * @property total_page
   * @type Number
   * @desc 总页数
   */

  /**
   * @property tip
   * @type String
   * @desc 提示信息
   */

  /**
   * @property hasMore
   * @type Boolean
   * @desc 是否还有下一页
   */

  /**
   * @property list
   * @type Array
   * @desc 数据列表
   */

  /**
   * @property lastList
   * @type Array
   * @desc 最后一次请求获取到的数据列表
   */

  /**
   * @property error
   * @type Boolean
   * @desc 分页接口请求错误
   */

  /**
   * @property loading
   * @type Boolean
   * @desc 接口请求中
   */

  /**
   * @property defaultParams
   * @type Object
   * @desc 每次请求分页接口时默认携带的参数
   */

  /**
   * @property api
   * @type Function | Null
   * @desc 分页请求的回调函数, 参数为默认参数和page组成的对象
   *  例 pagination 的 defaultParams 为 {order:'DESC'}
   *     实例 的 defaultParams 为 {perPage: 20}
   *     loadMore调用时的参数 为 {id: 3}
   *     实例当前 page 为 1
   *     则最终调用api时的参数为 {order:'DESC',perPage: 20,id: 3, page: 2}
   */

  /**
   * @constructor
   *
   * @param {Function} api
   *
   * @param {Object} [defaultParams]
   *
   * @param {Object} [options]  -   覆盖默认属性的options,非必填
   *
   */
  function Pagination(api, defaultParams, options) {
    (0, _classCallCheck2["default"])(this, Pagination);
    this.page = 0;
    this.totalPage = 1;
    this.tip = '';
    this.hasMore = true;
    this.list = [];
    this.lastList = [];
    this.error = false;
    this.loading = false;
    this.defaultParams = {};
    this.api = null;
    this.format = null;
    this.api = api;
    if (defaultParams) this.defaultParams = defaultParams;
    options && options instanceof Object && Object.assign(this, options);
  }
  /**
   * @method loadMore
   *
   * @param {Object}   params     -  异步请求时发送的data
   * @param {Boolean}  reset      -  是否重置列表
   */


  (0, _createClass2["default"])(Pagination, [{
    key: "loadMore",
    value: function () {
      var _loadMore = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var params,
            reset,
            _Pagination$settings,
            defaultParams1,
            loadingTip,
            errTip,
            hasMoreTip,
            noMoreTip,
            page,
            loading,
            hasMore,
            api,
            defaultParams2,
            err,
            response,
            res,
            _res,
            totalPage,
            list,
            _res$page,
            currentPage,
            _args = arguments;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                params = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                reset = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
                (0, _typeof2["default"])(params) !== 'object' && (params = {});
                _Pagination$settings = Pagination.settings, defaultParams1 = _Pagination$settings.defaultParams, loadingTip = _Pagination$settings.loadingTip, errTip = _Pagination$settings.errTip, hasMoreTip = _Pagination$settings.hasMoreTip, noMoreTip = _Pagination$settings.noMoreTip;
                page = this.page, loading = this.loading, hasMore = this.hasMore, api = this.api, defaultParams2 = this.defaultParams;

                if (!(!hasMore && !reset || loading)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", this);

              case 7:
                page = reset ? 1 : page + 1;
                params = _objectSpread({
                  page: page
                }, defaultParams1, {}, defaultParams2, {}, params);
                this.loading = true;
                this.tip = loadingTip;
                err = null;
                _context.prev = 12;
                _context.next = 15;
                return api(params);

              case 15:
                response = _context.sent;
                _context.next = 18;
                return Pagination.format(response, this, params);

              case 18:
                res = _context.sent;

                if (!(this.format && typeof this.format === 'function')) {
                  _context.next = 24;
                  break;
                }

                res = this.format(res);

                if (!(res instanceof Promise)) {
                  _context.next = 24;
                  break;
                }

                _context.next = 24;
                return res;

              case 24:
                if (!((0, _typeof2["default"])(res) !== 'object')) {
                  _context.next = 27;
                  break;
                }

                console.log(res);
                throw new Error(res + '不是合法 format 的返回值');

              case 27:
                _res = res, totalPage = _res.totalPage, list = _res.list, _res$page = _res.page, currentPage = _res$page === void 0 ? page : _res$page;
                totalPage = +totalPage;
                currentPage = +currentPage;

                if (!(isNaN(totalPage) || isNaN(currentPage) || !Array.isArray(list))) {
                  _context.next = 32;
                  break;
                }

                throw new Error(res + '不是合法 format 的返回值');

              case 32:
                hasMore = totalPage > currentPage;
                this.hasMore = hasMore;
                this.error = false;
                this.page = currentPage;
                this.totalPage = totalPage;
                this.lastList = list;
                this.list = reset ? list : this.list.concat(list);
                this.tip = hasMore ? hasMoreTip : noMoreTip;
                _context.next = 47;
                break;

              case 42:
                _context.prev = 42;
                _context.t0 = _context["catch"](12);
                err = _context.t0;
                this.error = true;
                this.tip = errTip;

              case 47:
                _context.prev = 47;
                this.loading = false;
                return _context.finish(47);

              case 50:
                err && console.error({
                  msg: 'pagination接口返回错误',
                  err: err
                });
                return _context.abrupt("return", this);

              case 52:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[12, 42, 47, 50]]);
      }));

      function loadMore() {
        return _loadMore.apply(this, arguments);
      }

      return loadMore;
    }()
    /**
     * @method reset
     * @desc 重置分页器为初始状态
     */

  }, {
    key: "reset",
    value: function reset() {
      this.page = 0;
      this.totalPage = 1;
      this.tip = '';
      this.hasMore = true;
      this.list = [];
      this.lastList = [];
      this.error = false;
      this.loading = false;
    }
    /** @静态属性 **/

  }]);
  return Pagination;
}();

exports["default"] = Pagination;
Pagination.settings = {
  defaultParams: {},
  // 每次请求默认携带的参数
  loadingTip: '努力加载中...',
  // 加载中提示时的提示
  errTip: '加载失败!请重试!',
  // 加载失败提示时的提示
  hasMoreTip: '加载更多',
  // 加载完成且还有下一页时的提示
  noMoreTip: '没有更多了!' // 加载完成且没有下一页时的提示

};

Pagination.setSetting = function (newSetting) {
  Object.assign(Pagination.settings, newSetting);
};

Pagination.format = function (result, pg, params) {
  return new Promise(function (resolve, reject) {
    console.log(result);
    reject('请先设置api回调处理');
  });
};