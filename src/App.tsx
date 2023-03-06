import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home";
import Signup from "./screen/Signup";
import StyleConstants from "./StyleConstants";
import Signin from "./screen/Signin";
import Tracker from "./screen/TrackerDetail";
import { TouchableHighlight, Text, Button } from "react-native";
import { deleteTracker } from "./api/trackers";
import { TrackerContextProvider } from "./context/trackContext";
const Stack = createNativeStackNavigator();
export default function App() {
  const onDeleteTracker = async (trackerId: string) => {
    const result = await deleteTracker(trackerId);
    if (result.data.error) {
      console.log("delete tracker error: ", result.data.error);
    }
  };

  return (
    <TrackerContextProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            options={({ navigation }) => ({
              headerStyle: { backgroundColor: StyleConstants.secondaryColor },
              headerTitleStyle: { fontWeight: "bold", color: "white" },
              headerTitleAlign: "center",
              headerRight: () => (
                <>
                  <Button
                    onPress={() => navigation.navigate("Signin")}
                    title="Sign In"
                  />
                  <Button
                    onPress={() => navigation.navigate("Signup")}
                    title="Sign up"
                  />
                </>
              ),
            })}
            component={HomeScreen}
          />
          <Stack.Screen
            options={{
              title: "Create Account",
              headerStyle: { backgroundColor: StyleConstants.primaryColor },
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center",
            }}
            name="Signup"
            component={Signup}
          />
          <Stack.Screen
            options={{
              title: "Sign In",
              headerStyle: { backgroundColor: StyleConstants.primaryColor },
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center",
            }}
            name="Signin"
            component={Signin}
          ></Stack.Screen>
          <Stack.Screen
            name="TrackerDetail"
            component={Tracker}
            options={({ route, navigation }) => ({
              title: route.params.trackerName,
              headerStyle: { backgroundColor: StyleConstants.secondaryColor },
              headerTitleStyle: { fontWeight: "bold" },
              headerTitleAlign: "center",
              headerRight: () => (
                <TouchableHighlight
                  onPress={() => {
                    onDeleteTracker(route.params.trackerId);
                    navigation.navigate("Home", {
                      deletedTrackerId: route.params.trackerId,
                    });
                  }}
                >
                  <Text
                    style={{
                      color: "red",
                      fontSize: StyleConstants.baseFontSize * 4,
                    }}
                  >
                    Delete
                  </Text>
                </TouchableHighlight>
              ),
            })}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </TrackerContextProvider>
  );
}
