import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import SearchOverlay from "./SearchOverlay";
import { router } from "expo-router";

export default function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* Hamburger Menu */}
        <TouchableOpacity>
          <Ionicons 
            name="menu" 
            size={30} 
            color="white" 
          />
        </TouchableOpacity>


        {/* App Title */}
        <Text style={styles.title}>
          Movie
        </Text>


        {/* Search Icon */}
        <TouchableOpacity
          onPress={() => router.push("/search")}
        >
          <Ionicons
            name="search"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <SearchOverlay
          visible={showSearch}
          onClose={() => setShowSearch(false)}
        />

      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#171717",
  },

  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },

  title: {
    color: "white",
    fontSize: 26,
    fontWeight: "bold",
  },
});