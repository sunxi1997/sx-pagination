
# Pagination 分页器

分页器将分页功能与 api 分离,使页面内不用声明额外的分页变量,该为直接读取实例的属性,也不再需要在分页查询的接口返回中处理重复的分页逻辑,现在只需要实例一个 Pagination,将分页查询的 api 传进去, 调用实例的 loadMore,实例将自动处理分页逻辑

## <h2 id='constructor'>构造器(constructor)</h2>

 构造器必须接收一个api参数,api为Promise形式的接口函数,且返回数据必须为服务器指定的分页格式
 
 若构造时传入额外配置参数,则传入一个配置对象,api函数放在 'api' 字段中,其他配置参数会与调用 loadMore 时的 data 参数合并在一起
 
 构造器本身有默认配置参数,会和额外参数(若有)合并为 config 存在示例中,
 
 
 _示例_
 
 ````
 
 // api
  const api = function(){
     return request({...})   // 必须是一个接口函数
  }
 
 
 
 // 无额外配置
 
 let pagenation = new Pagination(api)
 
 pagenation.loadMore()
 console.log(pagenation.list)
 
 
 
 // 配置额外参数
 const params = {
    limit: 10,
    order: 'DESC',
    api: api,
    ... 
 }
 
 let pagenation2 = new Pagination(params);
 
 pagenation.loadMore()
 console.log(pagenation.list)
 
 ````
 
## 实例属性(props)

建议不要直接修改示例的属性,也不要使用 v-model 绑定,可以使用 watch, computed,或者单向绑定,直接修改可能会导致意外的结果

  key | 默认值 | 类型 | 说明   | 额外说明
  ---|---|---|---|---
   config | <a href="#defaultConfig">defaultConfig</a> | Object | 配置参数 | 每次请求实际 api 时都会作为 data 传入
   page         | 0     | Number    | 当前页码
   list         | []    | Array     | 包含所有分页加载后得到的数组
   lastList     | []    | Array     | 最近一次loadMore获取到的数据
   api          | 无     | Function | <a href="#constructor">构造时参数中的 api</a>
   total_page   | 1     | Number    | 总页数                       |   调用一次 loadMore 后会更新
   hasMore      | true  | Boolean   | 是否还有未加载的分页          |   调用一次 loadMore 后会更新
   error        | false | Boolean   | 加载出错                     |   实际请求时,若服务器响应错误,error 会变为 true
   loading      | false | Boolean   | 是否正在请求中               |    调用 loadMore 时为 true, 服务器响应后变为 false
   loadingTip   | ''    | String    | 提示信息(给用户看)            |   分页器不同状态有不同的值,详见 <a href="#loadingTip">loadingTip</a>
  

 #### <h4 id="defaultConfig">defaultConfig 默认配置</h4> 
  key | value | 类型 | 说明
  ---|---|---|---
   limit | 15 | Number | 单页数量
   order | ASC| String | 排序方式
  
#### <h4 id="loadingTip">loadingTip</h4> 

 值  | 说明
 ---|---
  '' |  空字符串,初始值
  努力加载中...  |  加载时的值
  上拉加载更多  |  未在加载状态且还有剩余分页时
  没有更多了!  |  未在加载状态且没有剩余分页时
     
     
## 实例方法(methods)

#### loadMore

 loadMore 是唯一的核心方法,调用一次 loadMore,会发实际的api请求,api响应后,会读取分页数据,更新自身实例属性
 
##### 参数

 参数名称 | 类型 | 默认值 | 说明
 ---|---|---|---  
  data | Object | {} | 会与 config 属性合并传递给实际请求的 api
  reset | Boolean | false | 若未true, 会重置分页数据,从第一页开始获取,否则会自动请求下一页并拼接入 list 属性中
 
##### 返回值

实例对象
 