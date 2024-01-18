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
  const url = req.url;
  if (url === '/') {
    res.write('<html>');
    res.write('<head> <title> Market Alerts </title> </head>');
    res.write(`<h1>Welcome to Market Alerts</h1>
    <h4>You will receive mail of Current Market Update</h4>`);
    res.write('</html>');
    handler.mmiAlert();
    return res.end();
  }
}).listen(process.env.PORT);

console.log("Market Alert script is live now at ", process.env.PORT)