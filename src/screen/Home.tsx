import { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import StyleConstants from "../StyleConstants";
import TrackerList from "../components/TrackerList";
import BottomMenu from "../components/BottomMenu";
import { createTracker } from "../api/trackers";
import { useTrackerContext } from "../context/trackContext";

export default function HomeScreen({ navigation, route }) {
  const { trackers, setTrackers } = useTrackerContext();
  const [trackerName, setTrackerName] = useState("");
  //TODO: better way to update tracker list after delete
  const { deletedTrackerId } = route.params || {};
  useEffect(() => {
    if (deletedTrackerId) {
      setTrackers(trackers.filter((t) => t._id !== deletedTrackerId));
    }
  }, [deletedTrackerId]);

  const onCreateTracker = async () => {
    const result = await createTracker(trackerName);
    if (!result.data.error) {
      setTrackers([...trackers, result.data]);
      setTrackerName("");
    } else {
      navigation.navigate("Signin");
    }
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
    marginTop: 8,
    paddingHorizontal: 16,
    paddingBottom: "35%",
  },
};
