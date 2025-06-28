import React, { useEffect, useState, useContext } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { io } from 'socket.io-client';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';

const socket = io('http://<YOUR-BACKEND-IP>:5000');

export default function ChatScreen({ route }) {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const receiverId = route.params?.receiverId || '';

  useEffect(() => {
    socket.emit('user-connected', user._id);

    socket.on('receive-message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    axios.get(`/messages?user1=${user._id}&user2=${receiverId}`).then(res => setMessages(res.data));

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    if (!text.trim()) return;
    const msg = { sender: user._id, receiver: receiverId, text };
    await axios.post('/messages', msg);
    socket.emit('send-message', { to: receiverId, message: msg });
    setMessages(prev => [...prev, msg]);
    setText('');
  };

  const renderItem = ({ item }) => (
    <Text style={item.sender === user._id ? styles.myMsg : styles.theirMsg}>
      {item.text}
    </Text>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        style={styles.messages}
      />
      <TextInput
        style={styles.input}
        placeholder="Type a message..."
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  messages: { flex: 1, marginBottom: 10 },
  myMsg: { alignSelf: 'flex-end', backgroundColor: '#DCF8C6', marginBottom: 5, padding: 8, borderRadius: 10 },
  theirMsg: { alignSelf: 'flex-start', backgroundColor: '#eee', marginBottom: 5, padding: 8, borderRadius: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, borderRadius: 5, marginBottom: 5 },
});
