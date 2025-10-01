import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

import ProfileScreen from "../profile";
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
  const router = useRouter();

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
            <LinearGradient
              colors={["#3FA7CC", "#5BB8D9"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradientButton}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/litigation-101')}
                activeOpacity={0.8}
              >
                <Ionicons name="book-outline" color="#FFFFFF" size={28} />
              </TouchableOpacity>
            </LinearGradient>
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
          name="profile"
          position="RIGHT"
          component={ProfileScreen}
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
    bottom: TAB_HEIGHT / 2,
    shadowColor: "#3FA7CC",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  gradientButton: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  tabbarItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
