const app = require("./app")
const mongoose = require("mongoose");
require('dotenv').config()

// connecting with database
mongoose.connect(process.env.DB_PORT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connection successful!'))
  .catch((err) => {
    console.log('DB connection NOT successful!');
    console.log(err);
  });

//starting server
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})