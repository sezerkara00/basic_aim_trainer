'use client'
import React, { useState, useEffect } from 'react';
import '../globals.css'; // CSS dosyasını içe aktarın

const GamePage: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10); // Oyun süresi
  const [gameStarted, setGameStarted] = useState(false); // Oyun başlama durumu
  const [firstTargetClicked, setFirstTargetClicked] = useState(false); // İlk hedefe tıklama durumu

  const boxSize = 500; // Kutunun genişliği ve yüksekliği

  // Rastgele pozisyon oluşturma işlevi (kutunun içinde)
  const generateRandomPosition = (): { x: number; y: number } => {
    const x = Math.floor(Math.random() * (boxSize - 20)); // Hedef boyutunu kutu içinde sınırla
    const y = Math.floor(Math.random() * (boxSize - 20));
    return { x, y };
  };

  // Hedefe tıklama işlevi
  const handleTargetClick = () => {
    if (!firstTargetClicked) {
      setGameStarted(true);
      setFirstTargetClicked(true);
      setTimeLeft(10); // Oyun süresini yeniden başlat
    } else {
      setScore(score + 1);
      setPosition(generateRandomPosition());
    }
  };

  // Zamanlayıcıyı ayarlamak için useEffect kullanma (oyun başladığında)
  useEffect(() => {
    if (!gameStarted) return;

    const gameTimer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Zamanlayıcıyı temizle
    if (timeLeft === 0) {
      clearInterval(gameTimer);
    }

    return () => clearInterval(gameTimer);
  }, [gameStarted, timeLeft]);

  // İlk hedef pozisyonunu oluştur
  useEffect(() => {
    if (!firstTargetClicked) {
      setPosition(generateRandomPosition());
    }
  }, [firstTargetClicked]);

  return (
    <div 
      className="game-cursor" // CSS sınıfını buraya ekleyin
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#282c34',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'absolute', top: '10px', left: '10px', color: 'white' }}>
        <h1>Score: {score}</h1>
        <h2>Time Left: {timeLeft}</h2>
      </div>

      <div 
        style={{
          position: 'relative',
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          border: '2px solid white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {gameStarted && timeLeft > 0 && (
          <div
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y,
              width: '20px',
              height: '20px',
              backgroundColor: 'red',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
            onClick={handleTargetClick}
          />
        )}

        {!firstTargetClicked && (
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: 'blue',
                borderRadius: '50%',
                cursor: 'pointer'
              }}
              onClick={handleTargetClick}
            />
            <span
              style={{
                marginTop: '10px',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer'
              }}
              onClick={handleTargetClick}
            >
              Start
            </span>
          </div>
        )}

        {timeLeft === 0 && gameStarted && (
          <div style={{ color: 'white', fontSize: '24px' }}>
            <h1>Game Over! Final Score: {score}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamePage;
