"use strict"
let SMA             = require('./lib/moving_averages/SMA.js');
let EMA             = require('./lib/moving_averages/EMA.js');
let WMA             = require('./lib/moving_averages/WMA.js');
let WEMA             = require('./lib/moving_averages/WEMA.js');
let MACD            = require('./lib/moving_averages/MACD.js');
let RSI             = require('./lib/oscillators/RSI.js');
let BollingerBands  = require('./lib/volatility/BollingerBands.js');
let ADX             = require('./lib/directionalmovement/ADX.js');
let ATR             = require('./lib/directionalmovement/ATR.js');
let ROC             = require('./lib/momentum/ROC.js');
let KST             = require('./lib/momentum/KST.js');
let Stochastic      = require('./lib/momentum/Stochastic.js');
let WilliamsR       = require('./lib/momentum/WilliamsR.js');
let ADL             = require('./lib/volume/ADL.js');
let OBV             = require('./lib/volume/OBV.js');
let TRIX            = require('./lib/momentum/TRIX.js');

let Indicators;

global.AvailableIndicators = [];

module.exports = Indicators = {
  SMA             : SMA,
  EMA             : EMA,
  MACD            : MACD,
  RSI             : RSI,
  WMA             : WMA,
  BollingerBands  : BollingerBands,
  ATR             : ATR,
  ADX             : ADX,
  WEMA            : WEMA,
  ROC             : ROC,
  KST             : KST,
  Stochastic      : Stochastic,
  WilliamsR       : WilliamsR,
  ADL             : ADL,
  OBV             : OBV,
  TRIX            : TRIX
};

Object.assign(global, Indicators);

for(let indicator in Indicators){
  var indicatorName = indicator.toLowerCase();
  global.AvailableIndicators.push(indicator);
  global[indicatorName] = Indicators[indicator].calculate;
};