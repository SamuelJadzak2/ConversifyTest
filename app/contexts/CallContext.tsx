import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import Vapi from '@vapi-ai/react-native';

const vapi = new Vapi(process.env.VAPI_PUBLIC_KEY);
const DEFAULT_ASSISTANT_ID = process.env.VAPI_ASSISTANT_ID;

interface CallContextType {
  callStatus: 'inactive' | 'active';
  error: Error | null;
  isLoading: boolean;
  callDuration: number;
  isMuted: boolean;
  startCall: (assistantId: string) => Promise<void>;
  stopCall: () => void;
  toggleMute: () => void;
}

const CallContext = createContext<CallContextType | undefined>(undefined);

const CallProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [callStatus, setCallStatus] = useState<'inactive' | 'active'>('inactive');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const startCall = useCallback(async (assistantId?: string) => {
    setIsLoading(true);
    try {
      const validAssistantId = assistantId && assistantId.trim() !== ''
        ? assistantId
        : DEFAULT_ASSISTANT_ID;

      await vapi.start(validAssistantId);
      setCallStatus('active');
      setCallDuration(0); // Reset call duration on new call start
    } catch (err) {
      console.error('Error starting call:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  const stopCall = useCallback(() => {
    vapi.stop();
    setCallStatus('inactive');
    setCallDuration(0);
    setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    const newMutedState = !isMuted;
    vapi.setMuted(newMutedState);
    setIsMuted(newMutedState);
  }, [isMuted]);

  useEffect(() => {
    const durationInterval = setInterval(() => {
      if (callStatus === 'active') {
        setCallDuration(prev => prev + 1);
      }
    }, 1000);

    return () => clearInterval(durationInterval);
  }, [callStatus]);

  useEffect(() => {
    const handleCallEnd = () => {
      setCallStatus('inactive');
      setCallDuration(0);
      setIsMuted(false);
    };

    const handleError = (e: Error) => {
      setError(e);
      stopCall();
    };

    vapi.on('call-end', handleCallEnd);
    vapi.on('error', handleError);

    return () => {
      vapi.off('call-end', handleCallEnd);
      vapi.off('error', handleError);
    };
  }, [stopCall]);

  const contextValue: CallContextType = {
    callStatus,
    error,
    isLoading,
    callDuration,
    isMuted,
    startCall,
    stopCall,
    toggleMute,
  };

  return <CallContext.Provider value={contextValue}>{children}</CallContext.Provider>;
};

export { CallProvider, CallContext };







