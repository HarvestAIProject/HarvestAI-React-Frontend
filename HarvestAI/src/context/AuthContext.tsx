import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Setting up auth listener...');
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('🔥 Auth state changed:', user ? `User logged in: ${user.email}` : 'User logged out');
      setUser(user);
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth listener');
      unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      console.log('🚪 Starting logout process...');
      console.log('Current user before logout:', user?.email);
      await signOut(auth);
      console.log('✅ signOut() completed successfully');
      // The onAuthStateChanged listener will automatically update the user state
    } catch (error) {
      console.error('❌ Logout error:', error);
      throw error;
    }
  };

  console.log('AuthProvider rendering - Current user:', user?.email || 'No user', 'Loading:', loading);

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};