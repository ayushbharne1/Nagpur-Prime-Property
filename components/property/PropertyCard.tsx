import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  item: any;
  variant?: "vertical" | "horizontal";
  isLiked?: boolean;
  onToggleLike?: () => void;
};

const PropertyCard = ({
  item,
  variant = "vertical",
  isLiked: externalLiked,
  onToggleLike,
}: Props) => {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const heartScale = useSharedValue(1);
  const [liked, setLiked] = useState(externalLiked ?? false);

  const cardAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const heartAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleLike = () => {
    heartScale.value = withSpring(1.4, {}, () => {
      heartScale.value = withSpring(1);
    });
    setLiked(!liked);
    onToggleLike?.();
  };

  if (variant === "horizontal") {
    return (
      <AnimatedPressable
        onPressIn={() => {
          scale.value = withSpring(0.96);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={[
          cardAnimStyle,
          {
            width: 200,
            marginRight: 14,
            borderRadius: 18,
            backgroundColor: colors.surface,
            shadowColor: colors.shadow,
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.08,
            shadowRadius: 12,
            elevation: 4,
            overflow: "hidden",
          },
        ]}
      >
        {/* Image */}
        <View style={{ position: "relative" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: "100%", height: 130, borderTopLeftRadius: 18, borderTopRightRadius: 18 }}
            resizeMode="cover"
          />

          {/* Gradient */}
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.3)"]}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 50,
            }}
          />

          {/* Heart Button */}
          <AnimatedPressable
            onPress={handleLike}
            style={[
              heartAnimStyle,
              {
                position: "absolute",
                top: 10,
                right: 10,
                backgroundColor: "rgba(255,255,255,0.92)",
                padding: 6,
                borderRadius: 10,
              },
            ]}
          >
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={14}
              color={liked ? colors.error : colors.primary}
            />
          </AnimatedPressable>

          {/* Badge */}
          {item.badge && (
            <View
              style={{
                position: "absolute",
                bottom: 8,
                left: 8,
                backgroundColor: colors.primary,
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontSize: 9,
                  fontWeight: "700",
                }}
              >
                {item.badge}
              </Text>
            </View>
          )}
        </View>

        {/* Info */}
        <View style={{ padding: 12 }}>
          <Text
            style={{
              color: colors.primary,
              fontWeight: "800",
              fontSize: 15,
              letterSpacing: -0.3,
            }}
          >
            ₹{item.price}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              color: colors.text,
              fontWeight: "600",
              fontSize: 13,
              marginTop: 3,
            }}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
              gap: 3,
            }}
          >
            <Ionicons name="location" size={11} color={colors.textMuted} />
            <Text
              style={{
                color: colors.textMuted,
                fontSize: 11,
              }}
              numberOfLines={1}
            >
              {item.location}
            </Text>
          </View>

          {/* Tags row */}
          {(item.bedrooms || item.area) && (
            <View
              style={{
                flexDirection: "row",
                marginTop: 8,
                gap: 6,
              }}
            >
              {item.bedrooms && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.primaryLight,
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    borderRadius: 6,
                    gap: 3,
                  }}
                >
                  <Ionicons name="bed-outline" size={10} color={colors.primary} />
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    {item.bedrooms} BHK
                  </Text>
                </View>
              )}
              {item.area && (
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.secondaryLight,
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    borderRadius: 6,
                    gap: 3,
                  }}
                >
                  <Ionicons name="resize-outline" size={10} color={colors.secondary} />
                  <Text
                    style={{
                      color: colors.secondary,
                      fontSize: 10,
                      fontWeight: "600",
                    }}
                  >
                    {item.area}
                  </Text>
                </View>
              )}
            </View>
          )}
        </View>
      </AnimatedPressable>
    );
  }

  // 🔥 Vertical Card (Full-width)
  return (
    <AnimatedPressable
      onPressIn={() => {
        scale.value = withSpring(0.97);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        cardAnimStyle,
        {
          marginBottom: 16,
          borderRadius: 20,
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: 8 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 5,
          overflow: "hidden",
        },
      ]}
    >
      {/* Image */}
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 190 }}
          resizeMode="cover"
        />

        {/* Gradient */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.35)"]}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
          }}
        />

        {/* Heart */}
        <AnimatedPressable
          onPress={handleLike}
          style={[
            heartAnimStyle,
            {
              position: "absolute",
              top: 14,
              right: 14,
              backgroundColor: "rgba(255,255,255,0.92)",
              padding: 8,
              borderRadius: 12,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 4,
              elevation: 3,
            },
          ]}
        >
          <Ionicons
            name={liked ? "heart" : "heart-outline"}
            size={18}
            color={liked ? colors.error : colors.primary}
          />
        </AnimatedPressable>

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
              borderRadius: 12,
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

        {/* Property type tag at bottom-right of image */}
        {item.type && (
          <View
            style={{
              position: "absolute",
              bottom: 12,
              right: 14,
              backgroundColor: "rgba(255,255,255,0.9)",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                color: colors.secondary,
                fontSize: 11,
                fontWeight: "700",
              }}
            >
              {item.type}
            </Text>
          </View>
        )}
      </View>

      {/* Info */}
      <View style={{ padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: "800",
              fontSize: 18,
              letterSpacing: -0.3,
            }}
          >
            ₹{item.price}
          </Text>
        </View>

        <Text
          style={{
            color: colors.text,
            fontWeight: "700",
            fontSize: 15,
            marginTop: 4,
            letterSpacing: -0.2,
          }}
          numberOfLines={1}
        >
          {item.title}
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 6,
            gap: 4,
          }}
        >
          <Ionicons name="location" size={13} color={colors.textMuted} />
          <Text
            style={{
              color: colors.textMuted,
              fontSize: 12,
              fontWeight: "500",
            }}
          >
            {item.location}
          </Text>
        </View>

        {/* Tags */}
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            gap: 8,
          }}
        >
          {item.bedrooms && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.primaryLight,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                gap: 4,
              }}
            >
              <Ionicons name="bed-outline" size={13} color={colors.primary} />
              <Text
                style={{
                  color: colors.primary,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                {item.bedrooms} BHK
              </Text>
            </View>
          )}
          {item.area && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.secondaryLight,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
                gap: 4,
              }}
            >
              <Ionicons name="resize-outline" size={13} color={colors.secondary} />
              <Text
                style={{
                  color: colors.secondary,
                  fontSize: 11,
                  fontWeight: "700",
                }}
              >
                {item.area}
              </Text>
            </View>
          )}
        </View>
      </View>
    </AnimatedPressable>
  );
};

export default React.memo(PropertyCard);