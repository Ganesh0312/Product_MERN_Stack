const express = require("express");
const cors = require("cors");
const ConnectDb = require("./Configs/ConnectDb");
const app = express();

require("dotenv").config();
ConnectDb();

const categoryRoutes = require("./Routes/CategoryRoutes");
const productRoutes = require("./Routes/ProductRoutes");
const adminRoutes = require("./Routes/AdminRoutes");
app.use(express.json());
app.use(cors());

app.use("/category", categoryRoutes);
app.use("/product", productRoutes);
app.use("/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.send("<h1>hello<h1>");
// });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
