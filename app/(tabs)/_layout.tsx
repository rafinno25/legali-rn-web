import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Alert, Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";

import SettingsScreen from "../settings";
import HomeTab from "./index";

const TAB_HEIGHT = 55;
const CIRCLE_SIZE = 50;

const renderIcon = (routeName: string, selectedTab: string) => {
  const icon = routeName === "home" ? "document-text-outline" : "person-outline";
  const color = routeName === selectedTab ? "#1B2745" : "#9AA8C5";
  return <Ionicons name={icon} size={26} color={color} />;
};

const renderTabBar = ({ routeName, selectedTab, navigate }: { routeName: string; selectedTab: string; navigate: (routeName: string) => void }) => (
  <TouchableOpacity
    onPress={() => navigate(routeName)}
    style={styles.tabbarItem}
    accessibilityRole="button"
    accessibilityLabel={routeName}
  >
    {renderIcon(routeName, selectedTab)}
  </TouchableOpacity>
);

export default function TabsLayout() {
  return (
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shadow}
      height={TAB_HEIGHT}
      circleWidth={CIRCLE_SIZE}
      bgColor="#FFFFFF"
      initialRouteName="home"
      borderTopLeftRight
      width={undefined}
      borderColor="#E0E0E0"
      borderWidth={0}
      id="main-tab-navigator"
      circlePosition="CENTER"
      backBehavior="history"
      screenListeners={{}}
      screenOptions={{
        headerShown: false,
      }}
      defaultScreenOptions={{
        headerShown: false,
      }}
      renderCircle={({ navigate }: { navigate: (routeName: string) => void }) => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Action", "Floating button tapped")}
          >
            <Ionicons name="apps-sharp" color="#7786A9" size={26} />
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      <CurvedBottomBarExpo.Screen
        name="home"
        position="LEFT"
        component={HomeTab}
      />
      <CurvedBottomBarExpo.Screen
        name="settings"
        position="RIGHT"
        component={SettingsScreen}
      />
    </CurvedBottomBarExpo.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#DDDDDD",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  bottomBar: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnCircleUp: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F2F4FF",
    bottom: TAB_HEIGHT / 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
