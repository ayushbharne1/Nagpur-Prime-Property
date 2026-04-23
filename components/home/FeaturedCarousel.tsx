import {
  View,
  FlatList,
  Dimensions,
  Text,
  Image,
  Pressable,
} from "react-native";
import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIDE_PADDING = 20;
// Card width fills the visible screen minus side padding
const CARD_WIDTH = width - SIDE_PADDING * 2;
// Gap between cards
const CARD_GAP = 12;
// Each "step" the list moves when going to the next card
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

// Auto-scroll interval in ms
const AUTO_SCROLL_DELAY = 3000;

// ─── Animated Dot ────────────────────────────────────────────────────────────
function Dot({ active, color, borderColor }: { active: boolean; color: string; borderColor: string }) {
  const widthVal = useSharedValue(active ? 24 : 8);
  const opacity = useSharedValue(active ? 1 : 0.4);

  useEffect(() => {
    widthVal.value = withTiming(active ? 24 : 8, {
      duration: 300,
      easing: Easing.out(Easing.quad),
    });
    opacity.value = withTiming(active ? 1 : 0.4, { duration: 300 });
  }, [active]);

  const style = useAnimatedStyle(() => ({
    width: widthVal.value,
    height: 8,
    borderRadius: 4,
    backgroundColor: active ? color : borderColor,
    opacity: opacity.value,
  }));

  return <Animated.View style={style} />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function FeaturedCarousel({ data }: any) {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const featuredData = data.filter((item: any) => item.badge);
  const total = featuredData.length;

  // ── Auto-scroll logic ──────────────────────────────────────────────────────
  const scrollToIndex = useCallback(
    (index: number) => {
      if (!flatListRef.current || total === 0) return;
      flatListRef.current.scrollToOffset({
        offset: index * SNAP_INTERVAL,
        animated: true,
      });
      setActiveIndex(index);
    },
    [total]
  );

  const startAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) clearInterval(autoScrollTimer.current);
    autoScrollTimer.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % total;
        flatListRef.current?.scrollToOffset({
          offset: next * SNAP_INTERVAL,
          animated: true,
        });
        return next;
      });
    }, AUTO_SCROLL_DELAY);
  }, [total]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
      autoScrollTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (total > 1) startAutoScroll();
    return () => stopAutoScroll();
  }, [total, startAutoScroll, stopAutoScroll]);

  // ── Snap / scroll tracking ─────────────────────────────────────────────────
  const handleMomentumScrollEnd = (e: any) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const i = Math.round(offsetX / SNAP_INTERVAL);
    setActiveIndex(Math.max(0, Math.min(i, total - 1)));
    // Restart auto-scroll after manual swipe
    startAutoScroll();
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(300).duration(500).springify()}
      style={{ marginTop: 20 }}
    >
      {/* Section Title */}
      <View
        style={{
          paddingHorizontal: SIDE_PADDING,
          marginBottom: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: colors.text,
              letterSpacing: -0.3,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Featured Properties
          </Text>
          <Text
            style={{ color: colors.textMuted, fontSize: 12, marginTop: 2 }}
          >
            Handpicked for you
          </Text>
        </View>

        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
        >
          <Text
            style={{
              color: colors.primary,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            View All
          </Text>
          <Ionicons name="arrow-forward" size={12} color={colors.primary} />
        </Pressable>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={featuredData}
        horizontal
        // Paging disabled — we use snapToInterval for precise per-card snapping
        pagingEnabled={false}
        snapToInterval={SNAP_INTERVAL}
        snapToAlignment="start"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        // Only left padding so offset math stays clean (right padding via marginRight on cards)
        contentContainerStyle={{ paddingLeft: SIDE_PADDING, paddingRight: SIDE_PADDING - CARD_GAP }}
        keyExtractor={(item) => item.id}
        // getItemLayout prevents scrollToOffset calculation issues
        getItemLayout={(_d, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        // Pause auto-scroll while user is dragging
        onScrollBeginDrag={stopAutoScroll}
        renderItem={({ item }) => (
          <View
            style={{
              width: CARD_WIDTH,
              marginRight: CARD_GAP,
              borderRadius: 20,
              overflow: "hidden",
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.12,
              shadowRadius: 16,
              elevation: 8,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: "100%", height: 210 }}
              resizeMode="cover"
            />

            {/* Gradient Overlay */}
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.75)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: 130,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
              }}
            />

            {/* Badge */}
            {item.badge && (
              <View
                style={{
                  position: "absolute",
                  top: 14,
                  left: 14,
                  backgroundColor: colors.primary,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Ionicons name="star" size={10} color={colors.white} />
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  {item.badge}
                </Text>
              </View>
            )}

            {/* Heart */}
            <Pressable
              style={{
                position: "absolute",
                top: 14,
                right: 14,
                backgroundColor: "rgba(255,255,255,0.9)",
                padding: 8,
                borderRadius: 12,
              }}
            >
              <Ionicons
                name="heart-outline"
                size={18}
                color={colors.primary}
              />
            </Pressable>

            {/* Info */}
            <View
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 18,
                  fontWeight: "800",
                  letterSpacing: -0.3,
                }}
              >
                ₹{item.price}
              </Text>
              <Text
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: 14,
                  fontWeight: "600",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 4,
                  gap: 4,
                }}
              >
                <Ionicons
                  name="location"
                  size={12}
                  color="rgba(255,255,255,0.8)"
                />
                <Text
                  style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}
                >
                  {item.location}
                </Text>
                {item.area && (
                  <>
                    <Text style={{ color: "rgba(255,255,255,0.5)" }}>•</Text>
                    <Text
                      style={{
                        color: "rgba(255,255,255,0.8)",
                        fontSize: 12,
                      }}
                    >
                      {item.area}
                    </Text>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      />

      {/* Pagination Dots */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 14,
          gap: 6,
        }}
      >
        {featuredData.map((_: any, i: number) => (
          <Pressable key={i} onPress={() => { stopAutoScroll(); scrollToIndex(i); startAutoScroll(); }}>
            <Dot
              active={activeIndex === i}
              color={colors.primary}
              borderColor={colors.border}
            />
          </Pressable>
        ))}
      </View>
    </Animated.View>
  );
}