import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('velora_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulated login - accepts any email, sets standard user profile
    const mockUser = {
      name: email === 'alex.morgan@example.com' || email.startsWith('alex') ? "Alex Morgan" : email.split('@')[0],
      email: email,
      phone: "+1 (555) 123-4567",
      tier: "Gold Tier",
      verified: true,
      address: {
        street: "123 Minimalist Way, Apt 4B",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
        country: "United States"
      },
      orders: [
        { id: "ORD-8923", date: "Oct 24, 2023", amount: 245.00, status: "In Transit" },
        { id: "ORD-8810", date: "Sep 12, 2023", amount: 89.50, status: "Delivered" }
      ]
    };
    setUser(mockUser);
    localStorage.setItem('velora_user', JSON.stringify(mockUser));
    return true;
  };

  const signup = (name, email, password) => {
    const mockUser = {
      name: name,
      email: email,
      phone: "+1 (555) 000-0000",
      tier: "Bronze Tier",
      verified: false,
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
        country: ""
      },
      orders: []
    };
    setUser(mockUser);
    localStorage.setItem('velora_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('velora_user');
  };

  const updateProfile = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('velora_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;
