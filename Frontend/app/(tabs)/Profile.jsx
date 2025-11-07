import { View, Text, TouchableOpacity, StyleSheet, Switch, Pressable, Modal, TextInput, Alert, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../(lib)/ThemeContext';
import * as Application from "expo-application";
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';

export default function Profile() {
  const router = useRouter();
  const [userName, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');
  const [isVersionVisible, setVersionVisible] = useState(false);
  const [isHelpVisible, setHelpVisible] = useState(false);
  const [isDownloading, setDownloading] = useState(false);

  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const isEnabled = mode === 'dark';

  const appVersion = Application.nativeApplicationVersion;
  const appName = Application.applicationName;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userValue = await AsyncStorage.getItem('userId');
        if (!userValue) return;
        const res = await axios.get(`https://calmness-app-full-stack.onrender.com/api/getJournal/${userValue}`);
        setUser(res.data[0].UserId.firstName);
        setUserEmail(res.data[0].UserId.email);
      } catch (error) {
        console.log('Error fetching user:', error);
      }
    };
    fetchUsers();
  }, []);

  async function Logout() {
    try {
      await AsyncStorage.removeItem('userToken');
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  async function downloadPDF() {
    try {
      setDownloading(true);
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return alert("User not found");

      const url = `https://calmness-app-full-stack.onrender.com/api/downloadpdf/${userId}`;
      const fileUri = FileSystem.documentDirectory + `Journal_Report.pdf`;

      const { uri } = await FileSystem.downloadAsync(url, fileUri);

      await Sharing.shareAsync(uri);
    } catch (error) {
      console.log("Download PDF error:", error);
      Alert.alert("Download Failed", "Could not download PDF. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  async function updateName() {
    try {
      if (!newName.trim()) {
        return alert("Please enter a valid name");
      }

      const res = await axios.put(
        `https://calmness-app-full-stack.onrender.com/api/userupdate/${userEmail}`,
        { name: newName }
      );
      alert(res.data.message);
      setModalVisible(false);
      setUser(res.data.updatedUser);
    } catch (error) {
      console.log("Error while updating user:", error);
      alert("Failed to update");
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>Settings</Text>

      <View style={[styles.nameCont, { backgroundColor: theme.card }]}>
        <Ionicons name="person-circle-sharp" size={50} color={theme.text} />
        <View>
          <Text style={[styles.nameTxt, { color: theme.text }]}>{userName}</Text>
          <Text style={[styles.nameTxt, { color: theme.text }]}>{userEmail}</Text>
        </View>

        <View style={styles.editBtn}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Ionicons name="pencil-sharp" size={20} color={theme.text} />
          </TouchableOpacity>
        </View>
      </View>
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalBg}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Edit Name</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.text }]}
              placeholder="Enter new name"
              placeholderTextColor="#888"
              value={newName}
              onChangeText={setNewName}
            />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.cancelBtn} onPress={() => setModalVisible(false)}>
                <Text style={{ color: "#fff" }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.updateBtn} onPress={updateName}>
                <Text style={{ color: "#fff" }}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.themeRow}>
        <View style={styles.innerCont}>
          <Ionicons name="image-outline" size={30} color="#fff" style={styles.innerContBg} />
          <Text style={{ color: theme.text }}>Theme</Text>
        </View>
        <Switch
          trackColor={{ false: '#ccc', true: '#4BE4C9' }}
          thumbColor={isEnabled ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#ccc"
          onValueChange={toggleTheme}
          value={isEnabled}
        />
      </View>
      <TouchableOpacity style={styles.wall} onPress={downloadPDF}>
        <Ionicons name="download-outline" size={30} color="#fff" style={styles.helpbg} />
        <Text style={{ color: theme.text, marginLeft: 10 }}>Download Report</Text>
        {isDownloading && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10 }} />}
      </TouchableOpacity>
      <View style={styles.wall}>
        <Ionicons name="language-sharp" size={30} color="#fff" style={styles.helpbg} />
        <Text style={{ color: theme.text, marginLeft: 10 }}>Language</Text>
      </View>
      <Pressable onPress={() => setHelpVisible(true)}>
        <View style={styles.wall}>
          <Ionicons name="help-sharp" size={30} color="#fff" style={styles.helpbg} />
          <Text style={{ color: theme.text, marginLeft: 10 }}>Help Center</Text>
        </View>
      </Pressable>
      <View style={styles.wall}>
        <Ionicons name="document-text" size={30} color="#fff" style={styles.helpbg} />
        <Text style={{ color: theme.text, marginLeft: 10 }}>Terms & Privacy Policy</Text>
      </View>
      <Pressable onPress={() => setVersionVisible(true)}>
        <View style={styles.wall}>
          <Ionicons name="phone-portrait-sharp" size={30} color="#fff" style={styles.helpbg} />
          <Text style={{ color: theme.text, marginLeft: 10 }}>App Version</Text>
        </View>
      </Pressable>
      <TouchableOpacity style={styles.wall} onPress={Logout}>
        <Ionicons name="log-out-sharp" size={30} color="#fff" style={styles.logout} />
        <Text style={{ color: theme.text, marginLeft: 10 }}>Log Out</Text>
      </TouchableOpacity>
      <Modal visible={isVersionVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>App Information</Text>
            <Text style={{ color: theme.text, marginBottom: 10 }}>{appName}</Text>
            <Text style={{ color: theme.text }}>Version: {appVersion}</Text>
            <TouchableOpacity style={[styles.updateBtn, { marginTop: 20 }]} onPress={() => setVersionVisible(false)}>
              <Text style={{ color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal visible={isHelpVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={[styles.modalContainer, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>Contact</Text>
            <Text style={{ color: theme.text, marginBottom: 10 }}>support@thirdvizion.com</Text>
            <TouchableOpacity style={[styles.updateBtn, { marginTop: 20 }]} onPress={() => setHelpVisible(false)}>
              <Text style={{ color: "#fff" }}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden", paddingVertical: 20, paddingHorizontal: 20 },
  text: { marginTop: 20, fontSize: 25, fontFamily: 'Inter' },
  nameCont: { marginTop: 20, borderRadius: 20, width: 350, height: 160, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  nameTxt: { textAlign: 'center', fontSize: 18 },
  themeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30, marginTop: 20 },
  innerCont: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  innerContBg: { backgroundColor: '#333F4F', paddingVertical: 5, paddingHorizontal: 5, borderRadius: 18 },
  wall: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 30 },
  helpbg: { backgroundColor: '#333F4F', paddingVertical: 5, paddingHorizontal: 5, borderRadius: 18 },
  logout: { backgroundColor: "#EB0000", paddingVertical: 5, paddingHorizontal: 5, borderRadius: 18 },
  editBtn: { justifyContent: "flex-end", alignSelf: "flex-end", paddingVertical: 10, paddingHorizontal: 10 },
  modalBg: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContainer: { width: 300, borderRadius: 20, padding: 20, alignItems: 'center' },
  modalTitle: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 10, width: '100%', padding: 10, marginVertical: 10 },
  modalBtns: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10 },
  cancelBtn: { backgroundColor: '#555', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
  updateBtn: { backgroundColor: '#4BE4C9', padding: 10, borderRadius: 10, width: '45%', alignItems: 'center' },
});
