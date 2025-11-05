import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { ThemeContext } from '../(lib)/ThemeContext';

export default function Profile() {
  const router = useRouter();
  const [userName, setUser] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { theme, mode, toggleTheme } = useContext(ThemeContext);
  const isEnabled = mode === 'dark';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userValue = await AsyncStorage.getItem('userId');
        if (!userValue) return;
        const res = await axios.get(`https://wellness-backend-2-bd5h.onrender.com/api/getJournal/${userValue}`);
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

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View>
        <Text style={[styles.text, { color: theme.text }]}>Settings</Text>
      </View>

      <View style={[styles.nameCont, { backgroundColor: theme.card }]}>
        <Ionicons name="person-circle-sharp" size={50} color={theme.text} />
        <View>
          <Text style={[styles.nameTxt, { color: theme.text }]}>{userName}</Text>
          <Text style={[styles.nameTxt, { color: theme.text }]}>{userEmail}</Text>
        </View>
      </View>

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

      <View style={styles.wall}>
        <Ionicons name="grid-outline" size={30} color="#fff" style={styles.wallbg} />
        <Text style={{ color: theme.text }}>Wallpaper</Text>
      </View>

      <View style={styles.wall}>
        <Ionicons name="language-sharp" size={30} color="#fff" style={styles.lanBg} />
        <Text style={{ color: theme.text }}>Language</Text>
      </View>

      <View style={styles.wall}>
        <Ionicons name="help-sharp" size={30} color="#fff" style={styles.helpbg} />
        <Text style={{ color: theme.text }}>Help Center</Text>
      </View>

      <View style={styles.wall}>
        <Ionicons name="document-text" size={30} color="#fff" style={styles.wallbg} />
        <Text style={{ color: theme.text }}>Terms & Privacy Policy</Text>
      </View>

      <View style={styles.wall}>
        <Ionicons name="phone-portrait-sharp" size={30} color="#fff" style={styles.apkversion} />
        <Text style={{ color: theme.text }}>App Version</Text>
      </View>

      <TouchableOpacity style={styles.wall} onPress={Logout}>
        <Ionicons name="log-out-sharp" size={30} color="#fff" style={styles.wallbg} />
        <Text style={{ color: theme.text }}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow:"hidden",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    marginTop:20,
    fontSize: 25,
    fontFamily: 'Inter',
  },
  nameCont: {
    marginTop: 20,
    borderRadius: 20,
    width: 350,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  nameTxt: {
    textAlign: 'center',
    fontSize: 18,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 20,
  },
  innerCont: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  innerContBg: {
    backgroundColor: '#00D7B6',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
  wall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 30,
  },
  wallbg: {
    backgroundColor: '#4AB7FD',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
  lanBg: {
    backgroundColor: '#7B83FB',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
  apkversion: {
    backgroundColor: '#8782FD',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
  helpbg: {
    backgroundColor: '#3AD06E',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 18,
  },
});
