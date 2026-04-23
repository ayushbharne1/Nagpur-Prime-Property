import { View, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolateColor,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SearchBar() {
  const { colors } = useTheme();
  const focused = useSharedValue(0);
  const filterScale = useSharedValue(1);

  const containerStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      focused.value,
      [0, 1],
      [colors.border + "60", colors.primary]
    ),
  }));

  const filterAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: filterScale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(100).duration(500).springify()}
      style={{ paddingHorizontal: 20, marginTop: 16 }}
    >
      <Animated.View
        style={[
          containerStyle,
          {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 12,
            borderRadius: 16,
            backgroundColor: colors.surface,
            borderWidth: 1.5,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.06,
            shadowRadius: 12,
            elevation: 3,
          },
        ]}
      >
        <Ionicons name="search" size={20} color={colors.primary} />

        <TextInput
          placeholder="Search location, property..."
          placeholderTextColor={colors.textMuted}
          style={{
            flex: 1,
            marginLeft: 12,
            fontSize: 14,
            color: colors.text,
            fontWeight: "500",
            padding: 0,
          }}
          onFocus={() => {
            focused.value = withSpring(1);
          }}
          onBlur={() => {
            focused.value = withSpring(0);
          }}
        />

        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: colors.border + "60",
            marginHorizontal: 12,
          }}
        />

        <AnimatedPressable
          style={[
            filterAnimStyle,
            {
              backgroundColor: colors.primary,
              padding: 8,
              borderRadius: 10,
            },
          ]}
          onPressIn={() => {
            filterScale.value = withSpring(0.88);
          }}
          onPressOut={() => {
            filterScale.value = withSpring(1);
          }}
        >
          <Ionicons name="options-outline" size={16} color={colors.white} />
        </AnimatedPressable>
      </Animated.View>
    </Animated.View>
  );
}