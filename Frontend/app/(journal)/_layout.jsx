import { Stack} from "expo-router";



export default function RootLayout() {
  
 return <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name="index" />
    <Stack.Screen name="Angry" />
    <Stack.Screen name="UnHappy"/>
    <Stack.Screen name="Sad" />
    <Stack.Screen name="Normal" />
    <Stack.Screen name="HealthScore" />
    <Stack.Screen name="Score" />
  </Stack>;
}