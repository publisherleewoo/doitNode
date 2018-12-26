# URL
+ url 모듈
~~~javascript
var url = require('url');
~~~

+ URL 모듈
~~~javascript
url.parse(urlStr,[parseQueryString],[SlashesDenoteHost])
~~~
   + urlStr : URL 문자열
   + parseQueryString : 쿼리 문자열 파싱, 기본값 false
   + slahesDenoteHost : //로 시작하는 주소의 경우, 호스트 인식 여부, 기본값 false  

+ URL 만들기
  + url.format(urlObj)

~~~javascript
    var urlObj ={
        protocol:'http',
        host:'idols.com',
        pathname:'schedule/radio',
        search:'time=9am&day=monday'
    }

    var urlStr = url.format(urlObj)

    //http://idols.com/schedule/radio?time=9am&day=monday
~~~

