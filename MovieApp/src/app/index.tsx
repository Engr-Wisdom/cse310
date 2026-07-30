import { ScrollView, StyleSheet } from "react-native";

import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import TrendingMovies from "../components/TrendingMovies";
import TopRatedMovies from "../components/TopRatedMovies";
import PopularMovies from "../components/PopularMovies";
import UpcomingMovies from "../components/UpcomingMovies";

export default function Index() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Navbar />
      <HeroBanner />
      <TrendingMovies />
      <TopRatedMovies />
      <PopularMovies />
      <UpcomingMovies />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171717",
  },
});