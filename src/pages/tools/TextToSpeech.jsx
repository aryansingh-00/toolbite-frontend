import React, { useState, useEffect, useRef } from 'react';
import { Mic2, Play, Pause, Square, Volume2, User, Settings2, Trash2 } from 'lucide-react';
import ToolLayout from '../../components/tools/ToolLayout';
import { toast } from 'react-hot-toast';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const synth = window.speechSynthesis;

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = synth.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    synth.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged();

    return () => {
      synth.cancel();
    };
  }, []);

  const handleSpeak = () => {
    if (isPlaying && isPaused) {
      synth.resume();
      setIsPaused(false);
      return;
    }

    if (!text.trim()) {
      toast.error('Please enter some text to speak');
      return;
    }

    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voice = voices.find(v => v.name === selectedVoice);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    synth.speak(utterance);
  };

  const handlePause = () => {
    synth.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  return (
    <ToolLayout
      title="Text to Speech"
      description="Convert any written text into natural-sounding speech. Choose from various regional voices and adjust speed and pitch to your liking."
      keywords="text to speech, tts, voice synthesizer, speech generator, ai voice, narrator"
      icon={Mic2}
      category="Media"
    >
      <div className="space-y-10">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste text to convert to speech..."
            className="w-full h-80 p-8 rounded-3xl bg-slate-50 border-2 border-slate-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all font-medium text-slate-800 resize-none text-xl leading-relaxed shadow-sm"
          />
          <div className="absolute top-6 right-6">
            <button 
              onClick={() => setText('')}
              className="p-3 bg-white text-slate-400 hover:text-red-500 rounded-xl shadow-md border border-slate-100 transition-all"
              title="Clear text"
            >
              <Trash2 size={24} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8 bg-slate-900 rounded-[40px] text-white">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <User size={14} />
              Select Voice
            </label>
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full p-4 bg-slate-800 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all text-sm font-bold text-white appearance-none cursor-pointer"
            >
              {voices.map((voice) => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <Settings2 size={14} />
              Speed & Pitch
            </label>
            <div className="space-y-6">
              <div>
                <p className="text-[10px] text-slate-500 mb-1 font-bold">Speed: {rate}x</p>
                <input 
                  type="range" min="0.5" max="2" step="0.1" value={rate}
                  onChange={(e) => setRate(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg accent-teal-500 cursor-pointer"
                />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 mb-1 font-bold">Pitch: {pitch}</p>
                <input 
                  type="range" min="0" max="2" step="0.1" value={pitch}
                  onChange={(e) => setPitch(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg accent-teal-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end space-y-4">
            {!isPlaying ? (
              <button
                onClick={handleSpeak}
                className="w-full py-5 bg-teal-600 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-teal-500/20 hover:bg-teal-500 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <Play size={24} fill="white" />
                Listen Now
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {isPaused ? (
                  <button onClick={handleSpeak} className="w-full py-4 bg-teal-600 text-white font-extrabold rounded-2xl hover:bg-teal-500 flex items-center justify-center gap-2">
                    <Play size={20} fill="white" /> Resume
                  </button>
                ) : (
                  <button onClick={handlePause} className="w-full py-4 bg-amber-600 text-white font-extrabold rounded-2xl hover:bg-amber-500 flex items-center justify-center gap-2">
                    <Pause size={20} fill="white" /> Pause
                  </button>
                )}
                <button onClick={handleStop} className="w-full py-4 bg-slate-700 text-white font-extrabold rounded-2xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <Square size={20} fill="white" /> Stop
                </button>
              </div>
            )}
            <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold uppercase py-2">
              <Volume2 size={12} />
              Audio Processing Local
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
};

export default TextToSpeech;
