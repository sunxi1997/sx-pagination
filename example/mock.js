
var express = require("express");
var app = express();
var hostName = '127.0.0.1';
var port = 8889;

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.get("*",function(req,res){

  let {
    page,
    perPage = 20
  } = req.query;

  page = +page;
  perPage = +perPage;

  if(!page)
    return res.send({msg:'非法page',code:0});

  let result = getList(page,perPage);

  result ? res.send({data:result,code:1}) : res.send({msg:'没有结果',code:0})

});

app.listen(port,hostName,function(){

  console.log(`服务器运行在http://${hostName}:${port}`);

});




let data = [...new Array(80)].map((_,i)=>({id:i,name:'Name'}));

function getList(page = 1, perPage = 20) {

  let start = (page-1) * perPage;
  let end = start + perPage;
  let list = data.slice(start,end);
  let hasMore = data.length > end;

  return {
    data: list,
    page,
    perPage,
    totalPage: Math.ceil(data.length / perPage),
    hasMore
  };
}
