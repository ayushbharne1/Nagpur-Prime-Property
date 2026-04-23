import { ScrollView, Text, Pressable, View } from "react-native";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { categories } from "@/constants/mockData";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CategoryTabs() {
  const { colors } = useTheme();
  const [active, setActive] = useState("all");

  return (
    <Animated.View
      entering={FadeInDown.delay(200).duration(500).springify()}
      style={{ marginTop: 16 }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}
      >
        {categories.map((item) => {
          const isActive = active === item.id;

          return (
            <CategoryChip
              key={item.id}
              item={item}
              isActive={isActive}
              colors={colors}
              onPress={() => setActive(item.id)}
            />
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}

function CategoryChip({
  item,
  isActive,
  colors,
  onPress,
}: {
  item: { id: string; label: string; icon: string };
  isActive: boolean;
  colors: any;
  onPress: () => void;
}) {
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.92);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        animStyle,
        {
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 16,
          backgroundColor: isActive ? colors.primary : colors.surface,
          borderWidth: 1.5,
          borderColor: isActive ? colors.primary : colors.border + "50",
          shadowColor: isActive ? colors.primary : colors.shadow,
          shadowOffset: { width: 0, height: isActive ? 4 : 2 },
          shadowOpacity: isActive ? 0.25 : 0.04,
          shadowRadius: isActive ? 8 : 4,
          elevation: isActive ? 6 : 1,
          gap: 6,
        },
      ]}
    >
      <Ionicons
        name={item.icon as any}
        size={16}
        color={isActive ? colors.white : colors.textMuted}
      />
      <Text
        style={{
          color: isActive ? colors.white : colors.text,
          fontWeight: "600",
          fontSize: 13,
        }}
      >
        {item.label}
      </Text>
    </AnimatedPressable>
  );
}