import React, { useContext, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { LeagueContext } from "../App";

const LeagueTableScreen = () => {
  const { leagueData } = useContext(LeagueContext);
  const [sortedBy, setSortedBy] = useState("points");

  const sortedStandings = [...leagueData.standings].sort((a, b) => {
    if (sortedBy === "points") {
      return b.points - a.points;
    } else if (sortedBy === "goalsFor") {
      return b.goalsFor - a.goalsFor;
    }
    // ... add more sorting options
  });

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>{index + 1}</Text>
        <Text>{item.teamName}</Text>
        <Text>{item.matchesPlayed}</Text>
        <Text>{item.wins}</Text>
        <Text>{item.draws}</Text>
        <Text>{item.losses}</Text>
        <Text>{item.goalsFor}</Text>
        <Text>{item.goalsAgainst}</Text>
        <Text>{item.goalDifference}</Text>
        <Text>{item.points}</Text>
      </View>
    );
  };

  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        {/* Header with sortable columns */}
        <TouchableOpacity onPress={() => setSortedBy("points")}>
          <Text>Pts</Text>
        </TouchableOpacity>
        {/* ... other sortable columns */}
      </View>
      <FlatList
        data={sortedStandings}
        renderItem={renderItem}
        keyExtractor={(item) => item.teamId.toString()}
      />
    </View>
  );
};

export default LeagueTableScreen;
