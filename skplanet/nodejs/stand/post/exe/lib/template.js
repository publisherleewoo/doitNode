var htmlTemplate = {
    init: function (bodyInner) {
        return `
          <!doctype html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="Generator" content="EditPlus��">
            <meta name="Author" content="">
            <meta name="Keywords" content="">
            <meta name="Description" content="">
            <title>Document</title>

        </head>

        <body>
        ${bodyInner}
 
        </body>

        </html>
        `
    }
}

module.exports = htmlTemplate;