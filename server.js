const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const { createScreenshot } = require("./src/generateRandomScreenShot");
const app = express();

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/background", async (req, res) => {
  try {
    const directoryPath = "./src/images";
    const uniqueIdentifier = Date.now(); // Generate a unique identifier (timestamp)
    const screenshot = await createScreenshot(uniqueIdentifier);

    if (screenshot) {
      res.sendFile(`${directoryPath}/${screenshot}`, {
        root: __dirname,
      });
    } else {
      // Handle the case where createScreenshot fails or returns null
      res.status(500).send("Error generating screenshot");
    }
  } catch (err) {
    // Handle unexpected errors
    console.error("Error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// const getRandomFile = async (directoryPath) => {
//   try {
//     const files = await fs.readdir(directoryPath);

//     const imageFiles = files.filter((file) => {
//       // Filter for image files (customize the condition as needed)
//       return /\.(jpg|jpeg|png|gif)$/i.test(file);
//     });

//     if (imageFiles.length === 0) {
//       console.log("No image files found in the directory.");
//       return null;
//     }

//     const randomIndex = Math.floor(Math.random() * imageFiles.length);
//     const randomImage = imageFiles[randomIndex];
//     return randomImage;
//   } catch (err) {
//     console.error("Error reading directory:", err);
//     return null;
//   }
// };
