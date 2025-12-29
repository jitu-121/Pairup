const express = require("express");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// GET /user
app.get("/user", (req, res) => {
  res.send({
    firstName: "Akshay",
    lastName: "Saini"
  });
});

// POST /user
app.post("/user", async (req, res) => {
  console.log(req.body);

  // saving data to DB (mock)
  res.send("Data successfully saved to the database!");
});

// DELETE /user
app.delete("/user", (req, res) => {
  res.send("Deleted successfully!");
});

// This will match ALL HTTP methods for /test
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});

// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
