import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import React from "react";

type Props = {
  item: any;
  variant?: "vertical" | "horizontal";
  isLiked?: boolean;
  onToggleLike?: () => void;
};

const PropertyCard = ({
  item,
  variant = "vertical",
  isLiked,
  onToggleLike,
}: Props) => {
  const { colors } = useTheme();

  if (variant === "horizontal") {
    return (
      <View className="w-[200px] mr-4">
        <Image
          source={{ uri: item.image }}
          className="w-full h-28 rounded-xl"
        />

        <Pressable
          onPress={onToggleLike}
          className="absolute top-2 right-2 bg-white rounded-full p-1"
        >
          <Ionicons
            name={isLiked ? "heart" : "heart-outline"}
            size={16}
            color={colors.primary}
          />
        </Pressable>

        <Text style={{ color: colors.primary }} className="mt-2 font-bold">
          ₹{item.price}
        </Text>

        <Text numberOfLines={1} style={{ color: colors.text }}>
          {item.title}
        </Text>

        <Text style={{ color: colors.textMuted }} className="text-xs">
          {item.location}
        </Text>
      </View>
    );
  }

  // 🔥 Vertical Card
  return (
    <View className="mb-4">
      <Image
        source={{ uri: item.image }}
        className="w-full h-44 rounded-xl"
      />

      <Pressable
        onPress={onToggleLike}
        className="absolute top-2 right-2 bg-white rounded-full p-2"
      >
        <Ionicons
          name={isLiked ? "heart" : "heart-outline"}
          size={18}
          color={colors.primary}
        />
      </Pressable>

      <Text style={{ color: colors.primary }} className="mt-2 font-bold">
        ₹{item.price}
      </Text>

      <Text style={{ color: colors.text }} className="font-medium">
        {item.title}
      </Text>

      <Text style={{ color: colors.textMuted }} className="text-xs">
        {item.location}
      </Text>
    </View>
  );
}
export default React.memo(PropertyCard);