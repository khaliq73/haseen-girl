import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

import duckHat from '../assets/duck-hat.gif';
import catShy from '../assets/cat-shy.gif';
import pandaRose from '../assets/panda-rose.gif';

export default function Web() {
  const [step, setStep] = useState(0);
  const [lyricIndex, setLyricIndex] = useState(0);
  const audioRef = useRef(null);

  const next = () => {
    if (step === 0) setStep(1);
    if (step === 1) {
      setStep(2);
      setTimeout(() => audioRef.current?.play(), 700);
    }
  };

  const lyrics = [
    { time: 2.9,  text: "Tu haseen tera naam haseen ae..." },
    { time: 5.9,  text: "Tere ishq da jaam haseen ae..." },
    { time: 8.5,  text: "Eh be-matlabi zindigi..." },
    { time: 11.9, text: "Jado di tere naam haseen ae..." },
    { time: 15.0, text: "Tere ishq da jaam haseen ae..." },
    { time: 19.0, text: "Shubh haseen meri shaam haseen ae..." },
  ];

  useEffect(() => {
    if (step === 2) {
      const interval = setInterval(() => {
        const t = audioRef.current?.currentTime || 0;
        const next = lyrics.find(l => l.time > t);
        if (next) setLyricIndex(lyrics.indexOf(next));
        if (t >= 19) {
          audioRef.current?.pause();
          audioRef.current.currentTime = 0;
          setStep(3);
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [step]);

  return (
  <div className="fixed inset-0 bg-gradient-to-br from-black via-purple-950 to-pink-900 flex items-center justify-center px-6 text-center overflow-hidden">

      {/* Floating hearts on final screen */}
      {step === 3 && (
        <>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 1000 }}
              animate={{ y: -1000 }}
              transition={{ duration: 16, repeat: Infinity, delay: i * 1 }}
              className="absolute text-3xl text-pink-400 opacity-60"
              style={{ left: `${8 + i * 8}%` }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          ))}
        </>
      )}

      <AnimatePresence mode="wait">

        {/* Screen 1 - Duck Hat */}
        {step === 0 && (
          <motion.div
            key="screen1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-lg px-6"
          >
            <motion.img
              src={duckHat}
              alt="duck"
              className="w-56 md:w-64 mx-auto mb-8"
              animate={{ y: [-8, 8, -8] }}
              transition={{ repeat: Infinity, duration: 4.5 }}
            />
            <h1 className="text-2xl md:text-3xl font-light text-white mb-2">
              I have a little secret for you...
            </h1>
            <p className="text-sm md:text-base text-pink-300 mb-8">
              only YOU deserve this 😅❤️
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="px-10 py-3 rounded-full bg-linear-to-r from-pink-600 to-purple-700 text-white text-sm md:text-base font-medium shadow-lg"
            >
              Open it
            </motion.button>
          </motion.div>
        )}

        {/* Screen 2 - Shy Cat */}
        {step === 1 && (
          <motion.div
            key="screen2"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -80 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-lg px-6"
          >
            <motion.img
              src={catShy}
              alt="cat"
              className="w-56 md:w-64 mx-auto mb-10"
              animate={{ y: [-6, 6, -6] }}
              transition={{ repeat: Infinity, duration: 4 }}
            />
            <h1 className="text-2xl md:text-3xl font-light text-white mb-6">
              Are you really ready to know...?
            </h1>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={next}
              className="mt-8 px-10 py-3 rounded-full bg-linear-to-r from-purple-700 to-pink-600 text-white text-sm md:text-base font-medium shadow-lg"
            >
              Show Me
            </motion.button>
          </motion.div>
        )}

        {/* Screen 3 - Song Only */}
        {step === 2 && (
          <motion.div
            key="screen3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl px-6"
          >
            <div className="h-48 md:h-64 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lyricIndex}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl md:text-3xl font-light text-pink-200 leading-relaxed px-4"
                >
                  {lyrics[lyricIndex].text}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Screen 4 - Final Panda + For My Haseen Girl */}
        {step === 3 && (
          <motion.div
            key="screen4"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: "spring", stiffness: 90 }}
            className="text-center max-w-2xl px-6"
          >
            <motion.img
              src={pandaRose}
              alt="panda"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
              className="w-64 md:w-80 mx-auto mb-8"
            />
            <motion.h1
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-5xl font-medium text-white"
            >
              For My Haseen Girl
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-base md:text-xl text-pink-300 mt-4"
            >
              Tu haseen, tera naam haseen ae... forever
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>

      <audio ref={audioRef} src="/song.mp3" preload="auto" />

    
    </div>
  );
}