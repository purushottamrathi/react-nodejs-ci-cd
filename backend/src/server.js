require("dotenv").config();
const app = require("./app");
const connectDB = require("./db/connection");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});