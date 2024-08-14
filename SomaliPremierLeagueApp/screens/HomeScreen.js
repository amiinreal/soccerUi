import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LeagueContext } from "../App";

const HomeScreen = () => {
  const { leagueData } = useContext(LeagueContext);

  return (
    <View>
      {/* Upcoming matches */}
      {leagueData.matches.map((match) => (
        <View key={match.id}>
          <Text>
            {match.homeTeam} vs {match.awayTeam}
          </Text>
        </View>
      ))}

      {/* Live scores */}
      {/* Featured match */}
    </View>
  );
};

export default HomeScreen;
