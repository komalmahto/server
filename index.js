const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
const Image = require("./model/image");

(async () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://komal:qtopia123@cluster0.s9efs5i.mongodb.net/?retryWrites=true&w=majority"
      )
      .then(() => console.log("connected"))
      .catch((e) => console.log(e));
    mongoose.set("strictQuery", true);
  } catch (err) {
    console.log(err);
  }
})();

app.post("/api/createimages", async (req, res) => {
  console.log("aya");
  const { imageurl, imageContent, ipAddress } = req.body;
  const newImage = new Image({
    imageurl: imageurl,
    ipAddress: ipAddress,
    imageContent: imageContent,
  });

  const addedImage = await newImage.save();
  res.status(201).json(addedImage);
});

app.post("/api/check-unique", async (req, res) => {
  console.log("unique");
  const { ipAddres, id } = req.body;
  const findId = await Image.findOne({ _id: id });
  console.log(id, ipAddres);
  if (findId) {
    if (findId.ipAddress.includes(ipAddres)) {
      console.log(true);
    } else {
      findId.ipAddress.push(ipAddres);
      const res = await findId.save();
      console.log(res);
    }
  }
  res.status(201).json(findId);
});

app.get("/api/getimages", async (req, res) => {
  const images = await Image.find();
  console.log("ayaaa");
  if (images) {
    res.status(201).json(images);
  }
});

app.listen(6000, (req, res) => {
  console.log("connected");
});
