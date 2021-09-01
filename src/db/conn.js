const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/regisdb',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
    console.log("connection with DB is success");
}).catch((error) => {
    console.log(error);
})