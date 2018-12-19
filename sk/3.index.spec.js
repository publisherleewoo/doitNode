const assert = require('assert')
const should = require('should')
const request = require('supertest')
const app = require('./4.index')





describe('GET /users', () => {
    /*
    성공
     유저 객체를 담은 배열로 응답
     최대 limit 갯수만큼 응답
    
    실패
    limit이 숫자형이 아니면 400을 응답
    offset이 숫자형이 아니면 400 응답
    */

    describe('성공', () => {
        it('배열을 반환한다', (done) => {
            // assert.equal(1, 1)  //equal : 두 인자가 같아야만 하는 함수
            //  (1).should.equal(1)  //superTest
            request(app).get('/users').end((err, res) => {
                if (err) { throw err }
                console.log(res.body)
                res.body.should.be.instanceof(Array)
                res.body.forEach(user => {
                    user.should.have.property('name')
                })
                done()  //it함수가 종료된시점
            })

        })
        it('최대 limit 갯수만큼 응답', (done) => {
            request(app).get('/users?limit=2').end((err, res) => {
                res.body.should.have.lengthOf(2)
                done()
            })
        })

    })
    describe('실패', () => {
        it('limit이 정수가 아니면 400을 응답', done => {
            request(app).get('/users?limit=two')
                .expect(400)  //기대코드
                .end(done)
        })
    })
})


describe('GET /users/:id', () => {
    describe('성공', () => {
        it('유저 객체를 반환한다', done => {
            request(app).get('/users/1').end((err, res) => {
                res.body.should.have.property('id', 1)
                done()
            })
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐경우 400을 응답한다', done => {
            request(app).get('/users/one').expect(400).end(done)
        })
        it('찾을 수 없는 id일 경우 404을 응답한다', done => {
            request(app).get('/users/9').expect(404).end(done)
        })
    })

})

describe('DELETE /usrs/:id', () => {
    describe('성공', () => {
        it('204응답', done => {
            request(app).delete('/users/3').expect(204).end(done)
        })
    })
    describe('실패', () => {
        it('id가 숫자가 아닐경우 400', done => {
            request(app).delete('/users/three').expect(400).end(done)
        })
    })
})

describe('POST /users', () => {
    describe('성공', () => {
        it('201 응답,생성한 유저객체를 응답', done => {
            request(app).post('/users').send({ name: 'Daniel' }).expect(201).end((err, res) => {
                res.body.should.have.property('name', 'Daniel');
                done()
            })
        })
    })
    describe('실패', () => {
        it('name이 없으면 400 응답', done => {
            request(app).post('/users').send({}).expect(400).end(done)
        })
        it('name이 중복이면 409 응답', done => {
            request(app).post('/users').send({ name: 'Lee' }).expect(409).end(done)
        })

    })
})