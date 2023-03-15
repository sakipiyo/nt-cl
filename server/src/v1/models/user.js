const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        strict: true,
        strictQuery: false,
    },
    password: {
        type: String,
        required: true,
        strict: true,
        strictQuery: false,
    },
});

module.exports = mongoose.model("User", userSchema);