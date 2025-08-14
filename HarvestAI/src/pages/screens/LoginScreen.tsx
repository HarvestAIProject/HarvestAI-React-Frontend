import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import { signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { auth } from '../../config/firebase';
import styles from '../../styles/loginScreenStyles';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });

  React.useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.idToken) {
        const credential = GoogleAuthProvider.credential(authentication.idToken);
        signInWithCredential(auth, credential)
          .then(() => {
            console.log('Google sign-in successful');
          })
          .catch((error) => {
            console.error('Google sign-in error:', error);
            Alert.alert('Error', 'Google sign-in failed. Please try again.');
          });
      }
    }
  }, [response]);

  const onGoogleSignIn = async () => {
    try {
      setLoading(true);
      await promptAsync();
    } catch (e) {
      console.warn('Google login error:', e);
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onEmailAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        console.log('Creating new user...');
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Success', 'Account created successfully!');
      } else {
        console.log('Signing in user...');
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      let message = 'Authentication failed';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email address';
      } else if (error.code === 'auth/user-not-found') {
        message = 'No account found with this email';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Incorrect password';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak';
      }
      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HarvestAI</Text>
      
      {/* Auth Mode Toggle */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleBtn, !isSignUp && styles.toggleBtnActive]}
          onPress={() => setIsSignUp(false)}
        >
          <Text style={[styles.toggleText, !isSignUp && styles.toggleTextActive]}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleBtn, isSignUp && styles.toggleBtnActive]}
          onPress={() => setIsSignUp(true)}
        >
          <Text style={[styles.toggleText, isSignUp && styles.toggleTextActive]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Email/Password Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#666"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#666"
            />
          </TouchableOpacity>
        </View>

        {isSignUp && (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#666"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
          />
        )}

        <TouchableOpacity
          style={[styles.btn, styles.emailBtn, loading && styles.btnDisabled]}
          onPress={onEmailAuth}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Text>
          )}
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>
      </View>

      {/* Google Sign In */}
      <TouchableOpacity
        style={[styles.btn, styles.googleBtn, loading && styles.btnDisabled]}
        onPress={onGoogleSignIn}
        disabled={loading || !request}
        activeOpacity={0.85}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <>
            <FontAwesome name="google" size={20} color="#fff" style={styles.googleIcon} />
            <Text style={styles.btnText}>Continue with Google</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        By continuing, you agree to our Terms & Privacy Policy.
      </Text>
    </View>
  );
}
