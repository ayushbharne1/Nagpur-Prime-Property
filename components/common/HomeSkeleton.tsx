/**
 * HomeSkeleton
 * Mirrors the exact layout of the Home screen while data is loading.
 * Each section matches the real component's padding, height and spacing.
 */
import { View, ScrollView, Dimensions } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Shimmer from "./Shimmer";

const { width } = Dimensions.get("window");
const H_PAD = 20; // matches app-wide horizontal padding

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function ShimmerBox({
  width: w,
  height: h,
  radius = 8,
  style,
}: {
  width?: number | string;
  height: number;
  radius?: number;
  style?: any;
}) {
  const { colors } = useTheme();
  const shimmerColors = [
    colors.border + "50",
    colors.surface,
    colors.border + "50",
  ] as [string, string, string];

  return (
    <Shimmer
      shimmerColors={shimmerColors}
      style={[
        {
          width: w ?? "100%",
          height: h,
          borderRadius: radius,
        },
        style,
      ]}
    />
  );
}

// ---------------------------------------------------------------------------
// Section: SearchBar  (height ≈ 50, margin 16 top, h-pad 20)
// ---------------------------------------------------------------------------
function SearchBarSkeleton() {
  return (
    <View style={{ paddingHorizontal: H_PAD, marginTop: 16 }}>
      <ShimmerBox height={50} radius={16} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Section: CategoryTabs  (5 pill chips, h-scroll)
// ---------------------------------------------------------------------------
function CategoryTabsSkeleton() {
  const chips = [72, 88, 64, 96, 80]; // approximate widths
  return (
    <View
      style={{
        marginTop: 16,
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: H_PAD,
      }}
    >
      {chips.map((w, i) => (
        <ShimmerBox key={i} width={w} height={40} radius={16} />
      ))}
    </View>
  );
}

// ---------------------------------------------------------------------------
// Section: FeaturedCarousel  (section header + one big card + dots)
// ---------------------------------------------------------------------------
function FeaturedCarouselSkeleton() {
  const CARD_W = width - H_PAD * 2;

  return (
    <View style={{ marginTop: 20 }}>
      {/* Section header row */}
      <View
        style={{
          paddingHorizontal: H_PAD,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <View style={{ gap: 6 }}>
          <ShimmerBox width={160} height={16} radius={8} />
          <ShimmerBox width={100} height={11} radius={6} />
        </View>
        <ShimmerBox width={56} height={14} radius={6} />
      </View>

      {/* Featured card */}
      <View style={{ paddingLeft: H_PAD }}>
        <ShimmerBox width={CARD_W} height={210} radius={20} />
      </View>

      {/* Pagination dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 14,
          gap: 6,
        }}
      >
        <ShimmerBox width={24} height={8} radius={4} />
        <ShimmerBox width={8} height={8} radius={4} />
        <ShimmerBox width={8} height={8} radius={4} />
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Section: NearYou  (section header + 3 horizontal small cards)
// ---------------------------------------------------------------------------
function NearYouSkeleton() {
  return (
    <View style={{ paddingHorizontal: H_PAD, marginTop: 24 }}>
      {/* Section header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <View style={{ gap: 6 }}>
          <ShimmerBox width={90} height={16} radius={8} />
          <ShimmerBox width={140} height={11} radius={6} />
        </View>
        <ShimmerBox width={56} height={14} radius={6} />
      </View>

      {/* Horizontal small cards */}
      <View style={{ flexDirection: "row", gap: 14 }}>
        {[0, 1, 2].map((i) => (
          <View
            key={i}
            style={{
              width: 200,
              borderRadius: 18,
              overflow: "hidden",
            }}
          >
            <ShimmerBox width={200} height={130} radius={0} />
            <View
              style={{
                padding: 12,
                gap: 6,
              }}
            >
              <ShimmerBox width={80} height={14} radius={6} />
              <ShimmerBox width={130} height={12} radius={6} />
              <ShimmerBox width={100} height={11} radius={6} />
              {/* Tags */}
              <View style={{ flexDirection: "row", gap: 6, marginTop: 4 }}>
                <ShimmerBox width={60} height={24} radius={6} />
                <ShimmerBox width={72} height={24} radius={6} />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Section: "All Properties" header
// ---------------------------------------------------------------------------
function SectionHeaderSkeleton() {
  return (
    <View
      style={{
        paddingHorizontal: H_PAD,
        marginTop: 24,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 6 }}>
        <ShimmerBox width={130} height={16} radius={8} />
        <ShimmerBox width={180} height={11} radius={6} />
      </View>
      <ShimmerBox width={56} height={14} radius={6} />
    </View>
  );
}

// ---------------------------------------------------------------------------
// Section: Vertical PropertyCard skeleton  (matches PropertyCard vertical)
// ---------------------------------------------------------------------------
function PropertyCardSkeleton() {
  return (
    <View
      style={{
        marginHorizontal: H_PAD,
        marginBottom: 16,
        borderRadius: 20,
        overflow: "hidden",
      }}
    >
      {/* Image */}
      <ShimmerBox height={190} radius={0} />

      {/* Info block */}
      <View
        style={{
          padding: 16,
          gap: 8,
        }}
      >
        {/* Price row */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <ShimmerBox width={110} height={20} radius={8} />
        </View>
        {/* Title */}
        <ShimmerBox width="75%" height={15} radius={8} />
        {/* Location */}
        <ShimmerBox width="55%" height={13} radius={6} />
        {/* Tags */}
        <View style={{ flexDirection: "row", gap: 8, marginTop: 4 }}>
          <ShimmerBox width={76} height={28} radius={10} />
          <ShimmerBox width={90} height={28} radius={10} />
        </View>
      </View>
    </View>
  );
}

// ---------------------------------------------------------------------------
// Exported: Full Home Skeleton
// ---------------------------------------------------------------------------
export default function HomeSkeleton() {
  return (
    <ScrollView
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <SearchBarSkeleton />
      <CategoryTabsSkeleton />
      <FeaturedCarouselSkeleton />
      <NearYouSkeleton />
      <SectionHeaderSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
      <PropertyCardSkeleton />
    </ScrollView>
  );
}
