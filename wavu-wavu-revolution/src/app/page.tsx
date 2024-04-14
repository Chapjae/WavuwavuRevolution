'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [controller, setController] = useState('No Controller Detected');

  useEffect(() => {
    const handleGampadConnected = (e) => {
      const gamepad = e.gamepad;
      setController(gamepad.id + ' Connected');
    };

    window.addEventListener('gamepadconnected', handleGampadConnected);
    return () => {
      window.removeEventListener('gamepaddisconnected', handleGampadConnected);
    };
  }, []);
  return (
    <>
      <div>{controller}</div>
    </>
  );
}
