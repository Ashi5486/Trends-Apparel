

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const departmentRouter = require("./routes/departmentRoutes");
const protectedRoutes = require("./routes/protected");
const lineRouter = require("./routes/lineRoutes");
const sectionRouter = require("./routes/sectionRoutes"); // Correct path for sectionRouter
const tidnoRouter = require("./routes/tidnoRoutes"); // Correct path for tidnoRouter
const machineRouter = require("./routes/machineRoutes")
const sizeRouter = require("./routes/sizeRoutes")
const machineIssueRouter = require("./routes/machineissueRoutes")
const operationRouter = require("./routes/operationRoutes")

dotenv.config();
connectDB();

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "http://localhost:5173",  // Make sure this is the correct frontend URL
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, // Allows cookies to be sent
  })
);

app.use(express.json()); // For parsing JSON bodies
app.use(cookieParser());  // For parsing cookies

// Route handlers
app.use("/api/auth", authRoutes);
app.use("/api/departments", departmentRouter);
app.use("/api/lines", lineRouter);  // Lines route
app.use("/api/sections", sectionRouter); // Sections route
app.use("/api/tidnos", tidnoRouter); // Tidnos route
app.use("/api/machines", machineRouter);
app.use("/api/machineissues",machineIssueRouter)
app.use("/api/sizes",sizeRouter);
app.use("/api/operations",operationRouter)
// Protected routes should be added last
// app.use("/api", protectedRoutes); 

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
