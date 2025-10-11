'use client';
import { useEffect, useState } from 'react';

export default function Countdown({ isoDate }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    if (!isoDate || isNaN(Date.parse(isoDate))) {
      setTimeLeft('Fecha inválida');
      return;
    }

    const target = new Date(isoDate);

    const updateCountdown = () => {
      const now = new Date();
      const distance = target - now;

      if (distance <= 0) {
        setTimeLeft('¡Ya comenzó!');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [isoDate]);

  return (
    <div className="text-center text-sm text-gray-500 mt-2">
      Comienza en: <span className="font-semibold text-gray-700">{timeLeft}</span>
    </div>
  );
}
