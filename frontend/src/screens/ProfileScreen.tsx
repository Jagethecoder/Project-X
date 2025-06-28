import React, { useEffect, useState, useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

export default function ProfileScreen({ route }) {
  const { userId } = route.params;
  const [profile, setProfile] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/users/${userId === 'me' ? user._id : userId}`).then(res => setProfile(res.data));
  }, [userId]);

  const followUser = () => {
    axios.post('/users/follow', { userId: user._id, targetId: profile._id }).then(() => {
      alert('Followed!');
    });
  };

  if (!profile) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{profile.username}</Text>
      <Text>Followers: {profile.friends.length}</Text>
      {user._id !== profile._id && <Button title="Follow" onPress={followUser} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  username: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});
