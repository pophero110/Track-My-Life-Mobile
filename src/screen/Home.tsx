import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { StyleConstants } from "../StyleConstants";
import TrackerList from "../components/TrackerList";
import BottomMenu from "../components/BottomMenu";
import { createTracker } from "../api/trackers";

export default function HomeScreen({ navigation }) {
  const [trackers, setTrackers] = useState([]);
  const [trackerName, setTrackerName] = useState("");

  const onCreateTracker = async () => {
    const result = await createTracker(trackerName);
    if (!result.data.error) {
      setTrackers([...trackers, result.data]);
      setTrackerName("");
    } else {
      navigation.navigate("Signin");
    }
    console.log(result);
  };

  return (
    <>
      <ScrollView style={styles.homeScreen}>
        <View style={styles.sectionContainer}>
          <TrackerList
            navigation={navigation}
            setTrackers={setTrackers}
            trackers={trackers}
          ></TrackerList>
        </View>
      </ScrollView>
      <BottomMenu
        trackerName={trackerName}
        onCreateTracker={onCreateTracker}
        setTrackerName={setTrackerName}
        navigation={navigation}
        trackers={trackers}
      ></BottomMenu>
    </>
  );
}

const styles = {
  homeScreen: {
    backgroundColor: StyleConstants.primaryColor,
  },
  sectionContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingBottom: "35%",
  },
};
