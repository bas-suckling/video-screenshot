const ffmpeg = require("fluent-ffmpeg");

const createScreenshot = async () => {
  const start = Date.now();

  const randomFrameInSeconds = Math.floor(Math.random() * 6069);

  const randomFrameInDurationFormat =
    convertSecondsToDuration(randomFrameInSeconds);

  console.log(`${randomFrameInSeconds} -${randomFrameInDurationFormat}`);

  const proc = ffmpeg(
    "../src/video/Isle.of.Dogs.2018.1080p.10bit.BluRay.6CH.x265.HEVC-PSA.mkv"
  )
    // setup event handlers
    .on("end", function () {
      console.log(`finished in ${(Date.now() - start) / 1000} seconds`);
      console.log("screenshot was saved");
    })
    .on("error", function (err) {
      console.log("an error happened: " + err.message);
    })
    // take 2 screenshots at predefined timemarks and size
    .takeScreenshots(
      {
        count: 1,
        timemarks: [randomFrameInDurationFormat],
        filename: `${randomFrameInSeconds}.jpg`,
      },
      "./images"
    );
};

createScreenshot();

function convertSecondsToDuration(seconds) {
  const frameTime = new Date(0);
  frameTime.setSeconds(seconds);
  return frameTime.toISOString().substring(11, 19);
}
