import React from 'react';
import {Image, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useJoinCommunityStyles from './JoinCommunityStyles';

const JoinCommunityButton = () => {
  const handleDiscordRedirect = () => {
    console.log('Clicked discord community button...');
  };

  const styles = useJoinCommunityStyles();
  return (
    <TouchableOpacity style={{flex: 1}} onPress={() => handleDiscordRedirect()}>
      <LinearGradient style={styles.button} colors={['#F9B108', '#FC5604']}>
        <Image
          source={require('./join-community-logo.png')}
          style={styles.discordLogo}
          resizeMode="contain"
        />
        <Text style={styles.joinCommunityText}>Join our Discord Community</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default JoinCommunityButton;
