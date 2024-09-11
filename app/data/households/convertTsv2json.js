#!/usr/bin/env node

// let fileInputName = '/Users/aarongilliland/personal/projects/SarpyGOP/_ELECTIONS/2024Primary/202404_Sarpy_Households.tsv'; 
let fileInputName = '/Users/aarongilliland/personal/projects/SarpyGOP/_ELECTIONS/2024Primary/202404_precinct_split_ballotids.tsv';
// let fileOutputName = './202404SarpyHouseholds.json';
let fileOutputName = './202404SarpyPrecinctBallotIds.json';

tsv = require("node-tsv-json");
tsv({
  input: fileInputName, 
  output: fileOutputName
  //array of arrays, 1st array is column names
  ,parseRows: false
}, function(err, result) {
  if(err) {
    console.error(err);
  }else {
    console.log(result);
  }
});