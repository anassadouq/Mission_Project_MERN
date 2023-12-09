// sadouqanas1@gmail.com

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://sadouqanas1:00nLXBR8kgHhX7Ag@cluster0.mtjdktz.mongodb.net/mission?retryWrites=true&w=majority")

const MissionsModel = require('./models/Missions')

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