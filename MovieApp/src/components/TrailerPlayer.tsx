import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  videoKey: string;
  onClose: () => void;
};

export default function TrailerPlayer({
  visible,
  videoKey,
  onClose,
}: Props) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={onClose}
        >
          <Ionicons
            name="close"
            size={28}
            color="white"
          />
        </TouchableOpacity>

        <WebView
          source={{
            uri: `https://www.youtube.com/embed/${videoKey}?autoplay=1`,
          }}
          allowsFullscreenVideo
          javaScriptEnabled
          domStorageEnabled
          mediaPlaybackRequiresUserAction={false}
          style={styles.webview}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 999,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 30,
  },

  webview: {
    flex: 1,
    marginTop: 100,
  },
});