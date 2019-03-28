var mysql = require('mysql');
var config = require('../config')
var pool = mysql.createPool({
    connectionLimit: 10,
    host: config.mysqlConfighost,
    user: config.mysqlConfig.user,
    password: config.mysqlConfig.password,
    database: config.mysqlConfig.database
});

pool.getConnection(function (err, connection) {
    if (err) {
        console.log('user mysql not connected')
        throw err; // not connected!
    }
    console.log('user 커넥션 연결')
    connection.release();
});

function poolConnection(query, sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(__dirname, '에서 post 겟 커넥션 에러')
                reject(err)
            }
            connection.query(query, sql, function (error, results, fields) {
                connection.release();
                if (error) {
                    return reject('사용할 수 없는 값입니다')
                };
                if (results) {
                    resolve(results)
                } else {
                    return reject('검색값이 없습니다')
                }
            });

        });
    })
}

module.exports = {
    poolConnection
}
