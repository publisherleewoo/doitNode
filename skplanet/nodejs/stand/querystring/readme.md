# queryString
+ url과 쿼리 문자열
  + querystring 모듈
~~~javascript
var querystring = require('querystring')
~~~
  + 쿼리 문자열 분석하기

~~~javascript
querystring.parse(str,[sep],[eq],[option])
// sep,eq : 쿼리 구분자와 = 기호
~~~ 
 + 쿼리 문자열 만들기
~~~javascript
var queryObj = {
    name:'IU',
    best:'좋은날
}
var queryStr = querystring.stringify(queryObj);
// name=IU&best=%EC%A2%8B$EC%9D%80%~~~
~~~
