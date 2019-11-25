"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Pagination =
  /*#__PURE__*/
  function () {
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
      _classCallCheck(this, Pagination);

      _defineProperty(this, "page", 0);

      _defineProperty(this, "totalPage", 1);

      _defineProperty(this, "tip", '');

      _defineProperty(this, "hasMore", true);

      _defineProperty(this, "list", []);

      _defineProperty(this, "lastList", []);

      _defineProperty(this, "error", false);

      _defineProperty(this, "loading", false);

      _defineProperty(this, "defaultParams", {});

      _defineProperty(this, "api", null);

      this.api = api;
      if (defaultParams) this.defaultParams = defaultParams;
      options && _instanceof(options, Object) && Object.assign(this, options);
    }
    /**
     * @method loadMore
     *
     * @param {Object}   params     -  异步请求时发送的data
     */


    _createClass(Pagination, [{
      key: "loadMore",
      value: async function loadMore() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        _typeof(params) !== 'object' && (params = {});
        var _Pagination$settings = Pagination.settings,
          defaultParams1 = _Pagination$settings.defaultParams,
          loadingTip = _Pagination$settings.loadingTip,
          errTip = _Pagination$settings.errTip,
          hasMoreTip = _Pagination$settings.hasMoreTip,
          noMoreTip = _Pagination$settings.noMoreTip;
        var page = this.page,
          loading = this.loading,
          hasMore = this.hasMore,
          api = this.api,
          defaultParams2 = this.defaultParams;
        if (!hasMore) return this;else if (loading) return this;
        page++;
        params = {
          page: page,
          ...params,
          ...defaultParams1,
          ...defaultParams2
        };
        this.loading = true;
        this.tip = loadingTip;
        var err = null;

        try {
          var response = await api(params); // 加载成功

          var res = await Pagination.onResponse((await response));

          if (!res || !_instanceof(res, Object)) {
            console.log(res);
            throw new Error(res + '不是合法 onResponse 的返回值');
          }

          var totalPage = res.totalPage,
            list = res.list,
            _res$page = res.page,
            currentPage = _res$page === void 0 ? page : _res$page;
          totalPage = +totalPage;
          currentPage = +currentPage;

          if (isNaN(totalPage) || isNaN(currentPage) || !Array.isArray(list)) {
            throw new Error(res + '不是合法 onResponse 的返回值');
          }

          hasMore = totalPage > currentPage;
          this.hasMore = hasMore;
          this.error = false;
          this.page = currentPage;
          this.totalPage = totalPage;
          this.lastList = list;
          this.list = this.list.concat(list);
          this.tip = hasMore ? hasMoreTip : noMoreTip;
        } // 加载失败
        catch (e) {
          err = e;
          this.error = true;
          this.tip = errTip;
        } // 加载完成
        finally {
          this.loading = false;
        }

        err && console.error(err);
        return this;
      }
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
        this.defaultParams = {};
      }
      /** @静态属性 **/

    }]);

    return Pagination;
  }();

_defineProperty(Pagination, "settings", {
  defaultParams: {},
  // 每次请求默认携带的参数
  loadingTip: '努力加载中...',
  // 加载中提示时的提示
  errTip: '加载失败!请重试!',
  // 加载失败提示时的提示
  hasMoreTip: '加载更多',
  // 加载完成且还有下一页时的提示
  noMoreTip: '没有更多了!' // 加载完成且没有下一页时的提示

});

_defineProperty(Pagination, "setSetting", function (newSetting) {
  Object.assign(Pagination.settings, newSetting);
});

_defineProperty(Pagination, "onResponse", function (result) {
  return new Promise(function (resolve, reject) {
    console.log(result);
    reject('请先设置api回调处理');
  });
});
