// index.js
const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIp(ip, (error, coordsObject) => {
      if (error) {
        return callback(error, null);
      }
      fetchISSFlyOverTimes(coordsObject, (error, times) => {
        if (error) {
          return callback(error, null);
        }
        callback(null, times);
      });
    });
  });
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for (const time of passTimes) {
    let date = new Date(time.risetime * 1000);
    console.log(`Next pass at ${days[date.getDay()]} ${months[date.getMonth()]} ${date.getDate()} ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} GMT-0700 (Pacific Daylight Time) for ${time.duration} seconds!`);
  }
});