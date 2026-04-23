import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function Header() {
  const { colors } = useTheme();
  const bellScale = useSharedValue(1);

  const bellAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bellScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      style={{
        backgroundColor: colors.backgroundLight,
        borderBottomWidth: 1,
        borderBottomColor: colors.border + "40",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      {/* Left: Logo + Name */}
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 16 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            backgroundColor: colors.primary,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 10,
          }}
        >
          <Ionicons name="home" size={18} color={colors.white} />
        </View>
        <View>
          <Text
            style={{
              color: colors.text,
              letterSpacing: -0.5,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            NagpurPrime
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 2 }}>
            <Ionicons name="location" size={11} color={colors.primary} />
            <Text
              style={{
                color: colors.primary,
                marginLeft: 2,
                fontSize: 11,
                fontWeight: "600",
              }}
            >
              Nagpur, Maharashtra
            </Text>
          </View>
        </View>
      </View>

      {/* Right: Notification Bell */}
      <AnimatedPressable
        style={[
          bellAnimatedStyle,
          {
            padding: 10,
            borderRadius: 14,
            backgroundColor: colors.primaryLight,
          },
        ]}
        onPressIn={() => {
          bellScale.value = withSpring(0.88);
        }}
        onPressOut={() => {
          bellScale.value = withSpring(1);
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.primary}
        />
        {/* Notification badge dot */}
        <View
          style={{
            position: "absolute",
            top: 8,
            right: 9,
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: colors.error,
            borderWidth: 1.5,
            borderColor: colors.primaryLight,
          }}
        />
      </AnimatedPressable>
    </Animated.View>
  );
}
