import { useFonts  } from "expo-font";


export default function useFontHook()
{
    const [fontsLoaded]=useFonts({
        Inter:require("../assets/Fonts/Inter/static/Inter_28pt-Bold.ttf"),
        Interlight:require("../assets/Fonts/Inter/static/Inter_24pt-Light.ttf"),
        Lilita:require("../assets/Fonts/Lilita-One/LilitaOne-Regular.ttf"),
        One:require("../assets/Fonts/OneSans/OpenSans.ttf")
    })

    return fontsLoaded

}