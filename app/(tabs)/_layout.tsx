import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_CONFIG: Record<
  string,
  { focused: IoniconName; outline: IoniconName }
> = {
  home:        { focused: "home",          outline: "home-outline"          },
  leads:       { focused: "people",        outline: "people-outline"        },
  addProperty: { focused: "add",           outline: "add"                   },
  plans:       { focused: "card",          outline: "card-outline"          },
  profile:     { focused: "person-circle", outline: "person-circle-outline" },
};

function TabIcon({
  routeName,
  focused,
  color,
}: {
  routeName: string;
  focused: boolean;
  color: string;
}) {
  const config = TAB_CONFIG[routeName];
  if (!config) return null;

  const iconName: IoniconName = focused ? config.focused : config.outline;

  // ── Centre FAB ──────────────────────────────────────────────────────────────
  if (routeName === "addProperty") {
    return (
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 26,
          backgroundColor: focused ? "#EA580C" : "#F97316",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -22,
          borderWidth: 3.5,
          borderColor: "#FFFFFF",
          shadowColor: "#F97316",
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: focused ? 0.55 : 0.35,
          shadowRadius: 14,
          elevation: focused ? 14 : 8,
        }}
      >
        {/* inner highlight shimmer */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 22,
            borderTopLeftRadius: 22,
            borderTopRightRadius: 22,
            backgroundColor: "rgba(255,255,255,0.18)",
          }}
        />
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </View>
    );
  }

  // ── Regular tab icon ────────────────────────────────────────────────────────
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 42,
        height: 32,
        borderRadius: 11,
        backgroundColor: focused ? "#FFF7ED" : "transparent",
      }}
    >
      <Ionicons name={iconName} size={21} color={color} />
      {/* {focused && (
        <View
          style={{
            position: "absolute",
            bottom: -6,
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: "#F97316",
          }}
        />
      )} */}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#F97316",
        tabBarInactiveTintColor: "#B0B8C1",

        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 26 : 14,
          left: 18,
          right: 18,
          borderRadius: 28,
          height: 70,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 0,
          borderWidth: 1,
          borderColor: "#F3F4F6",
          paddingBottom: Platform.OS === "ios" ? 10 : 12,
          paddingTop: 8,
          paddingHorizontal: 4,
          shadowColor: "#1E293B",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.1,
          shadowRadius: 28,
          elevation: 16,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: 0.15,
          marginTop: 2,
        },

        tabBarShowLabel: true,

        tabBarIcon: ({ focused, color }) => (
          <TabIcon routeName={route.name} focused={focused} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="home"        options={{ title: "Home" }}    />
      <Tabs.Screen name="leads"       options={{ title: "Leads" }}   />
      <Tabs.Screen name="addProperty" options={{ title: "Add Property" }}     />
      <Tabs.Screen name="plans"       options={{ title: "Plans" }}   />
      <Tabs.Screen name="profile"     options={{ title: "Profile" }} />
    </Tabs>
  );
}