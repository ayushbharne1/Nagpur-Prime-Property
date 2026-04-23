import HomeSkeleton from "@/components/common/HomeSkeleton";
import CategoryTabs from "@/components/home/CategoryTabs";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import Header from "@/components/home/Header";
import NearYouSection from "@/components/home/NearYouSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import SearchBar from "@/components/home/SearchBar";
import PropertyCard from "@/components/property/PropertyCard";
import { properties } from "@/constants/mockData";
import { useTheme } from "@/hooks/useTheme";
import { useCallback, useState, useEffect } from "react";
import { FlatList, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInUp } from "react-native-reanimated";
import SectionHeader from "@/components/common/SectionHeader";

export default function Home() {
  const { colors } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 simulate API load
  useEffect(() => {
    setTimeout(() => {
      setData(properties);
      setIsLoading(false);
    }, 1200);
  }, []);

  // 🔥 stable render
  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <Animated.View
          entering={FadeInUp.delay(index * 100)
            .duration(400)
            .springify()}
          style={{ paddingHorizontal: 20 }}
        >
          <PropertyCard item={item} />
        </Animated.View>
      );
    },
    []
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar style="dark" />
      <Header />

      {isLoading ? (
        // 🔥 Skeleton Loading UI — mirrors the full home screen layout
        <HomeSkeleton />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          showsVerticalScrollIndicator={false}

          // 🚀 PERFORMANCE
          initialNumToRender={4}
          maxToRenderPerBatch={4}
          windowSize={5}
          removeClippedSubviews

          contentContainerStyle={{ paddingBottom: 120 }}

          // 🔥 HEADER
          ListHeaderComponent={
            <View>
              <SearchBar />
              <CategoryTabs />
              <FeaturedCarousel data={data} />
              <NearYouSection />

              {/* All Properties section title */}
              <View style={{ paddingHorizontal: 20, marginTop: 24, marginBottom: 8 }}>
                <SectionHeader
                  title="All Properties"
                  subtitle="Browse our complete listing"
                  onPressSeeAll={() => {}}
                />
              </View>
            </View>
          }

          // 🔥 LIST ITEMS
          renderItem={renderItem}

          // 🔥 FOOTER
          ListFooterComponent={<RecommendedSection data={data} />}
        />
      )}
    </SafeAreaView>
  );
}