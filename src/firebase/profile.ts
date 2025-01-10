import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import firebase_app from './config';

const db = getFirestore(firebase_app);

export interface UserProfile {
  username: string;
  email: string;
  phoneNumber: string;
  address: string;
  language: string;
  silentMode: boolean;
  darkMode: boolean;
  devicePermissions: {
    camera: boolean;
    location: boolean;
    microphone: boolean;
  };
  dataQuality: string;
  profileImage?: string;
}

// Fungsi untuk mendapatkan profil pengguna
export async function getUserProfile(userId: string) {
  try {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { data: docSnap.data() as UserProfile, error: null };
    } else {
      // Jika profil belum ada, buat profil default
      const defaultProfile: UserProfile = {
        username: '',
        email: '',
        phoneNumber: '',
        address: '',
        language: 'English',
        silentMode: false,
        darkMode: true,
        devicePermissions: {
          camera: false,
          location: false,
          microphone: false,
        },
        dataQuality: 'Highest Quality',
      };

      await setDoc(docRef, defaultProfile);
      return { data: defaultProfile, error: null };
    }
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

// Fungsi untuk mengupdate profil pengguna
export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, profileData);
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
}

// Fungsi untuk mengupdate satu field profil
export async function updateProfileField(
  userId: string,
  field: keyof UserProfile,
  value: any
) {
  try {
    const docRef = doc(db, 'users', userId);
    await updateDoc(docRef, { [field]: value });
    return { error: null };
  } catch (error) {
    return { error: error as Error };
  }
} 