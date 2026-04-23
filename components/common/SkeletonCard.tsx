import { View } from "react-native";
import Shimmer from "./Shimmer";
import { useTheme } from "@/hooks/useTheme";

export default function SkeletonCard() {
  const { colors } = useTheme();

  return (
    <View className="px-4 mb-4">
      <Shimmer
        shimmerColors={[
          colors.border,
          colors.surface,
          colors.border,
        ]}
        style={{
          height: 180,
          borderRadius: 12,
          marginBottom: 10,
        }}
      />

      <Shimmer
        shimmerColors={[
          colors.border,
          colors.surface,
          colors.border,
        ]}
        style={{
          height: 16,
          width: "30%",
          borderRadius: 6,
          marginBottom: 6,
        }}
      />

      <Shimmer
        shimmerColors={[
          colors.border,
          colors.surface,
          colors.border,
        ]}
        style={{
          height: 14,
          width: "70%",
          borderRadius: 6,
          marginBottom: 6,
        }}
      />

      <Shimmer
        shimmerColors={[
          colors.border,
          colors.surface,
          colors.border,
        ]}
        style={{
          height: 12,
          width: "50%",
          borderRadius: 6,
        }}
      />
    </View>
  );
}