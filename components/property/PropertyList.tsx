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
        // paddingRight: horizontal ? 20 : 0,
        // backgroundColor: "red",
        paddingVertical: 10,
      }}
      renderItem={({ item }) => (
        <PropertyCard
          item={item}
          variant={horizontal ? "horizontal" : "vertical"}
        />
      )}
    />
  );
}