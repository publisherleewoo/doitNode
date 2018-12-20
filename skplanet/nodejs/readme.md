+ 0.Deprecated  더이상 사용되지 않는
+ 1.Experimental 실험적인
+ 2.Stable 안정적인
+ 3.Locked 

<hr/>

## 프로세스 환경
os,process,cluster

## 파일과 경로, url
fs,path,URL,querystring,stream

## 네트워크 모듈
http,htpps,net,dgram,dns
<hr/>

# 노드에서 전역객체 global
global.console.log()
<hr/>

# 주요 전역객체

+ process
+ console
+ Buffer(클래스)
+ require
+ __filename,dirname
+ module
+ exports
+ Timeout 함수

## process

+ 애플리케이션 프로세스 실행 정보
  
|               |             |
| ------------- | ----------- |
| env           | 애플리케이션 실행환경 |
| version       | Node.js버전   |
| arch,platform | cpu와 플랫폼 정보 |
| argv          | 실행 명령 파라미터  |


+ 이벤트

|                   |                   |
| ----------------- | ----------------- |
| exit              | 애플리케이션 종료 이벤트     |
| beforeExit        | 종료 되기 전에 발생하는 이벤트 |
| uncaughtException | 예외처리되지않는 예외 이벤트   |

+ 함수 

|          |                           |
| -------- | ------------------------- |
| exit     | 애플리케이션 종료                 |
| nextTick | 이벤트 루프 내 동작을 모두 실행후 콜백 실행 |
 

~~~javscript
실행시켜보기.
process.env 
process.arch
process.platform
~~~

~~~javascript
process.argv // 실행 파라미터 얻기

node app.js 3 5    //뒤에 숫자 두개를 넣어주면

var i = process.argv[2]
var j = process.argv[3]

var sum = parseInt(i)+ parseInt(j)
console.log(sum); // 8
~~~


# console로 메세지 기록하기

~~~javascript
//스트림이란, 데이터를 보낼때 실시간 비동기로 보낼수있게끔 쪼개놓은 단위인듯, 데이터의 전송 흐름

var fs = require('fs');
var output = fs.createWriteStream('stdout.log')
var errorOutput = fs.createWriteStream('error.log')

/* console.info */
/* console.log */
/* console.warn */
/* console.error */
var Console = require('console').Console;
var logger = new Console(output, errorOutput);

logger.info('info message');
logger.log('log message');

logger.warn('warning');
logger.error('error');
~~~


# 유틸리티

~~~javascript
var util = require('util');
~~~

+ 문자열 포맷
+ 상속

~~~javascript
util.format(format,[])

// format부분에
// %s : String
// %d : Number
// %j : JSON


var str1 = util.format('%d + %d = %d',1,1,(1+2))
// 1+2+3

var str2 = util.format('%s %s','Hello','world')
// hello world
~~~


# 이벤트

## 이벤트 리스너 함수 등록

+ emitter.on(event,listener)
+ emitter.once(event,listener)
~~~javascript
//이벤트 등록의 console.log()
process.on('exit',function(){
    console.log('ocuur exit event')
})

//한번만 동작
process.once('exit',function(){
    console.log('ocuur exit event')
})
~~~

## 이벤트 리스너 이벤트 발생

+ emitter.emit(event,[arg1],[arg2])
+ event:이벤트 이름
+ arg 리스너 함수의 파라미터
+ emit 함수 호출한 결과 : true(이벤트처리), false(이벤트 처리 안됨)

~~~javascript
process.emit('exit');
process.emit('exit',0);//리스너 함수의 파라미터로 0 전달
~~~

## 커스텀 이벤트
~~~javascript
var customEvent = new event.EventEmitter();

custormEvent.on('tick',function(){
    console.log('occur custom event');
})

custormEvent.emit('tick');
~~~


## 이벤트 emiiter를 상속해서 사용
~~~javascript
var person = function(){}
var util = require('util');
var EventEmitter = require('events').EventEmitter;
util.inherits(Person,EventEmitter);

var p = new Person();
p.on('howAreYou',function(){
    console.log('Fine Thanks')
})

p.emit('howAreYou')
~~~
