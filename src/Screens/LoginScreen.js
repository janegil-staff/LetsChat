import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
const backImage = require("../../assets/images/landing.png");

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagtion = useNavigation();

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Signed in:", userCredential.user);
        })
        .catch((error) => {
          console.error("Login error:", error.code, error.message);
        });
    }
  };
  return (
    <KeyboardAwareScrollView className="bg-black">
      <View>
        <Image source={backImage} className="object-cover h-80 w-full" />
      </View>
      <View className="bg-white h-screen">
        <Text className="text-[#d60e45] text-3xl font-semibold text-center py-3 mt-3">
          Sign in
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
        </View>
        <TouchableOpacity
          onPress={onHandleLogin}
          className="bg-[#fac25a] py-2 rounded-md mx-10 mt-16 mb-3"
        >
          <Text className="text-center font-semibold text-white text-lg">
            Login
          </Text>
        </TouchableOpacity>
        <View className="flex-row space-x-2 justify-center">
          <Text>Dont have an account?</Text>
          <TouchableOpacity onPress={() => naviagtion.navigate("Register")}>
            <Text className="text-[#d60e45] font-medium"> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default LoginScreen;
