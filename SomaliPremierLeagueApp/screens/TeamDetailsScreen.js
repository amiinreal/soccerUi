import React, { useContext } from "react";
import { View, Text, FlatList } from "react-native";
import { LeagueContext } from "../App";

const TeamDetailsScreen = ({ route }) => {
  const { leagueData } = useContext(LeagueContext);
  const { teamId } = route.params;
  const team = leagueData.teams.find((t) => t.id === teamId);

  return (
    <View>
      {/* Team header */}
      <View>
        <Text>{team.name}</Text>
        {/* Team logo */}
      </View>

      {/* Team squad */}
      <Text>Squad</Text>
      <FlatList
        data={team.players}
        renderItem={({ item }) => (
          <Text>
            {item.name} ({item.position})
          </Text>
        )}
        keyExtractor={(item) => item.id.toString()}
      />

      {/* Team statistics */}
      <Text>Statistics</Text>
      {/* Display overall, home, and away statistics */}

      {/* Upcoming fixtures */}
      <Text>Upcoming Matches</Text>
      {/* List of upcoming matches */}

      {/* Recent results */}
      <Text>Recent Results</Text>
      {/* List of recent results */}
    </View>
  );
};

export default TeamDetailsScreen;
