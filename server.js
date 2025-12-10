// server.js
require("dotenv").config();

console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS length =",
  process.env.EMAIL_PASS && process.env.EMAIL_PASS.length
);

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const petRoutes = require("./routes/pet");
const bookingRoutes = require("./routes/booking");
const feedbackRoutes = require("./routes/feedback");
const invoiceRoutes = require("./routes/invoice");
const adminRoutes = require("./routes/admin");
const adminServicesRouter = require("./routes/adminServices");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use((req, res, next) => {
  console.log("REQ", req.method, req.url);
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Public routes
app.use("/api/auth", authRoutes);

// Protected routes
app.use(authMiddleware);

app.use("/api/pets", petRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/services", adminServicesRouter);

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/pawcare_db";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  )
  .catch((err) => console.error("Failed to connect to MongoDB:", err));
