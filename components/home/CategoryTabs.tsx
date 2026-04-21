import { ScrollView, Text, Pressable, View } from "react-native";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const categories = ["All", "Flat", "Plot", "Villa"];

export default function CategoryTabs() {
  const { colors } = useTheme();
  const [active, setActive] = useState("All");

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="mt-4 px-4"
    >
      {categories.map((item) => {
        const isActive = active === item;

        return (
          <Pressable
            key={item}
            onPress={() => setActive(item)}
            className="mr-3 px-4 py-2 rounded-full"
            style={{
              backgroundColor: isActive
                ? colors.primary
                : colors.surface,
            }}
          >
            <Text
              style={{
                color: isActive ? colors.white : colors.text,
              }}
              className="text-sm font-medium"
            >
              {item}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}