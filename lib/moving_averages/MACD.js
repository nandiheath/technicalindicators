/**
 * Created by AAravindan on 5/4/16.
 */
"use strict"
const SMA        = require('./SMA');
const EMA        = require('./EMA');
const {truncate , DEFAULT_DECIMAL} = require('./../Utils/NumberFormatter');
let MACD;

let validateInput = function(input) {
  return input;
};

module.exports = MACD = function(input) {

  if(!validateInput) {
    throw 'Invalid Input'
  };

  var decimal = input.decimal || DEFAULT_DECIMAL;

  var oscillatorMAtype = input.SimpleMAOscillator ? SMA : EMA;

  var signalMAtype   = input.SimpleMASignal ? SMA : EMA;

  var fastMAProducer = new oscillatorMAtype({period : input.fastPeriod, values : []});

  var slowMAProducer = new oscillatorMAtype({period : input.slowPeriod, values : []});

  var signalMAProducer = new signalMAtype({period : input.signalPeriod, values : []});

  this.result = [];

  this.generator = (function* (){
    var index = 0;
    var tick;
    var MACD, signal, histogram, fast, slow;
    while (true) {
      if(index < input.slowPeriod){
        tick = yield;
        fast = fastMAProducer.nextValue(tick);
        slow = slowMAProducer.nextValue(tick);
        index++;
        continue;
      }
      MACD = fast - slow;
      signal = signalMAProducer.nextValue(MACD);
      histogram = MACD - signal;
      tick = yield({
        //fast : fast,
        //slow : slow,
        MACD : truncate(MACD , decimal),
        signal : signal ? truncate(signal , decimal) : undefined,
        histogram : isNaN(histogram) ? undefined : truncate(histogram , decimal)
      })
      fast = fastMAProducer.nextValue(tick);
      slow = slowMAProducer.nextValue(tick);
    }
  })();

  this.generator.next();

  input.values.forEach((tick) => {
    var result = this.generator.next(tick);
    if(result.value){
      this.result.push(result.value);
    }
  });
};

MACD.calculate = function(input) {
  if(input.reversedInput) {
    input.values.reverse();
  }
  let result = (new MACD(input)).result;
  input.reversedInput ? result.reverse():undefined;
  return result;
};

MACD.prototype.getResult = function () {
  return this.result;
};

MACD.prototype.nextValue = function (price) {
  return this.generator.next(price).value;
};
