'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './GamepadComponent.css';
import Hitbox from '../../public/controllers/hitbox.svg';

const GamepadComponent: React.FC = () => {
  const [gamepadIndex, setGamepadIndex] = useState<number | null>(null);
  const [gamepadButtons, setGamepadButtons] = useState<GamepadButton[]>([]);
  const [gamepadDetected, setGamepadDetected] = useState<string>(
    'No Controller Detected',
  );
  const [buttonLayout, setButtonLayout] = useState<JSX.Element>();

  useEffect(() => {
    const handleGamepadConnected = (event: GamepadEvent) => {
      const gamepad = event.gamepad;
      setGamepadIndex(gamepad.index);
      setGamepadButtons(gamepad.buttons);
      setGamepadDetected(gamepad.id + ' Connected');
      setButtonLayout(
        <Image src={Hitbox} alt='Hitbox Layout' width={800}></Image>,
      );
    };

    window.addEventListener('gamepadconnected', handleGamepadConnected);

    return () => {
      window.removeEventListener('gamepadconnected', handleGamepadConnected);
    };
  }, []);

  useEffect(() => {
    const checkGamepadState = () => {
      if (gamepadIndex !== null) {
        const gamepad = navigator.getGamepads()[gamepadIndex];
        if (gamepad) {
          setGamepadButtons(gamepad.buttons);
        }
      }
    };

    const intervalId = setInterval(checkGamepadState, 10); // Poll every 100ms

    return () => {
      clearInterval(intervalId);
    };
  }, [gamepadIndex]);

  return (
    <div>
      <h1>Button Check</h1>
      <div>{gamepadDetected}</div>
      {gamepadButtons.map((button, index) => (
        <div
          key={index}
          className={`button ${button.pressed ? 'pressed' : ''}`}
        >
          <p>Button {index + 1}</p>
          <p>Pressed: {button.pressed.toString()}</p>
          <p>Value: {button.value}</p>
        </div>
      ))}
      <div>{buttonLayout}</div>
      {/* <Image src={Hitbox} alt='Hitbox buttons' width={900} hidden></Image> */}
    </div>
  );
};

export default GamepadComponent;
