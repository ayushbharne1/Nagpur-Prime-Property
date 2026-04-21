import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function Header() {
  const { colors } = useTheme();

  return (
    <View className="px-4 flex-row justify-between items-center bg-white">
      <View className="py-6">
        <Text style={{ color: colors.text }} className="text-lg font-bold">
          PropertyConnect
        </Text>

        <View className="flex-row items-center mt-1">
          <Ionicons name="location-outline" size={14} color={colors.primary} />
          <Text
            style={{ color: colors.primary }}
            className="ml-1 text-xs font-medium"
          >
            Nagpur
          </Text>
        </View>
      </View>

      <Pressable className="p-2 rounded-full bg-gray-100">
        <Ionicons name="notifications-outline" size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}
