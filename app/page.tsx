'use client'
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const handleStartClick = () => {
    router.push('/game');
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen text-black text-4xl">
        <div className="mb-6">Aim Trainer</div>
        <button 
          type="button" 
          onClick={handleStartClick}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Start
        </button>
      </div>
    </>
  );
}
