import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";

export default function NearYouSection() {
  return (
    <View className="px-4 mt-4">
      <SectionHeader title="Near You" onPressSeeAll={() => {}} />
    </View>
  );
}