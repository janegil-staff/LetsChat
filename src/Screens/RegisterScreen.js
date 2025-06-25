
import {auth} from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, Alert } from "react-native";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const backImage = require("../../assets/background_signin.jpg");

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const naviagtion = useNavigation();

  const onHandleRegister = () => {
    if (email !== "" && password !== "" && confirmPassword !== "") {
      if (password !== confirmPassword) {
        Alert.alert("Password does not match");
      } else {
        createUserWithEmailAndPassword(auth, email, password).then(() => {
          console.log("User created successfully");
        });
      }
    }
  };

  return (
    <KeyboardAwareScrollView className="bg-black">
      <View>
        <Image source={backImage} className="object-cover h-80 w-full" />
      </View>
      <View className="bg-white h-screen round-t-3xl">
        <Text className="text-[#d60e45] text-3xl font-semibold text-center py-3 mt-3">
          Sign up
        </Text>
        <View>
          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-100 text-base py-2 px-1 mx-3 mb-5"
            placeholder="Enter email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => setEmail(text)}
          ></TextInput>

          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-100 text-base py-2 px-1 mx-3 mb-5"
            placeholder="Enter Password"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>

          <TextInput
            className="tracking-widest bg-gray-100 rounded-lg w-100 text-base py-2 px-1 mx-3 mb-5"
            placeholder="Confirm Password"
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            textContentType="password"
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
          ></TextInput>
        </View>
        <TouchableOpacity
          onPress={onHandleRegister}
          className="bg-[#fac25a] py-2 rounded-md mx-10 mt-16 mb-3"
        >
          <Text className="text-center font-semibold text-white text-lg">
            Register
          </Text>
        </TouchableOpacity>
        <View className="flex-row space-x-2 justify-center">
          <Text>Already have an account ?</Text>
          <TouchableOpacity onPress={() => naviagtion.navigate("Login")}>
            <Text className="text-[#d60e45] font-medium"> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;
