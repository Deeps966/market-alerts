const cron = require('node-cron');
const handler = require("./handler")
const http = require("http")
const { mailId } = require('./sendMail')
const https = require('https');

const cronPattern = process.env.cronPattern || '00 20 * * 1-5';
console.log("Cron Pattern:", cronPattern, mailId)

const host = process.env.NODE_ENV == "development" ? `http://127.0.0.1:${process.env.PORT}/` : "http://market-alerts.adaptable.app/"

// Schedule the cron job
cron.schedule(cronPattern, () => {
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
    return res.end();
  } else if (url === '/notify') {
    handler.mmiAlert();
    data = {
      mailId: process.env.mail || mailId,
      status: true
    }
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify(data))
  }
}).listen(process.env.PORT);

console.log(`Market Alert script is live now at ${host}`)

setInterval(() => {
  console.log('Server is Running...');
  http.get(host, (res) => {
    console.log(res.statusCode)
  });
}, process.env.TIMEOUT || 1000) // Every minute