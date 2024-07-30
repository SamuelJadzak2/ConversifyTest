import React from 'react';
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface CallButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isCalling: boolean;
}

const CallButton: React.FC<CallButtonProps> = ({ onClick, isLoading, isCalling, style}) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[style, isLoading && style.disabled]}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Icon
          name={isCalling ? 'phone-off' : 'phone'}
          size={32}
          color="#fff"
        />
      )}
    </TouchableOpacity>
  );
};


export default CallButton;
