const fs = require("fs");
const { parse } = require("csv-parse");

export function load() {
    fs.createReadStream("./202404_Sarpy_Households.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
        console.log(row);
    })
    .on("end", function () {
        console.log("finished");
    })
    .on("error", function (error) {
        console.log(error.message);
    });
}