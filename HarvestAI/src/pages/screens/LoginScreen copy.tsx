import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
// import * as AuthSession from 'expo-auth-session';
// import { useOAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../../styles/loginScreenStyles';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  // const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });

  const onSignIn = async () => {
    try {
      setLoading(true);
      //Implement firebase here
      

      // const redirectUrl = AuthSession.makeRedirectUri({
      //   scheme: 'harvestai',
      //   path: 'oauth-callback',
      // });

      // const { createdSessionId, setActive } =
      //   await startOAuthFlow({ redirectUrl });

      // if (createdSessionId) {
      //   await setActive!({ session: createdSessionId });
      // }
    } catch (e) {
      console.warn('Login error:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to HarvestAIFIXME</Text>

      <TouchableOpacity
        style={[styles.btn, loading && styles.btnDisabled]}
        onPress={onSignIn}
        disabled={loading}
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
