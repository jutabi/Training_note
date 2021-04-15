// fs.readFile('../data/end_date.txt',
// 	'utf8', function (err, data1) {
// 		console.log("data1: ");
// 		console.log(data1);
// 		parse(data1, {comment:"#"}, function (err, data11) {
// 			console.log(data11);
// 		})
// 	});

// let data2 = fs.readFileSync('../data/end_date.txt', 'utf8')
// console.log("data2: ");
// console.log(data2);
//
// parse(data2, {comment:"#"}, function (err, data) {
// 	console.log("parse data: ");
// 	console.log(data);
// })

let fs = require('fs');
let parse = require('csv-parse/lib/sync');

let csv_data;
// let testFile = fs.readFileSync('../source/training_note.csv', 'utf8');
// let testCsv = parse(testFile);
// console.log(testCsv);

fs.readFile('../source/training_note.csv', 'utf8', function (err1, data1) {
    csv_data = parse(data1);
    // console.log(csv_data);
    console.log(csv_data)
});