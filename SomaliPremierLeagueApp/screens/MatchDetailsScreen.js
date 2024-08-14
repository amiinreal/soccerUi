import React, { useContext } from "react";
import { View, Text } from "react-native";
import { LeagueContext } from "../App";

const MatchDetailsScreen = ({ route }) => {
  const { leagueData } = useContext(LeagueContext);
  const { matchId } = route.params;
  const match = leagueData.matches.find((m) => m.id === matchId);

  return (
    <View>
      <Text>
        Match: {match.homeTeam} vs {match.awayTeam}
      </Text>
      <Text>Score: {match.score}</Text>
      {/* ... other match details */}
    </View>
  );
};

export default MatchDetailsScreen;
