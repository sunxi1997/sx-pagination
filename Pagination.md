
# Pagination 分页器

分页器将分页功能与 api 分离,使页面内不用声明额外的分页变量,该为直接读取实例的属性,也不再需要在分页查询的接口返回中处理重复的分页逻辑,现在只需要实例一个 Pagination,将分页查询的 api 传进去, 调用实例的 loadMore,实例将自动处理分页逻辑

## <h2 id='constructor'>构造器(constructor)</h2>

 构造器必须接收一个api参数,api为Promise形式的接口函数,且返回数据必须为服务器指定的分页格式
 
 若构造时传入额外配置参数,则传入一个配置对象,api函数放在 'api' 字段中,其他配置参数会与调用 loadMore 时的 data 参数合并在一起
 
 构造器本身有默认配置参数,会和额外参数(若有)合并为 config 存在示例中,
 
 
 _示例_
 
 ````

先设置通用回调处理
  Pagination.onResponse = function (result) {

    // 假设接口函数返回的的数据格式如下
    let {
      totalPage,
      page,
      data
    } = result;

    // 返回值必须包含以下字段,totalPage,list,page 来给pagination识别
    return {
      totalPage,
      list: data,
      page
    }
  }
 
 // api
  const api = function(){
     return new Promise(...)   // 必须是一个Promise函数
  }
 
 
 
 // 无额外配置
 
 let pagenation = new Pagination(api)
 
 pagenation.loadMore().then(()=>{
    // 异步加载后的列表
    console.log(pagenation.list)
})
 
 
 // 配置额外参数, 这些参数会在调用api时合并在一起
 const params = {
    limit: 10,
    order: 'DESC',
    ...
 }
 
 let pagenation2 = new Pagination(api,params);
 
 pagenation.loadMore().then(()=>{
    // 异步加载后的列表
    console.log(pagenation.list)
})
 ````
 
## 类静态属性

  key | 默认值 | 类型 | 说明   | 额外说明
  ---|---|---|---|---
settings  | Setting     | Number    | 当前页码

 #### <h4 id="settings">Setting 默认参数</h4> 
  默认值 
{
  defaultParams: {},               // 每次请求默认携带的参数
  loadingTip: '努力加载中...',     // 加载中提示时的提示
  errTip: '加载失败!请重试!',      // 加载失败提示时的提示
  hasMoreTip: '加载更多',          // 加载完成且还有下一页时的提示
  noMoreTip: '没有更多了!'        // 加载完成且没有下一页时的提示
}

## 类静态属性

### setSetting 设置

## 实例属性(props)

建议不要直接修改实例的属性,也不要使用 v-model 绑定,可以使用 watch, computed,或者单向绑定,直接修改可能会导致意外的结果

  key | 默认值 | 类型 | 说明   | 额外说明
  ---|---|---|---|---
   page         | 0     | Number    | 当前页码
   totalPage    | 1     | Number    | 总页数                       |   调用一次 loadMore 后会更新
   tip          | ''    | String    | 提示信息(给用户看)            |   分页器不同状态有不同的值,详见 <a href="#tip">tip</a>
   hasMore      | true  | Boolean   | 是否还有未加载的分页          |   调用一次 loadMore 后会更新
   list         | []    | Array     | 包含所有分页加载后得到的数组
   lastList     | []    | Array     | 最近一次loadMore获取到的数据
   error        | false | Boolean   | 加载出错                     |   实际请求时,若服务器响应错误,error 会变为 true
   loading      | false | Boolean   | 是否正在请求中               |    调用 loadMore 时为 true, 服务器响应后变为 false
   defaultParams| <a href="#defaultParams">defaultParams</a>    | Object    | 额外参数                     |  每次请求会作为参数传入api
   api          | 无     | Function | <a href="#constructor">构造时参数中的 api</a>
   

 #### <h4 id="defaultParams">defaultParams 默认参数</h4> 
  默认值 {};
  
  defaultParams有两个地方:
    一个是类的静态属性,Pagination.defaultParams
    一个是实例的属性,xx.defaultParams
在调用实例的loadMore时,两个defaultParams会被和并为1个对象,并加入 page:当前页面,然后作为参数传给api
  
#### <h4 id="tip">tip</h4> 

tip 的值只有5种, 初始的空值, 静止提示, 加载中提示,加载失败提示, 全部加载完成提示

 在<a href="#setting">setting</a>中可以设置各中状态的值
     
     
## 实例方法(methods)

#### loadMore

 loadMore 是唯一的核心方法,调用一次 loadMore,会发实际的api请求,api响应后,会读取分页数据,更新自身实例属性
 
##### 参数

 参数名称 | 类型 | 默认值 | 说明
 ---|---|---|---  
  params | Object | {} | 会与 <a href="#defaultParams">defaultParams</a> 属性合并传递给实际请求的 api
  reset | Boolean | false | 若为true, 会重置分页数据,从第一页开始获取,否则会自动请求下一页并拼接入 list 属性中
 
##### 返回值

实例对象
