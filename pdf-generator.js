var fs = require('fs');
var pdf = require('dynamic-html-pdf');


// Custom handlebar helper
const generate_test_pdf = (title,total) => {
    var html = fs.readFileSync('./templates/sales.template.html', 'utf8');
    pdf.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    })

    var options = {
        format: "A4",
        orientation: "portrait",
        border: "10mm"
    };

    var users = [
        {
            name: 'aaa',
            age: 24,
            dob: '1/1/1991'
        },
        {
            name: 'bbb',
            age: 25,
            dob: '1/1/1995'
        },
        {
            name: 'ccc',
            age: 24,
            dob: '1/1/1994'
        }
    ];

    var document = {
        type: 'buffer',     // 'file' or 'buffer'
        template: html,
        context: {
            title,
            total
        },
        // path: "./output.pdf"    // it is not required if type is buffer
    };

    const result = pdf.create(document, options)
        .then(res => {
            return res.toString("base64")
        })

    return result;
}

module.exports =  { generate_test_pdf }