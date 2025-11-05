import { Stack } from "expo-router"

function Layout()
{

    return(<>
    <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="Chat" />
        <Stack.Screen name="Speak" />
    </Stack>
    </>)
}
export default Layout