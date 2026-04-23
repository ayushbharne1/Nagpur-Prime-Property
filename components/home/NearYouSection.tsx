import { View } from "react-native";
import SectionHeader from "../common/SectionHeader";
import PropertyList from "../property/PropertyList";
import { properties } from "@/constants/mockData";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function NearYouSection() {
  return (
    <Animated.View
      entering={FadeInDown.delay(400).duration(500).springify()}
      style={{ paddingHorizontal: 20, marginTop: 24, paddingBottom:10 }}
    >
      <SectionHeader
        title="Near You"
        subtitle="Properties in your area"
        onPressSeeAll={() => {}}
        
      />
      <PropertyList data={properties} horizontal  />
    </Animated.View>
  );
}