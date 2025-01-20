/** @format */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getFirstTwoLetters, COLORS, moderateScale, FONT_SIZE } from "@/utils";

interface MessageProps {
  item: {
    id: number;
    message: string;
    email: string;
    user_id: string;
  };
  session: {
    user: {
      id: string;
    };
  } | null;
}

const Message: React.FC<MessageProps> = ({ item, session }) => {
  const isOwnPost = session?.user.id === item?.user_id;

  return (
    <View style={[{ alignItems: isOwnPost ? "flex-end" : "flex-start" }]}>
      <View
        style={[
          styles.post,
          {
            backgroundColor: isOwnPost ? COLORS.secondary : COLORS.lightGrey,
          },
        ]}
      >
        <Text style={styles.postText}>{item.message}</Text>
      </View>
      <View style={styles.profileTxtCont}>
        <Text>{getFirstTwoLetters(item.email)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  post: {
    padding: moderateScale(16),
    borderRadius: moderateScale(10),
  },
  postText: {
    fontSize: FONT_SIZE["16"],
    color: COLORS.black,
  },

  profileTxtCont: {
    backgroundColor: COLORS.lightGrey,
    padding: moderateScale(8),
    marginTop: moderateScale(10),
    borderRadius: moderateScale(100),
  },
});

export default Message;
