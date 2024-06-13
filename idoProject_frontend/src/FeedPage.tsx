import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Props = {
  posts: Post[];
  isLoggedIn: boolean;
  token: string;
};

const FeedPage: React.FC<Props> = ({ posts, isLoggedIn, token }) => {
  const navigation = useNavigation();

  const handleProfileNavigation = () => {
    // navigation.navigate('ProfilePage');
  };

  const handleCreatePostNavigation = () => {
    // navigation.navigate('CreatePostPage');
  };

  const handlePostClick = (postId: string) => {
    // Logic to fetch post author information from the server based on postId
    // Open a modal or navigate to a new screen to display author information
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Top Bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 10 }}>
        <TouchableOpacity onPress={handleProfileNavigation}>
          <Text>Profile</Text>
        </TouchableOpacity>
        {isLoggedIn && token && (
          <TouchableOpacity onPress={handleCreatePostNavigation}>
            <Image source={require('../assets/plus.svg')} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        )}
      </View>

      {/* Feed */}
      <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
        {posts.map((post) => (
          <TouchableOpacity key={post.id} onPress={() => handlePostClick(post.id)}>
            <View style={{ flexDirection: 'row', marginBottom: 20 }}>
              <Image source={{ uri: post.image }} style={{ width: 100, height: 100, marginRight: 10 }} />
              <View>
                <Text style={{ fontWeight: 'bold' }}>{post.title}</Text>
                <Text>{post.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FeedPage;
