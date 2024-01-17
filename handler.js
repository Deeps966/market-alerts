const axios = require('axios');
const sendMail = require('./sendMail.js');
const CONSTANTS = require('./constants');

module.exports.mmiAlert = async () => {
  const url = "https://api.tickertape.in/mmi/now";
  // 'https://api.smallcase.com/market/indices/marketMoodIndex/current';

  try {
    const response = await axios.get(url);
    const mmi = Math.trunc(response.data.data.currentValue);
    const lastDayMmi = Math.trunc(response.data.data.lastDay.indicator);
    const lastWeekMmi = Math.trunc(response.data.data.lastWeek.indicator);
    const lastMonthMmi = Math.trunc(response.data.data.lastMonth.indicator);

    let zone;
    const extremeGreed = mmi > CONSTANTS.MMI_UPPER_BOUND;
    const Greed = mmi > CONSTANTS.MMI_MID_BOUND;
    const fear = mmi < CONSTANTS.MMI_MID_BOUND;
    const extremeFear = mmi < CONSTANTS.MMI_LOWER_BOUND;

    let currentMarket;
    if (mmi < lastWeekMmi) currentMarket = "Market moving towards BEAR Trend"
    else currentMarket = "Market moving towards BULL Trend"

    if (Greed) {
      zone = CONSTANTS.ZONES.GREED;
    } else if (extremeGreed) {
      zone = CONSTANTS.ZONES.ExtremeGreed;
      currentMarket = "Market is overbought (Selling Time)"
    } else if (fear) {
      zone = CONSTANTS.ZONES.FEAR;
    } else if (extremeFear) {
      zone = CONSTANTS.ZONES.ExtremeFear;
      currentMarket = "Market is oversold (Buying Time)"
    }

    console.log(zone, mmi, lastWeekMmi, lastMonthMmi)
    console.log(currentMarket)
    await sendMail(zone, currentMarket, mmi, lastWeekMmi, lastMonthMmi);

  } catch (error) {
    console.log('An error occurred:');
    console.log(error);
  }
};
