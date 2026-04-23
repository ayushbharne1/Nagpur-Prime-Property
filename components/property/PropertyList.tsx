import { FlatList, View } from "react-native";
import PropertyCard from "./PropertyCard";

type Props = {
  data: any[];
  horizontal?: boolean;
};

export default function PropertyList({ data, horizontal }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) =>
        item?.id?.toString() || index.toString()
      }
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: horizontal ? 16 : 0,
      }}
      renderItem={({ item }) => (
        <View style={{ marginBottom: horizontal ? 0 : 16 }}>
          <PropertyCard
            item={item}
            variant={horizontal ? "horizontal" : "vertical"}
          />
        </View>
      )}
    />
  );
}