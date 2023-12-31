const cloudinary = require("../config/cloudinary");
const foods = require("../data.json");
const Food = require("../models/Food");

const getAllFoods = async (req, res) => {
  try {
    res.json(foods);
  } catch (error) {
    console.log(error);
  }
};

const createFood = async (req, res) => {
  const {
    name,
    country,
    price,
    // restaurantName,
    // restaurantAddress,
    // isAvailable,
  } = req.body;

  const image = req.files.image;

  if (!image) {
    return res.status(400).json({ message: "Image is required" });
  }

  try {
    const imageResult = await cloudinary.uploader.upload(image.tempFilePath);

    const newFood = new Food({
      name,
      country,
      img: imageResult.secure_url,
      price,
      // restaurant: {
      //   name: restaurantName,
      //   address: restaurantAddress,
      // },
      // isAvailable,
    });

    await newFood.save();

    res.json({ message: "Food item created successfully", newFood });
  } catch (error) {
    console.error("Food creation error:", error);
    return res.status(500).json({ message: "Food creation failed" });
  }
};


module.exports = {
  getAllFoods,
  createFood,
};
