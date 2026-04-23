import SkeletonCard from "@/components/common/SkeletonCard";
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
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
  const { colors } = useTheme();

  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 🔥 simulate API load
  useEffect(() => {
    setTimeout(() => {
      setData(properties);
      setIsLoading(false);
    }, 1000);
  }, []);

  // 🔥 lazy load
  const loadMore = () => {
    if (isLoading) return;

    setData((prev) => [...prev, ...properties]);
  };

  // 🔥 stable render
  const renderItem = useCallback(({ item }) => {
    return (
      <View className="px-4">
        <PropertyCard item={item} />
      </View>
    );
  }, []);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <Header />

      {isLoading ? (
        // 🔥 Skeleton Loading UI
        <View className="mt-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          showsVerticalScrollIndicator={false}

          // 🚀 PERFORMANCE
          initialNumToRender={5}
          maxToRenderPerBatch={5}
          windowSize={5}
          removeClippedSubviews

          // 🚀 LAZY LOAD
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}

          contentContainerStyle={{ paddingBottom: 100 }}

          // 🔥 HEADER
          ListHeaderComponent={
            <View>
              <SearchBar />
              <CategoryTabs />
              <FeaturedCarousel data={data} />
              <NearYouSection />
            </View>
          }

          // 🔥 LIST ITEMS
          renderItem={renderItem}

          // 🔥 FOOTER
          ListFooterComponent={
            <RecommendedSection data={data} />
          }
        />
      )}
    </SafeAreaView>
  );
}