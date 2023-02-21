var fs = require('fs');
var pdf = require('dynamic-html-pdf');
var html = fs.readFileSync('template.html', 'utf8');

// Custom handlebar helper
pdf.registerHelper('ifCond', function (v1, v2, options) {
    if (v1 === v2) {
        return options.fn(this);
    }
    return options.inverse(this);
})

var options = {
    format: "A3",
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
        users: users
    },
    // path: "./output.pdf"    // it is not required if type is buffer
};

pdf.create(document, options)
    .then(res => {
        console.log(res.toString("base64"))
    })
    .catch(error => {
        console.error(error)
    });