## 초기셋팅
```javascript
    var mysql = require('mysql');

    var dbConfig = {
        host:'localhost',
        user:'root',
        password:'1234',
        database:'Moviest'
    }

    var connection = mysql.createConnection(dbConfig)

```

## 커넥션 함수
+ connect : 연결
+ end : 연결 종료
+ query : SQL문 실행시 커넥션 자동 연결

## 커넥션 연결과 닫기
```javascript
    connection.connect(function(err){
        if(err){
            console.error('error connecting: '  + err.stack);
            return
        }
        console.log('connected as id ' + connection.threadId);
        connection.end()
    })
```


# 커넥션 풀
+ 다수의 커넥션 관리 기법
+ 풀에서 커넥션 얻어서 사용하고 풀에 반납

+ 풀 생성
```javascript
    mysql.createPool(option)
```
+ 풀 옵션
    + waitForConnections:풀에 여유 커넥션이 없는 경우 대기 여부
    + connectionLimit:최대 커넥션 개수, 기본 10개


```javascript
    var pool =  mysql.createPool({
        host :'localhost',
        user:'user',
        password:'1234',
        connectionLimit:50

    })
```


## 풀에서 커넥션 얻기
```javascript
    pool.getConnection(function(err,connection){
        if(!err){
            // connected!
        }
    })
```
+ 풀에서 커넥션 반환
```javscript
    connection.release();
```
+ 풀 닫기
```
    pool.end()
```

## db 커넥션 모듈 분리
+ db 커넥션 모듈
```javascript
    var mysql = require('mysql');
    var dbPool = mysql.createPool(dbConfig);
    module.exports = dbPool;
```
+ 사용하기
```javascript
    var pool = require('./dbconnection')
    pool.getConnection(function(err,connection){})
```


## SQL 실행
+ SQL 실행
```javascript
    connection.query(sql,callback)
```
+ 콜백함수 형태
```javascript
    function(error,results,fields)
```
+ SQL 실행
```javascript
    var sql = 'INSERT INTO movies ...';
    connection.query(sql,function(err,results){
        if(err){
            console.error('INSERT ER',err)
        }else{
            console.log('resukts',results)
        }
    })
```
+ placeHolder
```javascript
    var sql = 'INSERT INTO movies (title,director,year) VALUES (?,?,?);';
    connection.query(sql,['인터스텔라','크리스토퍼 놀란',2015],function(err,results){

    })
```
+ INSERT의 경우
```javascript
    var data = {
        title:'메멘토',
        director:'크리스토퍼 놀란',
        year:2000
    }
    var sql = 'INSERT INTO movies SET ?';
    connection.query(sql,data,function(err,results){
        //에러처리
        //결과사용
        connection.release();
    })
```


+ 실행 결과
  + affeectedRow:영향을 받은 열의 갯수
  + insertID:새로 추가한 경우 Primary Key
  + changedRow:변경된 열의 수

# 실행과 커넥션 닫기
+ query는 비동기 동작
+ 커넥션닫기(반환)은 query의 콜백 함수 내부에
  
```javascript
    pool.getconnection(function(err,connection){
        connection.query('SELECT....',function(err,rows){
            //결과 사용
            connection.release()
        })
    })
```

# 트랜잭션
+ conn.beginTransaction(CB);
+ CB:err를 파라미터로 하는 콜백 함수
+ conn.commit():트랜잭션 내 변경 확정
+ conn.rollback():트랜잭션 내 변경 되돌리기(그동안 실행되었던 sql실행요소 되돌리기 ctrl+z같은개념.)

```javascript
conn.beginTransaction(function(err){
    conn.query(sql1,function(err,result){
        if(err){
            //에러
            conn.rollback();
            return;
        }
        conn.query(sql2,function(err,result){
            if(err){
                //에러
                conn.rollback();
                return
            }
            //성공
            conn.commit();
        })
    })
})
```


# Sequelize
+ CRUD메서드를 사용하면 SQL문을 작성하지 않아도 데이터베이스에 반영 가능.

+ Sequelize
  + ORM:객체와 모델의 매핑(DB를 객체화시켜주는것)
  + 지원 데이터베이스 : PostgreSQL,MySQL,MariaDB,JQLite,MSSQL
  + Promise 기반

+ ORM
  + SQL 직접 다루기:SQL 작성 실행
  + ORM :모델을 이용한 값 저장과 변경
  
## 데이터베이스 연결 설정
```
    new Sequelize(url,[opstions={}])
    new Sequelize(database,[username=null],[password=null],[options={}])
```
+ dialect:데이터베이스 종류, dialect=mysql
+ host,port:데이터베이스 서버주소,포트
+ pool:커넥션 풀 설정


```javascript
    var Sequelize = require('sequelize');
    var sequelize = new Sequelize('moviest','USER','PASSWORD');
```

```javascript
    var sequelize2 = new Sequelize('moviest','USER','PASSWORD',{
        dialect:'mysql',
        host:'RDB_ADDRESS.rds.amazonaws.com',
        port:3306,
        pool:{
            max:10,
            min:0,
            idle:10000
        },
    })
```

+ 모델
  + SQL 구문 작성 대신 모델을 이용
  + 
+ 모델 정의
```javascript
    sequelize.define('name',{attributes},{options})
```
+ 모델에서 실제 데이터베이스의 테이블 생성/삭제
```
   sync()->Promise.<this>
   drop([options])->Promise
```
+ 동작 결과:Promise 반환
  + Promise.then(resolved,rejected)

+ 데이터 타입
  + Sequelize.STRING //VARCHAR(255)
  + Sequelize.STRING(1234) //VARCHAR(1234)
  + Sequelize.TEXT // TEXT
  + Sequelize.INTEGER 
  + Sequelize.FLOAT
  + Sequelize.DATA // DATETIME for mysql
  + Sequelize.BOOLEAN 


```javascript
    var Movie = sequelize.define('movie',{
        title:{type:Sequelize.STRING},
        director:{type:Sequelize.STRING},
        year:{type:Sequelize.INTERGER},
        synopsis:{type:Sequelize.STRING(1024)}
    })
    Movie.sync().then(resolved,rejected)
```

## 데이터 저장(Model)
```
    create(values,[options])->Promise<instance>
```
+ 예제코드
```javascript
    Movie.create({
        title:'아바타',
        director:'제임스 카메론',
        year:2010,
    }).then(resolved,rejected)
    //SQL INSERT에 해당
```

## 데이터 찾기
+ 찾기
```
    findAll([options]) -> Promise.<Array.<Instance>>
    findById([options]) -> Promise.<Instance>
    findIne([options]) -> Promise.<Instance>
    findAndCount([findOptions]) -> promise.<Object>
```
+ 갯수
```
    count([options]) -> Promise.<Integer>
```
```javascript
    Model.findAll({
        attribute:[attr1,attr2,attr3],
        where:{
            attr1:value1,
            attr2:value2
        }    
    })
```
+ 오퍼레이터
  + $gte,$gt,$lte,$lt
  + $ne,$in,$not
  + $and,$or ...

+ 조건에 맞는 제목과 감독 찾기
```javascript
Movies.findAll({
    attributes:['title','director']
})
Movie.findAll({
    where:{
        director:'제임스 카메론',
        year:{$gt:2000}
    }
})
```

```javascript
Movies.findAll().then(function(results){
    for(var i = 0; i < results.length; i++){
        var item = results[i];
        console.log('id : ', item.id)
        console.log('title : ', item.title)
    }
},rejected)
```

## 데이터 수정
+ 수정(model)
  + update:Options의 where 는 필수
  ```
  update(values,options) -> Promise.<Array.<affectedCount,affectedRows>>
  ```
  + upsert: Insert or Update
  ```
    upsert(values,[options]) -> Promise.<created> //insert or update
  ```

```javascript
    Movie.update({
        synopsis:'시놉시스'
    },{
        where:{}
    }).then(resolved,rejected)
```
## 데이터 삭제
```
    destroy(options) -> Promise.<Integer>
```
+ 예제코드 - where 옵션은 필수
```javascript
    Movie.destroy({
        where:{}
    }).then(resolved,rejected)
```

