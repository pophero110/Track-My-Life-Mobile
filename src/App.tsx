import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/Home";
import Signup from "./screen/Signup";
import { StyleConstants } from "./StyleConstants";
import Signin from "./screen/Signin";
import Tracker from "./screen/Tracker";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{
            headerStyle: { backgroundColor: StyleConstants.secondaryColor },
            headerTitleStyle: { fontWeight: "bold", color: "white" },
            headerTitleAlign: "center",
          }}
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
          name="Tracker"
          component={Tracker}
          options={({ route }) => ({
            title: route.params.tracker.name,
            headerTitleStyle: { fontWeight: "bold" },
            headerTitleAlign: "center",
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
