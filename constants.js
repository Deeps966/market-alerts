const ZONES = {
  GREED: 'GREED',
  FEAR: 'FEAR',
  ExtremeFear: 'Extreme Fear',
  ExtremeGreed: 'Extreme Greed'
};

const COLORS = {
  [ZONES.FEAR]: '#ffb703',
  [ZONES.GREED]: '#fb8500',
  [ZONES.ExtremeFear]: '#105e62',
  [ZONES.ExtremeGreed]: '#b5525c',
};

const MESSAGING = {
  [ZONES.FEAR]:
    'Fear (30—50): It suggests that investors are fearful in the market, but the action to be taken depends on the MMI trajectory. If it is dropping from Greed to Fear, it means fear is increasing in the market & investors should wait till it reaches Extreme Fear, as that is when the market is expected to turn upwards If MMI is coming from Extreme fear, it means fear is reducing in the market.If not best, might be a good time to open fresh positions.',
  [ZONES.GREED]:
    'Greed (50—70): It suggests that investors are acting greedy in the market, but the action to be taken depends on the MMI trajectory. If MMI is coming Neutral towards Greed zone, it means greed is increasing in the market and investors should be cautious in opening new positions. If MMI is dropping from Extreme Greed, it means greed is reducing in the market.But more patience is suggested before looking for fresh opportunities.',
  [ZONES.ExtremeFear]:
    'Extreme Fear (<30): High extreme fear(<20) suggests a good time to open fresh positions, as markets are likely to be oversold and might turn upwards',
  [ZONES.ExtremeGreed]:
    'Extreme Greed (>70): High extreme greed(> 80) suggests investors should avoid opening fresh positions as markets are overbought and likely to turn downwards',
};

const MMI_UPPER_BOUND = 70;
const MMI_MID_BOUND = 50;
const MMI_LOWER_BOUND = 30;

module.exports = {
  ZONES,
  COLORS,
  MESSAGING,
  MMI_UPPER_BOUND,
  MMI_MID_BOUND,
  MMI_LOWER_BOUND
};
