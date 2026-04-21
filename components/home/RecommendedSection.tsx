import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";
import PropertyList from "../property/PropertyList";

export default function RecommendedSection({ data }: any) {
  return (
    <View className="px-4 mt-4">
      <SectionHeader title="Recommended For You" />
      <PropertyList data={data} horizontal />
    </View>
  );
}