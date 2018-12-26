# 폼 데이터 전송

+ form-unlencoded 방식
  + 이름=값 방식으로 작성, 쿼리 문자열
+ 메세지 예
  + form 태그 내 name과 value
  ```
    POST HTTP/1.1
    Host:127.0.0.1:3000
    Cache-Control:no-cache
    Content-Type:application/x-www-form-urlencoded

    key1=value&key2=value2
  ``` 


+ 멀티 파트 방식:파일,글자 등 여러 데이터 전송
  + 멀티 파티 방식의 폼
```html
<form method="post" action="upload" enctype="multipart/form-data">
</form>
```

+ 요청 메세지 헤더
```   
Content-Type:multipart/mixed;boundary=frontier
```


## post 요청 처리
+ 요청메시지:request  (스트리밍 메세지)
+ Readable stream
  + 이벤트:data,end

```javascript
var body = '';
request.on('data',function(chunk){
    console.log('gt %d bytes of data',chunk.length)
    body += chunk //버퍼링
})

request.on('end',function(){
    console.log('there will be no more data')
    console.log('end : ' + body)
})

```

+ 전송이 끝나면 :end 이벤트
+ end 이벤트 핸들러 함수 : querystring 모듈로 분석

  ```javascript
    request.on('end',function(){
        var pared = querystring.parse(body);
        console.log('name1 : ' + parsed.name1)
        console.log('name2 : ' + parsed.name2)
    })
  ```

 ## prg 패턴
+ 중복 post요청 방지
  + post 요청 처리 후 redirect 응답
  + prg(post-redirect-get) 패턴
  + 리프레쉬 - get 요청 중복(ok) 
+ 응답 메세지 작성 코드
  ```javascript
  redirection:클라이언트 주소 옮기기
  상태코드:302
  헤더필드:Locaton
  res.writeHead(302,{'Location':'http://google.com'})
  ```


+ prg 패턴 적용 코드

```javascript
req.on('end',function(){
    res.statusCode=302;
    res.setHeader('Location',URL);
    res.end()
})

```


## 멀티파트 요청
+ SNS 서비스 중 접하는 post 요청
  + 사진 올리기
  + 글과 사진 올리기
+ 메시지 바디 기록 방식
  + multipart/form-data

+ content-type 헤더 항목의 boundary로 정의
  + Content-Type:multipart/form-data; boundary=XXXYYZZZ

+ 메시지 바디 내 파트 구성
  + 파트 구분자(--XXXYYYZZZ)
  + 파트 인코딩
  + 파트 내 정보

```
content-Type:multipart/form-data;boundary=XXXYYYZZZ

--XXXYYYZZZ
Content-Disposition:'form-data', name = 'key1'

value1
--XXXYYYZZZ
Content-Type:application/octet-stream 
Content-Transfer-Encoding:base64

FGeowjfopwejfpjwFAWEKFOJWJFqfFewfowkFAFeOfeAWKfawofEWaFKWO==
--XXXYYYZZZ

```