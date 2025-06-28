import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from '../api/axios';

export default function UploadScreen() {
  const [caption, setCaption] = useState('');
  const [media, setMedia] = useState(null);

  const pickMedia = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission is required to access media.');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setMedia(pickerResult.assets[0]);
    }
  };

  const uploadPost = async () => {
    if (!media) {
      alert('Please pick a media file first.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('userId', '<MY-ID>'); // Replace with actual user id from context

    formData.append('media', {
      uri: media.uri,
      type: media.type === 'video' ? 'video/mp4' : 'image/jpeg',
      name: `upload.${media.type === 'video' ? 'mp4' : 'jpg'}`,
    });

    try {
      await axios.post('/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Post uploaded!');
      setCaption('');
      setMedia(null);
    } catch (error) {
      alert('Upload failed.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Caption"
        value={caption}
        onChangeText={setCaption}
        style={styles.input}
      />
      <Button title="Pick Media" onPress={pickMedia} />
      {media && (
        <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
      )}
      <Button title="Upload" onPress={uploadPost} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 10, borderRadius: 5 },
  mediaPreview: { width: '100%', height: 200, marginVertical: 10, borderRadius: 10 },
});
