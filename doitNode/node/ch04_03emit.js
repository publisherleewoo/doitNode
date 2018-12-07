var Calc = require('./calc3');
var calc1 = new Calc()
console.log(calc1)

calc1.emit('stop');

console.log('Calc 에 stop 이벤트 전달함.') //전달이 너무빨리되서 전달됨이 먼저 출력