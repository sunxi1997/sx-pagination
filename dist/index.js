'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = exports.Pagination = function () {

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


  /**
   * @property defaultParams
   * @type Object
   * @desc 每次请求分页接口时默认携带的参数
   */


  /**
   * @property error
   * @type Boolean
   * @desc 分页接口请求错误
   */


  /**
   * @property list
   * @type Array
   * @desc 数据列表
   */


  /**
   * @property tip
   * @type String
   * @desc 提示信息
   */


  /**
   * @property page
   * @type Number
   * @desc 当前页码
   */
  function Pagination(api, defaultParams, options) {
    _classCallCheck(this, Pagination);

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
   * @property loading
   * @type Boolean
   * @desc 接口请求中
   */


  /**
   * @property lastList
   * @type Array
   * @desc 最后一次请求获取到的数据列表
   */


  /**
   * @property hasMore
   * @type Boolean
   * @desc 是否还有下一页
   */


  /**
   * @property total_page
   * @type Number
   * @desc 总页数
   */


  _createClass(Pagination, [{
    key: 'loadMore',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var reset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var _Pagination$settings, defaultParams1, loadingTip, errTip, hasMoreTip, noMoreTip, page, loading, hasMore, api, defaultParams2, err, response, res, totalPage, list, _res$page, currentPage;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                (typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object' && (params = {});

                _Pagination$settings = Pagination.settings, defaultParams1 = _Pagination$settings.defaultParams, loadingTip = _Pagination$settings.loadingTip, errTip = _Pagination$settings.errTip, hasMoreTip = _Pagination$settings.hasMoreTip, noMoreTip = _Pagination$settings.noMoreTip;
                page = this.page, loading = this.loading, hasMore = this.hasMore, api = this.api, defaultParams2 = this.defaultParams;

                if (!(!hasMore && !reset || loading)) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt('return', this);

              case 5:

                page = reset ? 1 : page + 1;

                params = _extends({
                  page: page
                }, params, defaultParams1, defaultParams2);

                this.loading = true;
                this.tip = loadingTip;

                err = null;
                _context.prev = 10;
                _context.next = 13;
                return api(params);

              case 13:
                response = _context.sent;
                _context.next = 16;
                return Pagination.onResponse.call(this, response);

              case 16:
                res = _context.sent;

                if (!((typeof res === 'undefined' ? 'undefined' : _typeof(res)) !== 'object')) {
                  _context.next = 20;
                  break;
                }

                console.log(res);
                throw new Error(res + '不是合法 onResponse 的返回值');

              case 20:
                totalPage = res.totalPage, list = res.list, _res$page = res.page, currentPage = _res$page === undefined ? page : _res$page;


                totalPage = +totalPage;
                currentPage = +currentPage;

                if (!(isNaN(totalPage) || isNaN(currentPage) || !Array.isArray(list))) {
                  _context.next = 25;
                  break;
                }

                throw new Error(res + '不是合法 onResponse 的返回值');

              case 25:

                hasMore = totalPage > currentPage;

                this.hasMore = hasMore;
                this.error = false;
                this.page = currentPage;
                this.totalPage = totalPage;
                this.lastList = list;
                this.list = reset ? list : this.list.concat(list);
                this.tip = hasMore ? hasMoreTip : noMoreTip;
                _context.next = 40;
                break;

              case 35:
                _context.prev = 35;
                _context.t0 = _context['catch'](10);

                err = _context.t0;
                this.error = true;
                this.tip = errTip;

              case 40:
                _context.prev = 40;

                this.loading = false;
                return _context.finish(40);

              case 43:
                err && console.error(err);
                return _context.abrupt('return', this);

              case 45:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 35, 40, 43]]);
      }));

      function loadMore() {
        return _ref.apply(this, arguments);
      }

      return loadMore;
    }()

    /**
     * @method reset
     * @desc 重置分页器为初始状态
     */

  }, {
    key: 'reset',
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

    /** @静态方法 **/

    /**
     * @function
     * @param {*} result -  调用api成功时返回的数据
     *
     * @return Promise  -   resolve 必须为指定类型的对象
     */

  }]);

  return Pagination;
}();
/*

module.exports = {
  Pagination
}
module.exports.default = Pagination
*/

Pagination.settings = {
  defaultParams: {}, // 每次请求默认携带的参数
  loadingTip: '努力加载中...', // 加载中提示时的提示
  errTip: '加载失败!请重试!', // 加载失败提示时的提示
  hasMoreTip: '加载更多', // 加载完成且还有下一页时的提示
  noMoreTip: '没有更多了!' // 加载完成且没有下一页时的提示
};

Pagination.setSetting = function (newSetting) {
  Object.assign(Pagination.settings, newSetting);
};

Pagination.onResponse = function (result) {
  return new Promise(function (resolve, reject) {
    console.log(result);
    reject('请先设置api回调处理');
  });
};

exports.default = Pagination;