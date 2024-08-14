//FootballLiveScoreApp
import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button, Alert } from "react-native";
import io from "socket.io-client";
import { fetchGameData, updateGameScore } from "./api";

const socket = io("http://localhost:3000/");

const FootballLiveScoreApp = ({ gameId }) => {
  const [gameData, setGameData] = useState({
    homeTeam: "Home Team",
    awayTeam: "Away Team",
    homeScore: 0,
    awayScore: 0,
  });

  useEffect(() => {
    const loadGameData = async () => {
      const data = await fetchGameData(gameId);
      if (data) {
        setGameData(data);
      }
    };

    loadGameData();

    socket.on("scoreUpdate", (updatedGame) => {
      if (updatedGame._id === gameId) {
        const scoringTeam =
          updatedGame.homeScore > gameData.homeScore
            ? updatedGame.homeTeam
            : updatedGame.awayScore > gameData.awayScore
            ? updatedGame.awayTeam
            : null;

        if (scoringTeam) {
          Alert.alert(
            "Goal!",
            `${scoringTeam} has scored!`,
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }

        setGameData(updatedGame);
      }
    });

    return () => {
      socket.off("scoreUpdate");
    };
  }, [gameId, gameData]);

  const handleScoreUpdate = async (team) => {
    const newHomeScore =
      team === "home" ? gameData.homeScore + 1 : gameData.homeScore;
    const newAwayScore =
      team === "away" ? gameData.awayScore + 1 : gameData.awayScore;
    await updateGameScore(gameId, newHomeScore, newAwayScore);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Football Live Scores</Text>
      <View style={styles.teamContainerBox}>
        <View style={styles.teamContainer}>
          <Image
            source={require("./assets/favicon.png")}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{gameData.homeTeam}</Text>
          <Text style={styles.score}>{gameData.homeScore}</Text>
          <Button title="Score" onPress={() => handleScoreUpdate("home")} />
        </View>
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>
        <View style={styles.teamContainer}>
          <Image
            source={require("./assets/favicon.png")}
            style={styles.teamLogo}
          />
          <Text style={styles.teamName}>{gameData.awayTeam}</Text>
          <Text style={styles.score}>{gameData.awayScore}</Text>
          <Button title="Score" onPress={() => handleScoreUpdate("away")} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  teamContainerBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  teamContainer: {
    alignItems: "center",
  },
  teamLogo: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  teamName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  score: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vsContainer: {
    alignItems: "center",
  },
  vsText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default FootballLiveScoreApp;
