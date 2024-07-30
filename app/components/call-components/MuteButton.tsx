import React from 'react';import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Import Feather from the library

interface MuteButtonProps {
  onClick: () => void;
  isMuted: boolean;
}

const MuteButton: React.FC<MuteButtonProps> = ({ onClick, isMuted, style }) => {
  return (
    <TouchableOpacity onPress={onClick} style={style}>
      <Icon
        name={isMuted ? 'mic-off' : 'mic'}
        size={32}
        color="#fff"
      />
    </TouchableOpacity>
  );
};

export default MuteButton;