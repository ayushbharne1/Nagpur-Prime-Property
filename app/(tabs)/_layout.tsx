import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

const TAB_CONFIG: Record<
  string,
  { focused: IoniconName; outline: IoniconName }
> = {
  home: { focused: "home", outline: "home-outline" },
  search: { focused: "search", outline: "search-outline" },
  addProperty: { focused: "add", outline: "add" },
  saved: { focused: "heart", outline: "heart-outline" },
  profile: {
    focused: "person-circle",
    outline: "person-circle-outline",
  },
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
  const { colors } = useTheme();
  const config = TAB_CONFIG[routeName];
  if (!config) return null;

  const iconName: IoniconName = focused
    ? config.focused
    : config.outline;

  // 🔥 Center FAB
  if (routeName === "addProperty") {
    return (
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: focused
            ? colors.primaryDark
            : colors.primary,
          alignItems: "center",
          justifyContent: "center",
          marginTop: -24,
          borderWidth: 3,
          borderColor: colors.white,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: focused ? 0.6 : 0.35,
          shadowRadius: 16,
          elevation: focused ? 14 : 8,
        }}
      >
        <Ionicons name="add" size={28} color={colors.white} />
      </View>
    );
  }

  // 🔹 Normal Tabs
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: 42,
        height: 34,
        borderRadius: 12,
        backgroundColor: focused ? colors.primaryLight : "transparent",
      }}
    >
      <Ionicons name={iconName} size={22} color={color} />
    </View>
  );
}

export default function TabLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,

        tabBarStyle: {
          position: "absolute",
          bottom: Platform.OS === "ios" ? 26 : 14,
          left: 16,
          right: 16,
          borderRadius: 30,
          height: 72,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          paddingBottom: Platform.OS === "ios" ? 10 : 12,
          paddingTop: 8,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.08,
          shadowRadius: 24,
          elevation: 12,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 2,
        },

        tabBarIcon: ({ focused, color }) => (
          <TabIcon
            routeName={route.name}
            focused={focused}
            color={color}
          />
        ),
      })}
    >
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="search" options={{ title: "Search" }} />
      <Tabs.Screen
        name="addProperty"
        options={{ title: "" }}
      />
      <Tabs.Screen name="saved" options={{ title: "Saved" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}