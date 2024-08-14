//app.js
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import FootballLiveScoreApp from "./FootballLiveScoreApp";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <FootballLiveScoreApp gameId="game1" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
