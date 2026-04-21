import CategoryTabs from "@/components/home/CategoryTabs";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import Header from "@/components/home/Header";
import NearYouSection from "@/components/home/NearYouSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import SearchBar from "@/components/home/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import { properties } from "@/constants/mockData";
import { useTheme } from "@/hooks/useTheme";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background , paddingBottom: 80}}>
      <Header />

      <FlatList
        data={properties}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.background }}

        // 🔥 Top UI
        ListHeaderComponent={
          <View>
            <SearchBar />
            <CategoryTabs />
            <FeaturedCarousel data={properties} />

            {/* ✅ FIXED: Near You Header */}
            <NearYouSection />
          </View>
        }

        // 🔥 Property list
        renderItem={({ item }) => (
          <View className="px-4">
            <PropertyCard item={item} />
          </View>
        )}

        // 🔥 Bottom Section
        ListFooterComponent={
          <RecommendedSection data={properties} />
        }
      />
    </SafeAreaView>
  );
}