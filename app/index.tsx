/** @format */

import { useUser } from "@/context/UserContext";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import PostFeed from "./(tabs)/post-feed";
import AuthScreen from "./auth";

export default function HomeScreen() {
  const { session, loading } = useUser();

  return (
    <View style={styles.container}>
      {!session?.access_token && !loading ? <AuthScreen /> : <PostFeed />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
