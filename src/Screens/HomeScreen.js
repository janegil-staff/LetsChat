import { signOut } from "firebase/auth";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { auth } from "../../firebase/config";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
const userAvatar = require("../../assets/man2.png");

const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={userAvatar} className="w-100 h-100" />
        </TouchableOpacity>
      )
    })
  }, []);

  return (
    <View>
      <TouchableOpacity onPress={() => signOut(auth)}>
        <Text>HomeScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
