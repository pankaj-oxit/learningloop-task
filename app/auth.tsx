/** @format */

import { Button, InputField } from "@/components/ui";
import { useUser } from "@/context/UserContext";
import { COLORS, FONT_FAMILIES, FONT_SIZE, moderateScale } from "@/utils";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { supabase } from "../utils/supabase";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const { setSession } = useUser();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        Alert.alert(
          "Success",
          "Account created! Please check your email to confirm your account before logging in."
        );
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          if (error.message.includes("email not confirmed")) {
            Alert.alert(
              "Email Not Confirmed",
              "Please confirm your email before logging in. If you didn't receive the confirmation email, click below to resend it.",
              [
                {
                  text: "Resend Confirmation Email",
                  onPress: resendConfirmationEmail,
                },
                { text: "Cancel", style: "cancel" },
              ]
            );
          } else {
            throw error;
          }
        } else {
          setSession(data.session);
        }
      }
    } catch (error: any) {
      Alert.alert("Authentication Failed", error.message);
    }
  };

  const resendConfirmationEmail = async () => {
    try {
      const { error } = await supabase.auth.resend({ email });
      if (error) throw error;
      Alert.alert(
        "Success",
        "Confirmation email has been resent. Please check your inbox."
      );
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{isSignUp ? "Sign Up" : "Log In"}</Text>
      <View style={styles.inputCont}>
        <InputField
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          value={email}
          onChangeText={setEmail}
        />

        <InputField
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button title={isSignUp ? "Sign Up" : "Login"} onPress={handleAuth} />
        <Text style={styles.toggleText} onPress={() => setIsSignUp(!isSignUp)}>
          {isSignUp
            ? "Already have an account? Login"
            : "Don't have an account? Sign Up"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: moderateScale(16),
    gap: moderateScale(50),
  },
  headerText: {
    alignSelf: "center",
    color: COLORS.primary,
    fontSize: FONT_SIZE["32"],
    fontFamily: FONT_FAMILIES.bold,
    fontWeight: "700",
  },
  toggleText: {
    marginTop: 16,
    textAlign: "center",
    color: COLORS.grey,
    textDecorationLine: "underline",
  },
  inputCont: {
    gap: moderateScale(20),
  },
});
