const express = require("express");
const { validator, serviceRules } = require("../middlewares/validator");

const { cloudinary } = require("../utils/cloudinary");
const Profile = require("../models/Profile");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const Service = require("../models/Service");

router.get("/test", (req, res) => {
  res.send("router service test");
});

//add service
router.post("/addservice", isAuth(), async (req, res) => {
  console.log("req.body", req.body);
  try {
    const newService = new Service(req.body);
    newService.user = req.user._id;
    await newService.save();
    const response = await User.updateOne(
      { _id: req.user._id },
      { hasService: true }
    );
    res.send({ msg: "new service added", newService });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//get current user service

router.get("/currentservice", isAuth(), async (req, res) => {
  try {
    const currentService = await Service.findOne({
      user: req.user._id,
    })
      .populate("user", "firstName lastName email")
      .populate("profile");
    res.send(currentService);
  } catch (error) {
    res.status(400).send("error");
  }
});

//upload multiple images

router.put("/uploadimages", isAuth(), async (req, res) => {
  const urls = [];
  try {
    for (let i = 0; i < req.body.length; i++) {
      const imageString = req.body[i];
      const uploadResponse = await cloudinary.uploader.upload(imageString, {
        folder: `${req.user.firstName}-${req.user.lastName}-gallery-images`,
      });
      urls.push(uploadResponse.secure_url);
    }
    console.log(urls);
  } catch (error) {
    console.log(error);
  }
  try {
    const oldService = await Service.findOne({ user: req.user._id });
    oldService.images = [...oldService.images, ...urls];
    await oldService.save();
    res.send({ msg: "images successfully added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//delete image

router.put("/deleteimage", isAuth(), async (req, res) => {
  const imageUrl = req.body.imageUrl;
  console.log("imageUrl", imageUrl);
  try {
    const updatedService = await Service.findOne({ user: req.user._id });
    console.log("updatedService", updatedService);
    updatedService.images = updatedService.images.filter(
      (img) => img !== imageUrl
    );
    await updatedService.save();

    res.send({ msg: "picture deleted" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// get all services

router.get("/services", async (req, res) => {
  const category = req.query.category.toLowerCase() || "";
  try {
    const services = await Service.find({ profession: { $regex: category } })
      .populate("user", "firstName lastName email")
      .populate("profile");
    res.send(services);
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: error });
  }
});

//get one user service

router.get("/userservice/:userid", async (req, res) => {
  const userId = req.params.userid;
  try {
    const service = await Service.findOne({ user: userId })
      .populate("user", "firstName lastName email createdOn")
      .populate("profile");
    res.send(service);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

//update service

router.put("/updateservice", isAuth(), async (req, res) => {
  try {
    const service = await Service.updateOne(
      { user: req.user._id },
      { ...req.body }
    );
    if (!service.modifiedCount) {
      return res.status(400).send({ msg: "service already updated" });
    }
    res.send({ msg: "service updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = router;
