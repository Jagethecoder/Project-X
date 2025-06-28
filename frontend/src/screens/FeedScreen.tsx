import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, Image, StyleSheet } from 'react-native';
import axios from '../api/axios';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts').then(res => setPosts(res.data));
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.user.username}</Text>
      {item.mediaUrl?.endsWith('.mp4') ? (
        <Text>Video post (implement Video player here)</Text>
      ) : (
        <Image source={{ uri: `http://<YOUR-BACKEND-IP>:5000${item.mediaUrl}` }} style={styles.image} />
      )}
      <Text>{item.caption}</Text>
    </View>
  );

  return <FlatList data={posts} keyExtractor={item => item._id} renderItem={renderItem} />;
}

const styles = StyleSheet.create({
  postContainer: { margin: 10 },
  username: { fontWeight: 'bold', marginBottom: 5 },
  image: { height: 200, borderRadius: 10, marginBottom: 5 },
});
