const express = require('express')
const app = express()
const port = process.env.port || 3000;
const bodyparser = require('body-parser')
// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
let usersArray = [];
app.post('/register', (req, res) => {
    let id = (usersArray.length.toString() == 1) ? 1 : parseInt(usersArray.length + 1);
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
    let newArray = {
        id, name, email, phone, password
    }
    console.log(newArray)
    usersArray.push(newArray);
    res.send(usersArray)
})
app.get('/login', (req, res) => {
    isValid = false;
    let email = req.body.email;
    let password = req.body.password;
    for (let index = 0; index < usersArray.length; index++) {
        if (usersArray[index].email === email && usersArray[index].password === password) {
            isValid = true;
        }
    }
    if (isValid) {
        res.send({
            message: "Login Success",
        })
    }
    else {
        res.send({
            message: "Login Failed! Please check your email and password",
        })

    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})