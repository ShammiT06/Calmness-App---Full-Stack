import { Stack } from "expo-router"

function Layout()
{

    return(<>
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="Breath" />
        <Stack.Screen name="Speak" />
    </Stack>
    </>)
}
export default Layout