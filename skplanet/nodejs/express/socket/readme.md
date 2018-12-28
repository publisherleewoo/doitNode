# 실시간 공연 예약 서비스
+ 사용자가 선택한 공연 정보 전달
+ 예약 가능한 공연 날짜와 좌석 정보
+ 실시간으로 예약 가능한 시간 좌석 정보 반영
+ 다른 사용자가 예약 ->예약좌석상황 반영
+ 실시간으로 가능한 자리 선택 후 예약

## TCP 통신 (전송 제어 프로토콜(Transmission Control Protocol, TCP, 문화어: 전송조종규약))
+ 네트워크 레이어:Tranport Layer
+ 스트림을 이용한 실시간 통신
+ 소켓을 이용한 네트워크 프로그래밍

+ 실시간 서비스 구현한다 == 소켓을 이용한 서비스
+ 통신접점,
+ 데이터 그램 소켓 : UDP
+ 스트림 소켓 : TCP


 |       | <center> TCP</center> | <center> UDP</center>       |
 | ----- | --------------------- | --------------------------- |
 | 연결    | 연결필요                  | 연결불필요                       |
 | 신뢰성   | 신뢰성.손실된데이터 재전송        | 신뢰성 없음                      |
 | 데이터흐름 | 혼잡도 제어                | 없음                          |
 | 속도    | UDP에 비해 느림            | 빠르다                         |
 | 적용분야  | 신뢰성 있는 실시간 통신         | 속도 중시형 실시간 통신, 스트리밍 비디오/오디오 |
 | 적용분야  | FTP,HTTP,SMTP         | DNS,DHCP,SNMP               |

+ 연결 지향이므로 연결 과정 필요
+ 연결 과정
  + 서버 소켓 생성,준비,대기
  + 클라이언트 소켓 연결,소켓간 연결
  + 데이터 교환
  + 접속 끊기


노드에서 제공해주는 net 모듈로 제작가능

```javascript
var net = require('net')

//var server = net.createServer([option],[,connectionListener])

var server = net.createServer(function(socket){
    console.log('Connect Event',socket.remoteAddress)
})

server.on('listening',function(){
    console.log('Server is listening @',server.address())
})
server.on('close',function(){
    console.log('Server Close')
})

```


