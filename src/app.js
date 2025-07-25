const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("NutechPay API is running");
  });
  
const routes = require('./routes');
app.use(routes);
app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
  