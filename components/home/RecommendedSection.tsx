import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";
import PropertyList from "../property/PropertyList";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function RecommendedSection({ data }: any) {
  return (
    <Animated.View
      entering={FadeInDown.delay(500).duration(500).springify()}
      style={{ paddingHorizontal: 20, marginTop: 24 }}
    >
      <SectionHeader
        title="Recommended For You"
        subtitle="Based on your interests"
      />
      <PropertyList data={data} horizontal />
    </Animated.View>
  );
}