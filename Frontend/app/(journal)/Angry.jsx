import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { useState } from 'react'
import { Image } from 'expo-image'
import { router } from 'expo-router'

const { width, height } = Dimensions.get('window')

export default function Angry() {
  const [selected, setSelected] = useState(null)

  const emotions = ["Happy", "UnHappy", "Normal", "Sad", "Angry"]



  
  let emotionColour = "#B81E42"


  const handleJournal = async () => {
    if (!selected) {
      return alert("Please Chooose Your emotions")
    }

    router.push({
      pathname: "/(journal)/HealthScore",
      params: {
        emotion: selected,
        color: emotionColour
      }
    })
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>How are you feeling today ?</Text>
        <Text style={styles.subHeaderText} className="font-one">UnHappy</Text>
      </View>

      <View style={styles.happyContainer}>
        <Image
          source={require("../../assets/Journal/Angry.png")}
          style={styles.image}
          resizeMode='contain'
        />

        <View style={styles.buttons}>
          {emotions.map((item) => {
            const isSelected = selected === item
            return (
              <TouchableOpacity
                key={item}
                style={[styles.btn, isSelected && styles.selectedBtn]}
                onPress={() => {
                  setSelected(item)
                  if (item === "Angry") {
                    setSelected(item)
                    return
                  }
                  if (item === "Happy") {
                    router.push("/(journal)")
                  }
                  else {
                    router.push(`/(journal)/${item}`)
                  }
                }}
              >
                <Text style={[styles.btnText, isSelected && styles.selectedText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>


        <TouchableOpacity style={styles.confirmBtn} onPress={handleJournal}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: height * 100,
    backgroundColor: "#EBFFF7",
  },
  header: {
    marginTop: 60, 
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    marginTop: 10,
    textAlign: "center",
  },
  subHeaderText: {
    fontSize: 30,
    color: "#DE385E",
    marginTop: 5,
  },
  happyContainer: {
    flex: 1,
    backgroundColor: "#B81E42",
    marginTop: 23,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.80,
    height: 400,
  },
  buttons: {
    width: width * 0.99,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 30,
    margin: 10,
  },
  selectedBtn: {
    backgroundColor: "#DE385E",
  },
  btnText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectedText: {
    color: "#fff",
  },
  confirmBtn: {
    width: "90%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  confirmText: {
    color: "#B81E42",
    fontSize: 18,
    fontWeight: "bold",
  },
})
