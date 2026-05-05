import { useCallback, useRef } from 'react';

export const useSound = (enabled = true) => {
  const audioCtx = useRef(null);

  const playSound = useCallback((type = 'click') => {
    if (!enabled) return;

    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioCtx.current.state === 'suspended') {
      audioCtx.current.resume();
    }

    const oscillator = audioCtx.current.createOscillator();
    const gainNode = audioCtx.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.current.destination);

    if (type === 'click') {
      // Clean, high-end UI click
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(800, audioCtx.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioCtx.current.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.05, audioCtx.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.1);
      
      oscillator.start();
      oscillator.stop(audioCtx.current.currentTime + 0.1);
    } else if (type === 'shimmer') {
      // High-end cinematic shimmer for success
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(1200, audioCtx.current.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(2400, audioCtx.current.currentTime + 0.4);
      
      gainNode.gain.setValueAtTime(0.03, audioCtx.current.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.current.currentTime + 0.4);
      
      oscillator.start();
      oscillator.stop(audioCtx.current.currentTime + 0.4);
    }
  }, [enabled]);

  return { playSound };
};
