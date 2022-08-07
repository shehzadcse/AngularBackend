const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const generator = require('generate-password');
const bodyparser = require("body-parser");
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
let usersArray = [];
let adsArray = [];

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
        strict: true
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

        let newArray = {
            id,
            name,
            email,
            phone,
            password,
        };

        usersArray.push(newArray);
        console.log('users Array');
        console.log(usersArray)

        ad_id = parseInt(adsArray.length + 1);
        newadsArray = {
            id: ad_id,
            user_id: id,
            company_name,
            tagline,
            addressLine1,
            addressLine2,
            city_name,
            pin_code,
            state,
            country,
            ad_layout
        }
        adsArray.push(newadsArray);
        console.log('newadsArray Array');
        console.log(newadsArray)
        res.send(adsArray);
    }
    else {
        res.send({
            message: "Session TImed Out Please Login Again",
        });
    }
});


app.get("/users", (req, res) => {
    res.send(usersArray);
});
app.get("/ads", (req, res) => {
    res.send(adsArray);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
