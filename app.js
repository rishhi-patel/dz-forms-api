const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./server/config/db");
const {
  notFound,
  errorHandler,
} = require("./server/middleware/errorMiddleware");

const userRoutes = require("./server/routes/userRoutes");
const formRoutes = require("./server/routes/formRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//connecting DB
connectDB();

app.get("/", (req, res) => {
  res.send("API is running....");
});

app.use("/api/v1", userRoutes);
app.use("/api/v1/forms", formRoutes);

const PORT = process.env.PORT || 5000;
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, console.log(`Server running  on port ${PORT}`.yellow.bold));
