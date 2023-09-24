const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
require("dotenv").config();

const createScreenshot = async () => {
  const MOVIE_NAME = process.env.MOVIE_NAME;
  const MOVIE_DURATION = process.env.MOVIE_DURATION;
  try {
    const start = Date.now();
    const randomFrameInSeconds = Math.floor(Math.random() * MOVIE_DURATION);
    const randomFrameInDurationFormat =
      convertSecondsToDuration(randomFrameInSeconds);

    const inputFilePath = path.join(__dirname, MOVIE_NAME);

    const outputFileName = `${randomFrameInSeconds}.jpg`;

    await new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .on("end", () => {
          console.log(`Finished in ${(Date.now() - start) / 1000} seconds`);
          console.log(`Screenshot ${outputFileName} was saved`);
          resolve(outputFileName);
        })
        .on("error", (err) => {
          console.error("An error happened:", err.message);
          reject(err);
        })
        .screenshots({
          count: 1,
          timemarks: [randomFrameInDurationFormat],
          filename: `${randomFrameInSeconds}.jpg`,
          folder: path.join(__dirname, "images"),
        });
    });
    return outputFileName;
  } catch (err) {
    console.error("Error:", err);
    return "error.jpg";
  }
};

function convertSecondsToDuration(seconds) {
  const frameTime = new Date(0);
  frameTime.setSeconds(seconds);
  return frameTime.toISOString().substring(11, 19);
}

module.exports = { createScreenshot };
