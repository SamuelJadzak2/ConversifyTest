import React from 'react';
import { CallProvider } from '~/contexts/CallContext';
import CallActions from '~/components/call-components/CallActions';

interface CallScreenProps {
  assistantId: string;
}

const CallScreen: React.FC<CallScreenProps> = ({ assistantId }) => {
  return (
    <CallProvider>
      <CallActions assistantId={assistantId} />
    </CallProvider>
  );
};

export default CallScreen;
