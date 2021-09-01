const express =  require("express");
const bcrypt = require("bcryptjs");
const hbs = require("hbs");
const app = express();
const path = require("path");
const port = process.env.PORT || 5000;
require("./db/conn.js");
const Register = require('./models/register.js');
const {json} = require("express");
const exp = require("constants");
const { dir } = require("console");
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const staticPath = path.join(__dirname, '../public');
// const template_path = path.join(__dirname, '../templates/views');
// const partial_path = path.join(__dirname, '../templates/partials');

app.use(express.static(staticPath));
app.set("view engine", "hbs");
// app.set("view", template_path);
// hbs.registerPartials(partial_path);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    res.render("index")
});
app.get('/log', (req, res) => {
    res.render("login")
});

app.post('/login', async(req, res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;
        const usermail = await Register.findOne({email:email});
        const isMatch =  await bcrypt.compare(password, usermail.password);
        console.log(isMatch);
        if(isMatch){
            res.status(201).render("index");
        }
        else{
            res.send("wrong password");
        }
    }catch(error){
        res.status(400).send("wrong details")
    }
});


app.post('/app', async(req, res) => {
    try{
        console.log("we are having a success");
        console.log(req.body);

        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if(password===cpassword){
            console.log("they are same");
            const mydata = new Register({
                firstname : req.body.fname,
                lastname : req.body.lname,
                email : req.body.email,
                gender : req.body.gender,
                phone : req.body.phone,
                age : req.body.age,
                password : password,
                cpassword : cpassword
            })
            const reg = await mydata.save();
            res.status(201).send(mydata);
        }
        else{
            res.send("passwords is not matching")
        }
    }catch(error){
        res.status(400).send(error);
    }
})


app.listen(port, () => {
    console.log("server is running ");
})