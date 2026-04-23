import { View, FlatList, Dimensions, Text, Image } from "react-native";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const { width } = Dimensions.get("window");

export default function FeaturedCarousel({ data }: any) {
  const { colors } = useTheme();
  const [index, setIndex] = useState(0);

  return (
    <View className="mt-5">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const i = Math.round(e.nativeEvent.contentOffset.x / width);
          setIndex(i);
        }}
        renderItem={({ item }) => (
          <View style={{ width }} className="px-4">
            <Image
              source={{ uri: item.image }}
              className="w-full h-48 rounded-xl"
            />

            <View className="absolute bottom-4 left-6">
              <Text className="text-white font-bold text-lg">
                ₹{item.price}
              </Text>
              <Text className="text-white text-sm">
                {item.title}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-2">
        {data.map((_: any, i: number) => (
          <View
            key={i}
            className="mx-1 rounded-full"
            style={{
              width: index === i ? 8 : 6,
              height: index === i ? 8 : 6,
              backgroundColor:
                index === i ? colors.primary : colors.border,
            }}
          />
        ))}
      </View>
    </View>
  );
}