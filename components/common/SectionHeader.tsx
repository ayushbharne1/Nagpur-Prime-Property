import { View, Text, Pressable } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title: string;
  onPressSeeAll?: () => void;
};

export default function SectionHeader({ title, onPressSeeAll }: Props) {
  const { colors } = useTheme();

  return (
    <View className="flex-row justify-between items-center mb-3">
      <Text style={{ color: colors.text }} className="text-base font-semibold">
        {title}
      </Text>

      {onPressSeeAll && (
        <Pressable onPress={onPressSeeAll}>
          <Text style={{ color: colors.primary }} className="text-xs font-semibold">
            See All
          </Text>
        </Pressable>
      )}
    </View>
  );
}