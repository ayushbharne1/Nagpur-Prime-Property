import { View, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

export default function SearchBar() {
  const { colors } = useTheme();

  return (
    <View className="px-4 mt-4">
      <View
        className="flex-row items-center px-3 py-2 rounded-xl"
        style={{ backgroundColor: colors.surface }}
      >
        <Ionicons name="search-outline" size={18} color={colors.textMuted} />

        <TextInput
          placeholder="Search by location, property type..."
          placeholderTextColor={colors.textMuted}
          className="ml-2 flex-1 text-sm"
        />
      </View>
    </View>
  );
}