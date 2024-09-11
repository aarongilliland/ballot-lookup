#!/usr/bin/env node


let csvToJson = require('convert-csv-to-json');


let fileInputName = '/Users/aarongilliland/personal/projects/SarpyGOP/_ELECTIONS/2024Primary/202404_Sarpy_Households.tsv'; 
let fileOutputName = './202404SarpyHouseholds.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);