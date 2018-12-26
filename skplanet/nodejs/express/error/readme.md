- 미들웨어 : 구조 내에서 중간 처리를 위한 함수(함수들의 꾸러미가 모듈)
  

-  ?:존재하거나 생략
-  +:한번이상 반복
-  *:임의의 문자


~~~javascript
//  /abcd,/acd
app.get('/ab?cd',function(res,req){})


// /abcd,/abbcd,/abbbcd
app.get('/ab+cd',function(res,req){})

// /abcd,abxcd,abRABDOMcd,ab123cd
app.get('/ab*cd',function(res,req){})

// /abe,/abcde
app.get('/ab(cd)?e',function(res,req){})

~~~

- route 함수
```javascript
app.route('/book')
    .get(function(req,res){})
    .post(function(req,res){})
    .put(function(req,res){})
```