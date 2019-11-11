/**
 * 分页器封装
 *
 * 用法参阅 pageNation.md
 */


// 默认分页配置
const defaultConfig = {
   limit: 15,     // 单页数量
   order: 'ASC',  // 排序方式, ASC(正序) DESC(倒序)
};

/**
 * @class Pagination  -  封装分页接口
 *
 * @param {Object | Function} api   -  配置参数,
 *                                     若未Function,作为封装的api
 *                                     若为Object,必须有api属性,
 *                                     其他的属性会作为默认设置,在请求时发送
 */

export default class Pagination {
   constructor(api) {

      let config = {...defaultConfig};

      switch (typeof api) {
         case 'function':
            break;
         case 'object':
            let _config = api;
            api = _config.api;
            delete _config.api;
            Object.assign(config, _config);
            break;
         default:
            throw new TypeError(`${api} is must be a Object or Function`)
      }

      if (typeof api !== 'function') {
         throw new TypeError(`${api} is not a function`)
      }

      this.config = config;

      this.page = 0;
      this.list = [];
      this.lastList = [];
      this.api = api;
      this.total_page = 1;
      this.hasMore = true;
      this.error = false;
      this.loading = false;
      this.loadingTip = '';
   }

   /**
    * @method loadMore
    *
    * @param {Object}   data     -  异步请求时发送的data
    * @param {Boolean}  reset    -  重置分页器
    */
   async loadMore(data = {}, reset = false) {
      typeof data !== 'object' && (data = {});
      let {
         page,
         loading,
         hasMore,
         api,
         config
      } = this;

      if (reset) {
         page = 0;
      } else {
         if (!hasMore)
            return this;
         else if (loading)
            return this;
      }

      page++;

      data = {
         page,
         ...config,
         ...data
      };

      this.loading = true;
      this.loadingTip = '努力加载中...';

      let result = await api(data).catch(() => false);

      if (result === false) {
         this.error = true;
         this.loading = false;
         this.loadingTip = '加载失败!请重试!';
         return this;
      }

      let {
         data: list,
         meta: {
            pagination: {
               total,
               count,
               per_page,
               total_pages,
               current_page
            }
         }
      } = result;

      hasMore = total_pages > current_page;

      this.page = current_page;
      this.total_page = total_pages;
      this.hasMore = hasMore;
      this.error = false;
      this.list = reset ? list : this.list.concat(list);
      this.lastList = list;
      this.loading = false;
      this.loadingTip = hasMore ? '上拉加载更多' : '没有更多了!';

      return this;
   }

}
