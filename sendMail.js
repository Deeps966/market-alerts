let credentials;
const emailTemplate = require('./emailTemplate.js');
const gmailSend = require('gmail-send');

try {
  credentials = require('./credentials.json');
} catch (error) {
  console.log("Credentials file not found");
}

const mailId = credentials?.user || process.env.user;

const sendMail = (zone, currentMarket, mmi, lastWeekMmi, lastMonthMmi) => {
  const title = `Today's MMI: ${mmi} | LastWeek: ${lastWeekMmi} | LastMonth: ${lastMonthMmi}`

  return new Promise((resolve, reject) => {
    gmailSend({
      user: mailId,
      pass: credentials?.password || process.env.password,
      to: process.env.mail || mailId,
      subject: 'MMI ALERT - ' + currentMarket,
      text: title,
      html: emailTemplate(zone, title),
    })({}, err => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
};

module.exports = {
  sendMail,
  mailId
};
