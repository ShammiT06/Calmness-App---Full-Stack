import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Checkbox from "expo-checkbox";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, TextInput, View, Text, Alert, Dimensions, ActivityIndicator } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Modal } from "react-native";


function Signup() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [date, setDate] = useState(new Date());
    const { width, height } = Dimensions.get("window");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [securedText, setSecuredText] = useState(true);
    const [confirmSecured, setConfirmSecured] = useState(true);
    const [checked, setIsChecked] = useState(false);
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState("");
    const [modalVisible,setModalvisible ] = useState(false)
    const [modalMessage, setModalmessage] = useState("")
    const [isSuccess, setIsSuccess] = useState(false)
    const router = useRouter()

    const showDateValues = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setShowDate(currentDate.toDateString());
    };



    // const handleRegister = async () => {
    //     if (!email || !password || !confirmPass || !date) {
    //         setModalvisible(true)
    //         setModalmessage("Fill All the Details")
    //         return
    //     }

    //     if(!checked)
    //     {
    //         setModalvisible(true)
    //         setModalmessage("Please Accept Terms and Conditions")
    //         return
    //     }

    //     if (password !== confirmPass) {
    //         Alert.alert("Password not Match Properly")
    //         return
    //     }

    //     const result = await register(email,password,firstName,lastName)
    //     if(result.success)
    //     {
    //         setModalvisible(true)
    //         setModalmessage("Registration Successfull")
    //         router.push("/(auth)")
    //     }
    // }
    return (
        <>
            <StatusBar style="inverted" />
            <View className="relative w-full h-[85%]">
                <Image
                    source={require("../../assets/Auth/Signup.png")}
                    style={{ width: "100%", height: "85%" }}
                />
                <View className="absolute inset-0 items-center">
                    <Text className="text-white text-[32px] font-inter font-bold mt-24">Sign Up</Text>
                    <Text className="text-white font-inter font-medium text-sm mt-2">
                        Already have an account?{" "}
                        <Link href="/(auth)" className="border-b-2 border-white">Login</Link>
                    </Text>
      <BlurView
        intensity={60}
        tint="light"
        className="bg-white/90 rounded-2xl items-center"
        style={{width: width * 0.96, height: height * 0.68, overflow: "hidden", top: 35,borderWidth: 1, borderColor: "white"}}>
                        <View style={sytles.name}>
                            <TextInput
                                placeholder="First Name"
                                style={[sytles.box ,{width:width*0.44}]}
                                placeholderTextColor={"#B4B4B4"}
                                className="bg-white w-[180px] focus:outline-none"
                                value={firstName}
                                onChangeText={setFirstName}
                            />
                            <TextInput
                                placeholder="Last Name"
                                value={lastName}
                                onChangeText={setLastName}
                                style={[sytles.box,{width:width*0.44}]}
                                placeholderTextColor={"#B4B4B4"}
                                className="bg-white w-[180px] focus:outline-none"
                            />
                        </View>

                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => setModalVisible(false)}
                            >
                                <View className="flex-1 bg-black/50 justify-center items-center">
                                    <View className="bg-white rounded-2xl shadow-slate-500 p-6">
                                        <Text
                                            className={`text-center text-2xl font-inter ${isSuccess ? "text-green-500" : "text-red-500"
                                                }`}
                                        >
                                            {modalMessage}
                                        </Text>

                                        <TouchableOpacity onPress={() => setModalvisible(false)}>
                                            <Text className="text-center text-2xl font-semibold text-blue-800 mt-5">
                                                OK
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>

                        </View>

                        <View style={sytles.inputs}>
                            <Ionicons name="mail-outline" size={20} style={{ color: "#b4b4b4" }} />
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={"#B4B4B4"}
                                className="h-[35px] focus:outline-none"
                                value={email}
                                style={{width:width*.77}}
                                onChangeText={setEmail}
                            />
                        </View>

                        <View style={sytles.inputs}>
                            <TextInput
                                placeholder="Select Date"
                                value={showDate}
                                editable={false}
                                placeholderTextColor="#B4B4B4"
                                className="h-[35px]"
                                style={{width:width*.77}}
                            />
                            <TouchableOpacity onPress={() => setShow(true)}>
                                <Ionicons name="calendar-clear-outline" size={20} color="#B4B4B4" />
                            </TouchableOpacity>

                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    onChange={showDateValues}
                                />
                            )}
                        </View>

                        <View style={sytles.inputs}>
                            <TextInput
                                placeholder="Enter Your Password"
                                placeholderTextColor={"#B4B4B4"}
                                value={password}
                                onChangeText={setPassword}
                                style={{width:width*.77}}
                                className="h-[35px] focus:outline-none"
                                secureTextEntry={securedText}
                            />
                            <TouchableOpacity onPress={() => setSecuredText(!securedText)}>
                                <Ionicons
                                    name={securedText ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={"#B4B4B4"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={sytles.inputs}>
                            <TextInput
                                placeholder="Confirm Password"
                                placeholderTextColor={"#B4B4B4"}
                                value={confirmPass}
                                onChangeText={setConfirmPass}
                                style={{width:width*.77}}
                                className="h-[35px] focus:outline-none"
                                secureTextEntry={confirmSecured}
                            />
                            <TouchableOpacity onPress={() => setConfirmSecured(!confirmSecured)}>
                                <Ionicons
                                    name={confirmSecured ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color={"#B4B4B4"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={sytles.check}>
                            <Checkbox value={checked} onValueChange={setIsChecked} />
                            <Text>
                                Terms and Condition Applied*{" "}
                                <Link href="https://strivehigh.thirdvizion.com/" className="text-[#12C0FF] border-b-2 border-[#12C0FF]">
                                    Learn More
                                </Link>
                            </Text>
                        </View>

                        <View>
                            <TouchableOpacity style={[sytles.buttons,{width:width*0.90}]} className="flex justify-center items-center rounded-md" onPress={handleRegister}>
                                {
                                    isLoading ? <ActivityIndicator color="#fff" /> :  <Text className="text-white font-medium">Sign Up</Text>
                                }
                               
                            </TouchableOpacity>
                        </View>

                        <Text className="mt-2">or</Text>

                        <View style={[sytles.google,{width:width*0.90}]}>
                            <TouchableOpacity className="flex flex-row items-center justify-center gap-2">
                                <Ionicons name="logo-google" size={20} color="#4258f4" />
                                <Text className="font-medium">Continue With Google</Text>
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </View>
            </View>
        </>
    );
}

const sytles = StyleSheet.create({
    name: {
        flexDirection: "row",
        gap: 10,
        marginTop: 15
    },
    box: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    inputs: {
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "white"
    },
    check: {
        flexDirection: "row",
        marginTop: 20,
        gap: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    buttons: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginTop: 25,
        backgroundColor:"#E68623",
    },
    google: {
        backgroundColor: "#EFF0F6",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 15,
        width: 350,
        height: 50,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10
    }
});

export default Signup;
