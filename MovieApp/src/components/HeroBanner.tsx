import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Carousel } from "react-native-reanimated-carousel";

import { heroMovies } from "../data/heroMovies";

const { width } = Dimensions.get("window");

export default function HeroBanner() {
  return (
    <View style={styles.container}>
      <Carousel
        data={heroMovies}
        loop
        autoplay
        autoplayInterval={4000}
        // scrollAnimationDuration={1000}
        style={styles.carousel}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.image }}
            style={styles.banner}
            imageStyle={styles.image}
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.6)", "#171717"]}
              style={styles.overlay}
            >
              <View style={styles.content}>
                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.description}>
                  {item.description}
                </Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  carousel: {
    width: width,
    height: 430,
  },

  banner: {
    width: width,
    height: 450,
    justifyContent: "flex-end",
  },

  image: {
    resizeMode: "cover",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 25,
    paddingBottom: 40,
  },

  content: {
    width: "85%",
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    color: "#ddd",
    fontSize: 16,
    lineHeight: 24,
  },
});