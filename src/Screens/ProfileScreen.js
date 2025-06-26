import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { auth, db } from "../../firebase/config";
import { AuthenticatedUserContext } from "../../context/AuthenticationContext";
import {
  getDoc,
  collection,
  getDocs,
  query,
  getFirestore,
  doc,
  updateDoc,
  where,
  setDoc,
} from "firebase/firestore";
import { signOut, updateProfile } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";

const ProfileScreen = () => {
  const { user, setUser, setUserAvatarUrl } = useContext(
    AuthenticatedUserContext
  );
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [image, setImage] = useState(null); // holds preview
  const [base64Image, setBase64Image] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function DocFinder(queryResult) {
    try {
      const querySnapshot = await getDocs(queryResult);

      for (const doc of querySnapshot.docs) {
        const { username, email } = doc.data();
        setUsername(username);
        setUserEmail(email);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const pickImage = async () => {
    setIsLoading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      const base64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      setImage(result.assets[0].uri); // for preview
      setBase64Image(base64);
    }
    setIsLoading(false);
  };

  const uploadToCloudinary = async () => {
    setIsLoading(true);
    const data = {
      file: base64Image,
      upload_preset: "LetsChat", // from Cloudinary dashboard
    };

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dbcdsonhz/image/upload",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();
      const url = result.secure_url;

      const snapshot = await getDocs(collection(db, "users"));
      let docId;
      snapshot.forEach((doc) => {
        if (doc.data().userId === user.uid) {
          docId = doc.id;
        }
      });

      if (user && docId) {
        setUserAvatarUrl(result.secure_url);
        const userRef = doc(db, "users", docId); // Make sure this doc exists!

        await updateDoc(userRef, {
          photoURL: result.secure_url,
        });
      }

      setImage(null);
      Alert.alert("Image uploaded successsfully");
    } catch (error) {
      Alert.alert(error.message);
      console.error("Cloudinary upload failed:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) return;

    const userRef = collection(db, "users");

    const queryResult = query(userRef, where("email", "==", user.email));

    DocFinder(queryResult);
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        naviagtion.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (
    <View>
      <View className="justify-center items-center my-5">
        <Text className="text-2xl font-medium tracking-widest">
          Welcome, <Text className="text-[#d60e45]">{username}</Text>
        </Text>
      </View>

      <View className="items-center">
        {image && (
          <>
            <Image source={{ uri: image }} className="w-40 h-40 rounded-full" />

            <button
              onClick={uploadToCloudinary}
              className="px-6 py-2 bg-gradient-to-r my-8 from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:brightness-110 transition"
            >
              📷 Upload Image
            </button>
          </>
        )}
      </View>
      {!image && (
        <TouchableOpacity
          onPress={pickImage}
          className="rounded-md bg-gray-400 items-center justify-center mx-10 mb-10"
        >
          <Ionicons name="camera" size={50} color="white" />
        </TouchableOpacity>
      )}
      <View>
        <Text className="tracking-widest bg-gray-200 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5 text-blue-900 font-light">
          {username}
        </Text>
      </View>

      <View>
        <Text className="tracking-widest bg-gray-200 rounded-lg w-80 text-base py-2 px-1 mx-3 mb-5 text-slate-900 font-light">
          {userEmail}
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-[#fac25a] py-2 rounded-md mx-20 mt-10 mb-3"
        >
          <Text className="text-center text-white font-semibold text-lg">
            Sigh Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;
