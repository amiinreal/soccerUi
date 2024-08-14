require("dotenv").config();

const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDatabase();

app.get("/api/game/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const database = client.db("football_scores");
    const games = database.collection("games");
    const game = await games.findOne({ _id: gameId });
    res.json(game);
  } catch (error) {
    res.status(500).json({ error: "Error fetching game data" });
  }
});

app.put("/api/game/:id", async (req, res) => {
  try {
    const gameId = req.params.id;
    const { homeScore, awayScore } = req.body;
    const database = client.db("football_scores");
    const games = database.collection("games");
    await games.updateOne({ _id: gameId }, { $set: { homeScore, awayScore } });
    const updatedGame = await games.findOne({ _id: gameId });
    res.json(updatedGame);
    io.emit("scoreUpdate", updatedGame);
  } catch (error) {
    res.status(500).json({ error: "Error updating game data" });
  }
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
