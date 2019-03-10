/*
In weather.dat you’ll find daily weather data for Morristown, NJ for June 2002.
(http://codekata.com/data/04/weather.dat)

Download this text file, then write a program to output the day number (column one) 
with the smallest temperature spread (the maximum temperature is the second column, 
  the minimum the third column).
*/
const fs = require('fs')
const readline = require('readline')

const { findMinSpread, parseLine } = require('./helpers.js')

const FIRST_DATA_LINE = 2
const FILE = './src/04-DataMunging/weather.dat'
const KEYS = {
  Day: 0,
  HighTemp: 1,
  LowTemp: 2,
}

let linesParsed = 0
let data = []

const rl = readline.createInterface({
  input: fs.createReadStream(FILE),
  crlfDelay: Infinity,
})

rl.on('line', line => {
  if (linesParsed++ < FIRST_DATA_LINE) {
    return
  }

  const parsed = parseLine(line)
  if (parsed.length) {
    data.push(parsed)
  }
})

rl.on('close', () => {
  const min = findMinSpread(data, KEYS.HighTemp, KEYS.LowTemp)
  console.log({ day: min[KEYS.Day] })
})
