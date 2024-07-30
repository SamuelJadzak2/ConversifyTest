import React from 'react';
import { Text } from 'react-native';

interface CallDurationProps {
  duration: number;
}

const CallDuration: React.FC<CallDurationProps> = ({ duration }) => {
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return <Text>{formatDuration(duration)}</Text>;
};

export default CallDuration;