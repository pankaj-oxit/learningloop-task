/** @format */

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { supabase } from "../../utils/supabase";
import { Button, InputField, Message } from "@/components/ui";
import {
  COLORS,
  FONT_SIZE,
  getFirstTwoLetters,
  globalStyles,
  moderateScale,
} from "@/utils";
import { useUser } from "@/context/UserContext";
import { FontAwesome } from "@expo/vector-icons";

export default function PostFeed() {
  const [posts, setPosts] = useState([]);
  const [message, setMessage] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { session } = useUser();

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      setPosts(data);
    } catch (error: any) {
      Alert.alert("Error Fetching Posts", error.message);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  }, []);

  const handlePost = async () => {
    if (!message.trim()) return;
    try {
      const { error } = await supabase.from("posts").insert([
        {
          message: message,
          user_id: session?.user.id,
          email: session?.user.email,
        },
      ]);
      if (error) throw error;
      setMessage("");
    } catch (error: any) {
      console.log(error);
      Alert.alert("Error Posting Message", error.message);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  useEffect(() => {
    fetchPosts();

    const subscription = supabase
      .channel("realtime:public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prev) => [payload.new, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={[globalStyles.flexSpaceBetweenRow, styles.titleCont]}>
        <Text style={styles.title}>{session?.user.email}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={handleLogout}>
          <FontAwesome name='sign-out' size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        contentContainerStyle={styles.listCont}
        showsVerticalScrollIndicator={false}
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Message item={item} session={session} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
          />
        }
      />
      <View style={styles.inputCont}>
        <InputField
          placeholder='Write a post...'
          value={message}
          onChangeText={setMessage}
        />
        <Button title='Post' onPress={handlePost} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(30),
  },
  inputCont: { gap: moderateScale(16), paddingTop: moderateScale(10) },

  listCont: {
    gap: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  titleCont: {
    paddingVertical: moderateScale(16),
    borderBottomWidth: moderateScale(1),
    borderBottomColor: COLORS.lightGrey,
  },
  title: {
    fontSize: FONT_SIZE["18"],
    fontWeight: 700,
    color: COLORS.primary,
  },
});
