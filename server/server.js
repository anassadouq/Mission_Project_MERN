const express = require('express');

const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();
app.use(cors());
app.use(express.json());


// CONNECT TO DB
const   userName = "sadouqanas1",
        password = process.env.PASSWORD,
        database = "mission";

const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${userName}:${password}@cluster0.mtjdktz.mongodb.net/${database}?retryWrites=true&w=majority`)

// Models
const UsersModel = require('./models/Users');
const MissionsModel = require('./models/Missions');

/*              Auth            */

// Show Users
app.get("/users", async(req,res)=>{
    try {
        const users = await UsersModel.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving users", error: error });
    }
});

// Register
app.post("/register", async (req, res) => {
    try {
        const register = new UsersModel(req.body);
        await register.save();
        res.json(req.body);
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error: error });
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UsersModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // At this point, the user has provided valid credentials
        const token = jwt.sign({ id: user._id }, 'secret_key', { expiresIn: '1d' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Error authenticating user", error: error });
    }
});

/*              Missions            */

// Show Missions
app.get("/missions", async(req,res)=>{
    const mission = await MissionsModel.find();
    res.json(mission)
})

// Create Mission
app.post("/create", async (req, res) => {
    const newMission = new MissionsModel(req.body);
    await newMission.save();
    res.json(req.body)
})

// Update Mission
app.patch("/update/:id", async (req, res) => {
    try {
        const missionId = req.params.id;
        const updatedMission = await MissionsModel.findByIdAndUpdate(missionId, req.body, { new: true });
        res.json({ message: "Mission updated successfully", mission: updatedMission });
    } catch (error) {
        res.status(500).json({ message: "Error updating mission", error: error });
    }
});

// Delete Mission
app.delete("/delete/:id", async (req, res) => {
    try {
        const missionId = req.params.id;
        const result = await MissionsModel.deleteOne({ _id: missionId });
        res.json({ message: "mission deleted successfully", result: result });
    } catch (error) {
        res.status(500).json({ message: "Error deleting mission", error: error });
    }
});


app.listen("3001", ()=>{
    console.log("server works!!")
})