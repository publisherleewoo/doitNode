const exprss = require('express');
const app = exprss();
const logger = require('morgan');;
const mw = (req, res, next) => {
    throw Error('error!')
};
const errorMw = (err, req, res, next) => {
    console.log(err.message)
}

app.use(logger('dev'));
app.use(mw);
app.use(errorMw);

app.listen(3000, () => {
    console.log('running');
})

