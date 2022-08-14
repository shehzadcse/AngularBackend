require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
const generator = require("generate-password");
const bodyparser = require("body-parser");
const { upload } = require("./utils/fileUtils");
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

let usersArray = [];
let adsArray = [
  {
    id: 3,
    user_id: 2,
    company_name: "Tata",
    name: "Ankit Gupta",
    email: "ankitgupyta8768@gmail.com",
    phone: "08768357826",
    tagline: "Hello",
    addressLine1: "Near SVIST, Baruipur",
    city_name: "Kolkata",
    pin_code: "700145",
    state: "West Bengal",
    country: "India",
    blocksData: { hBlocks: 2, wBlocks: 5 },
    imageUrl:
      "https://ads-project-kolkata.s3.ap-south-1.amazonaws.com/tata-safety-jpg-1660504131916.jpg",
    totalBlocks: 10,
  },
  {
    id: 4,
    user_id: 3,
    company_name: "Airtel",
    name: "Ankit Gupta",
    email: "ankitgupyta8768@gmail.com",
    phone: "08768357826",
    tagline: "Hello",
    addressLine1: "Near SVIST, Baruipur",
    city_name: "Kolkata",
    pin_code: "700145",
    state: "West Bengal",
    country: "India",
    blocksData: { hBlocks: 2, wBlocks: 5 },
    imageUrl:
      "https://ads-project-kolkata.s3.ap-south-1.amazonaws.com/airtel-logo--e1613296706993-jpg-1660504171884.jpg",
    totalBlocks: 8,
  },
  {
    id: 2,
    user_id: 1,
    company_name: "Reliance",
    name: "Ankit Gupta",
    email: "ankitgupyta8768@gmail.com",
    phone: "08768357826",
    tagline: "Hello",
    addressLine1: "Near SVIST, Baruipur",
    city_name: "Kolkata",
    pin_code: "700145",
    state: "West Bengal",
    country: "India",
    blocksData: { hBlocks: 2, wBlocks: 3 },
    imageUrl:
      "https://ads-project-kolkata.s3.ap-south-1.amazonaws.com/reliance-jpg-1660504057690.jpg",
    totalBlocks: 6,
  },
  {
    id: 5,
    user_id: 4,
    company_name: "Ankit",
    name: "Ankit Gupta",
    email: "ankitgupyta8768@gmail.com",
    phone: "08768357826",
    tagline: "Ankit",
    addressLine1: "Near SVIST, Baruipur",
    city_name: "Kolkata",
    pin_code: "700145",
    state: "West Bengal",
    country: "India",
    blocksData: { hBlocks: 2, wBlocks: 2 },
    imageUrl:
      "https://ads-project-kolkata.s3.ap-south-1.amazonaws.com/1660499613516-jpg-1660504205835.jpg",
    totalBlocks: 4,
  },
];

app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.post("/register", (req, res) => {
  let id = parseInt(usersArray.length + 1);
  let name = req.body.name;
  let email = req.body.email;
  let phone = req.body.phone;
  let password = req.body.password;
  let newArray = {
    id,
    name,
    email,
    phone,
    password,
  };
  console.log(newArray);
  usersArray.push(newArray);
  res.send(newArray);
});
app.post("/login", (req, res) => {
  isValid = false;
  let email = req.body.email;
  let password = req.body.password;
  let user;
  for (let index = 0; index < usersArray.length; index++) {
    if (
      usersArray[index].email === email &&
      usersArray[index].password === password
    ) {
      isValid = true;
      user = usersArray[index];
    }
  }
  if (isValid) {
    res.send({
      message: "Login Success",
      user: user,
    });
  } else {
    res.send({
      message: "Login Failed! Please check your email and password",
    });
  }
});

app.post("/create-ad", (req, res) => {
  let isLoggedIn = req.body.isLoggedIn || true;
  let id = parseInt(usersArray.length + 1);
  let password = generator.generate({
    length: 10,
    numbers: true,
    symbols: true,
    lowercase: true,
    uppercase: true,
    strict: true,
  });

  if (isLoggedIn) {
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let company_name = req.body.company_name;
    let tagline = req.body.tagline;
    let addressLine1 = req.body.addressLine1;
    let addressLine2 = req.body.addressLine2;
    let city_name = req.body.city_name;
    let pin_code = req.body.pin_code;
    let state = req.body.state;
    let country = req.body.country;
    let ad_layout = req.body.ad_layout;
    let blocksData = req.body.blocksData;

    let newArray = {
      id,
      name,
      email,
      phone,
      password,
    };

    usersArray.push(newArray);
    console.log("users Array");
    console.log(usersArray);

    ad_id = parseInt(adsArray.length + 1);
    newadsArray = {
      id: ad_id,
      user_id: id,
      company_name,
      name,
      email,
      phone,
      tagline,
      addressLine1,
      addressLine2,
      city_name,
      pin_code,
      state,
      country,
      ad_layout,
      blocksData,
      imageUrl: "",
      totalBlocks: blocksData.hBlocks * blocksData.wBlocks,
    };
    adsArray.push(newadsArray);
    // console.log("newadsArray Array");
    console.log(newadsArray);
    res.send(newadsArray);
  } else {
    res.send({
      message: "Session Timed Out Please Login Again",
    });
  }
});

app.get("/users", (req, res) => {
  res.send(usersArray);
});
app.get("/ads", (req, res) => {
  let sortedArray = adsArray.sort((a, b) => b.totalBlocks - a.totalBlocks);
  res.send(sortedArray.filter((val) => val.imageUrl));
});
app.post("/upload-image", upload.single("logo"), (req, res) => {
  let id = req.body.id;
  // console.log(adsArray, "here");
  let newData = { ...adsArray[+id - 1] };
  newData.imageUrl = req.file.location;
  adsArray[+id - 1] = newData;
  res.json({
    adsArray,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
