const cron = require('node-cron');
const handler = require("./handler")
const http = require("http")

// Schedule the cron job
cron.schedule('0 20 * * 1-5', () => {
  // This will run your function at 8 PM (20:00) from Monday to Friday (1-5) // 0 20 * * 1-5
  handler.mmiAlert();
}, {
  scheduled: true,
  timezone: 'Asia/Kolkata', // Replace with your actual timezone, e.g., 'America/New_York'
});

http.createServer((req, res) => {
  res.write("Market Alerts is Live -> Sending mail...")
  handler.mmiAlert();
  res.end();
}).listen(process.env.PORT);

console.log("Market Alert script is live now at ", process.env.PORT)