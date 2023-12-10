const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UsersSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    }
});

// Hash password and confirmPassword before saving to database
UsersSchema.pre("save", async function(next) {
    const user = this;
    if (!user.isModified("password") && !user.isModified("confirmPassword")) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(user.password, salt);
    const hashConfirmPassword = await bcrypt.hash(user.confirmPassword, salt);
    user.password = hashPassword;
    user.confirmPassword = hashConfirmPassword;
    next();
});

const UsersModel = mongoose.model("users", UsersSchema);
module.exports = UsersModel;