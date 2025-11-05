import { Ionicons } from "@expo/vector-icons"
import { BlurView } from "expo-blur"
import Checkbox from "expo-checkbox"
import { Image } from "expo-image"
import { Link, router, useRouter } from "expo-router"
import { useState } from "react"
import { ActivityIndicator, Dimensions, StatusBar, StyleSheet, TouchableOpacity } from "react-native"
import { View, Text } from "react-native"
import { TextInput } from "react-native"
import axios from "axios"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { isLoaded, isLoading } from "expo-font"


function Login() {


    const [securedText, setSecuredText] = useState(true)
    const { width, height } = Dimensions.get("window")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [check, setChecked] = useState(false)
    const [loading, setLoading] = useState(false)
    const [modalMessage, setModalmessage] = useState("")
    const router = useRouter()



 const handleLogin = async () => {
  if (!email || !password) {
    return alert("Please fill all fields");
  }

  try {
    setLoading(true);

    const response = await axios.post(
      "https://wellness-backend-2-bd5h.onrender.com/api/login",
      {
        userEmail: email,
        password: password,
      }
    );

    console.info("✅ Login Successful");
    console.log(response.data);

    const userId = response.data.user._id || response.data.user.id;
    if (userId) {
      await AsyncStorage.setItem("userId", userId);
    }
    if (response.data.token) {
      await AsyncStorage.setItem("userToken", response.data.token);
      router.push("/(journal)");
    } else {
      console.error("⚠️ No token received from backend");
    }

  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    alert("Login failed! Please check your credentials.");
  } finally {
    setLoading(false);
  }
};


    return (<>
        <StatusBar barStyle="light-content" />
        <View className="relative w-full h-[85%]">
            <View>
                <Image
                    source={require("../../assets/Auth/Signup.png")}
                    style={{ width: "100%", height: "85%" }}
                />
                <View className="absolute inset-0 items-center">
                    <Text className="text-white font-inter text-4xl w-64 text-center mt-24">Sign in to Your Account</Text>
                    <Text className="font-medium text-md mt-1 text-white">Enter your Email and Password to log in</Text>

                    <BlurView
                        intensity={60}
                        tint="light"
                        className="bg-white/90 rounded-2xl items-center"
                        style={{
                            width: width * 0.96,
                            height: height * 0.55,
                            overflow: "hidden",
                            top: 35,
                            borderWidth: 1,
                            borderColor: "white"
                        }}
                    >

                        <View style={[Styles.google, { width: width * 0.90 }]}>
                            <TouchableOpacity className="flex flex-row items-center justify-center gap-2">
                                <Ionicons name="logo-google" size={20} color="#4258f4" />
                                <Text className="font-medium">Continue With Google</Text>
                            </TouchableOpacity>
                        </View>
                        <Text className="font-medium font-normal text-[#6C7278] mt-5">or login with</Text>
                        <View style={Styles.mailInput}>
                            <Ionicons name="mail-outline" size={20} color={"#B4B4B4"} />
                            <TextInput placeholder="Email" placeholderTextColor={"#B4B4B4"} style={[Styles.TxtInput, { width: width * 0.77 }]} value={email} onChangeText={setEmail} />
                        </View>
                        <View style={Styles.mailInput}>
                            <TextInput placeholder="Password" placeholderTextColor={"#B4B4B4"} value={password} onChangeText={setPassword} style={[Styles.TxtInput, { width: width * 0.77 }]} secureTextEntry={securedText} />
                            <TouchableOpacity onPress={() => { setSecuredText(!securedText) }}>
                                <Ionicons name={securedText ? "eye-off-outline" : "eye-outline"} size={20} color={"#B4B4B4"} />

                            </TouchableOpacity>

                        </View>
                        <View className="flex-row gap-24 mt-5 items-center">
                            <View className="flex flex-row items-center gap-2">
                                <Checkbox style={{ width: 15, height: 15 }} value={check} onValueChange={setChecked} />
                                <Text>Remember me</Text>
                            </View>
                            <View>
                                <Text className="text-[#4D81E7]">Forgot Password ?</Text>
                            </View>
                        </View>
                        <View className="mt-5 bg-[#E68623] w-[330px] rounded-md">
                            <TouchableOpacity style={Styles.btn} onPress={handleLogin}>
                                {loading ? (<ActivityIndicator color="#fff" />) : (
                                    <Text className="text-white font-medium text-center">Log in</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                        <Text className="mt-5 font-medium">Don't have an account ? <Link className="text-[#4D81E7]" href="/(auth)/signup">Sign Up</Link></Text>
                    </BlurView>
                </View>


            </View>
        </View>
    </>)
}


const Styles = StyleSheet.create({
    google: {
        marginTop: 24,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#F4F5FA99",
        borderRadius: 8,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#F4F5FA99",
        width: 350,
        height: 50

    },
    mailInput: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        marginTop: 20,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    TxtInput: {
        width: 300,
        height: 35,
    },
    btn: {
        paddingHorizontal: 15,
        paddingVertical: 10
    }

})
export default Login