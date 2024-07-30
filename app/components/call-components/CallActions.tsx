import React, { useContext } from 'react';
import { CallContext } from '~/contexts/CallContext';
import CallButton from './CallButton';
import CallDuration from './CallDuration';
import MuteButton from './MuteButton';
import { View, StyleSheet } from 'react-native';

interface CallActionsProps {
  assistantId: string;
}

const CallActions: React.FC<CallActionsProps> = ({ assistantId }) => {
  const context = useContext(CallContext);
  if (!context) throw new Error('CallActions must be used within a CallProvider');

  const { startCall, stopCall, toggleMute, isMuted, callDuration, isLoading, callStatus } = context;

  const handleCall = () => {
    if (callStatus === 'active') {
      stopCall();
    } else {
      startCall(assistantId);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        {callStatus === 'active' && <CallDuration duration={callDuration} />}
      </View>
      <View style={styles.bottomContainer}>
        <CallButton onClick={handleCall} isLoading={isLoading} isCalling={callStatus === 'active'} style={styles.button} />
        {callStatus === 'active' && <MuteButton onClick={toggleMute} isMuted={isMuted} style={styles.button} />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  topContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 20,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 10,
    backgroundColor: '#4f46e5',
    borderRadius: 100,
    padding: 10,
  },
});

export default CallActions;








