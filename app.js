import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares
app.use(cors());
app.use(express.json());

// Connection to DB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => console.log("Server running on port:" + PORT));
  })
  .catch((e) => console.log(e));

const API_URI = "https://jsonplaceholder.typicode.com/users";

//GET vartotoju varda ir id
app.get("/api/users/names", async (req, res) => {
  const allData = await fetch(API_URI)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  try {
    const userInfo = allData.reduce((total, item) => {
      let userObject = {};
      userObject["id"] = item.id;
      userObject["name"] = item.name;
      total.push(userObject);

      return total;
    }, []);

    res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
});
//GET vartotoju id, vardas, email
app.get("/api/user/emails", async (req, res) => {
  const allData = await fetch(API_URI)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  try {
    const userInfo = allData.reduce((total, item) => {
      let userObject = {};
      userObject["id"] = item.id;
      userObject["name"] = item.name;
      userObject["email"] = item.email;
      total.push(userObject);

      return total;
    }, []);

    res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
});
//GET id, vardas, adresas stringe
app.get("/api/users/address", async (req, res) => {
  const allData = await fetch(API_URI)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  try {
    const userInfo = allData.reduce((total, item) => {
      let userObject = {};
      userObject["id"] = item.id;
      userObject["name"] = item.name;
      userObject["adress"] = item.address.city + item.address.street;
      total.push(userObject);

      return total;
    }, []);

    res.json(userInfo);
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/users", async (req, res) => {
  const newUserData = req.body;
  try {
    const newUser = new User(newUserData);

    const createdUser = await newUser.save();

    res.json({
      message: "User created",
      user: createdUser,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});
