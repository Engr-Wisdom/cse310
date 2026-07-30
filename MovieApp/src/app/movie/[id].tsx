import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";

import { IMAGE_URL } from "../../api/apiConfig";
import {
  getMovieDetails,
  getMovieVideos,
  getMovieCredits,
} from "../../services/movieService";

import TrailerPlayer from "../../components/TrailerPlayer";

import { FlatList } from "react-native";
import CastCard from "../../components/CastCard";

export default function MovieDetails() {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState<any>(null);
  const [videoKey, setVideoKey] = useState("");
  const [showPlayer, setShowPlayer] = useState(false);
  const [cast, setCast] = useState<any[]>([]);

  useEffect(() => {
    loadMovie();
  }, []);

  const loadMovie = async () => {
    try {
      const movieData = await getMovieDetails(
        id.toString()
      );

      const creditData = await getMovieCredits(
        id.toString()
      );

      setMovie(movieData);
      setCast(creditData.cast.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };

  const playTrailer = async () => {
    try {
      const data = await getMovieVideos(id.toString());

      const trailer = data.results.find(
        (item: any) =>
          item.site === "YouTube" &&
          item.type === "Trailer"
      );

      if (!trailer) {
        alert("Trailer not available.");
        return;
      }

      if (Platform.OS === "web") {
        window.open(
          `https://www.youtube.com/watch?v=${trailer.key}`,
          "_blank"
        );
      } else {
        setVideoKey(trailer.key);
        setShowPlayer(true);
      }
    } catch (error) {
      console.log(error);
    }
};

  if (!movie) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Loading movie details...
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{
            uri: IMAGE_URL + movie.backdrop_path,
          }}
          style={styles.backdrop}
        >
          <SafeAreaView>
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => router.back()}
              >
                <Ionicons
                  name="arrow-back"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.iconButton}>
                <Ionicons
                  name="heart-outline"
                  size={26}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.content}>
          <Image
            source={{
              uri: IMAGE_URL + movie.poster_path,
            }}
            style={styles.poster}
          />

          <Text style={styles.title}>
            {movie.title}
          </Text>

          <Text style={styles.meta}>
            ⭐ {movie.vote_average?.toFixed(1)} •{" "}
            {movie.release_date?.substring(0, 4)}
          </Text>

          <Text style={styles.heading}>
            Overview
          </Text>

          <Text style={styles.description}>
            {movie.overview}
          </Text>

          <View style={styles.castContainer}>
            <Text style={styles.heading}>Cast</Text>

            <FlatList
              horizontal
              data={cast}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CastCard actor={item} />
              )}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <TouchableOpacity
            style={styles.watchButton}
            onPress={playTrailer}
          >
            <Ionicons
              name="play"
              size={22}
              color="white"
            />

            <Text style={styles.watchText}>
              Watch Trailer
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {Platform.OS !== "web" && (
        <TrailerPlayer
          visible={showPlayer}
          videoKey={videoKey}
          onClose={() => setShowPlayer(false)}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#171717",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#ffffff",
    fontSize: 18,
  },

  container: {
    flex: 1,
    backgroundColor: "#171717",
  },

  backdrop: {
    width: "100%",
    height: 320,
    justifyContent: "space-between",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  iconButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 25,
  },

  content: {
    marginTop: -70,
    alignItems: "center",
    paddingHorizontal: 20,
  },

  poster: {
    width: 180,
    height: 270,
    borderRadius: 20,
    marginBottom: 20,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },

  meta: {
    color: "#bbbbbb",
    marginTop: 8,
    fontSize: 16,
  },

  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 30,
    marginBottom: 10,
  },

  description: {
    color: "#d0d0d0",
    lineHeight: 24,
    fontSize: 16,
  },

  watchButton: {
    marginTop: 30,
    marginBottom: 50,
    backgroundColor: "#E50914",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 12,
    width: "100%",
  },

  watchText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 10,
  },

  castContainer: {
    width: "100%",
    marginTop: 20,
  },
});