import React, { useState } from 'react';
import { ViewState, FairyRole, UserData } from './types';
import { fetchFairyAnswer } from './services/aiService';
import Marquee from './components/Marquee';
import CrystalBall from './components/CrystalBall';
import { ERROR_MESSAGE } from './constants';

const App: React.FC = () => {
  // State
  const [view, setView] = useState<ViewState>(ViewState.HOME);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    birthDate: '',
    question: '',
    role: FairyRole.CONSTIPATED, // Default role
  });
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleAsk = async (isFollowUp: boolean) => {
    if (!userData.question.trim()) {
      alert("請輸入心中的問題，不然仙女無法感應！");
      return;
    }
    
    setView(ViewState.LOADING);
    setError(null);

    try {
      const result = await fetchFairyAnswer({ userData, isFollowUp });
      setAnswer(result);
      setView(ViewState.ANSWER);
    } catch (err: any) {
      console.error(err);
      // Append the actual error message for debugging
      const debugInfo = err.message ? ` (${err.message})` : '';
      const fullErrorMessage = ERROR_MESSAGE + debugInfo;
      
      setError(fullErrorMessage);
      setAnswer(fullErrorMessage);
      setView(ViewState.ANSWER); // Show answer view but with error message
    }
  };

  const handleReset = () => {
    setUserData(prev => ({ ...prev, question: '' }));
    setAnswer('');
    setView(ViewState.HOME);
  };

  const handleGoToFollowUp = () => {
    setUserData(prev => ({ ...prev, question: '' })); // Clear previous question
    setView(ViewState.FOLLOW_UP);
  };

  const handleShare = () => {
    const text = `仙女也會排泄之厭世解答之書\n\nQ: ${userData.question}\nA: ${answer}\n\n#厭世解答之書`;
    if (navigator.share) {
      navigator.share({
        title: '厭世解答之書',
        text: text,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(text);
      alert('語錄已複製到剪貼簿！');
    }
  };

  // Render Views
  return (
    <div className="min-h-screen py-8 px-4 flex justify-center items-start">
      
      {/* Main Desktop Container (Wider) */}
      <div className="w-full max-w-5xl bg-white border-4 border-pink-300 border-double shadow-[10px_10px_0px_rgba(255,182,193,0.8)] relative flex flex-col">
        
        {/* Header Bar */}
        <div className="bg-pink-400 p-2 border-b-4 border-pink-300 border-double flex justify-between items-center">
             <div className="text-white font-bold text-sm tracking-widest px-2 flex items-center gap-2">
                 <span>♥</span> 
                 <span>仙女也會排泄之厭世解答之書</span>
                 <span>♥</span>
             </div>
             <div className="flex space-x-1">
                 <button className="w-4 h-4 bg-white rounded-sm border border-pink-600 flex items-center justify-center text-[10px] leading-none text-pink-600 font-bold hover:bg-gray-100">_</button>
                 <button className="w-4 h-4 bg-white rounded-sm border border-pink-600 flex items-center justify-center text-[10px] leading-none text-pink-600 font-bold hover:bg-gray-100">□</button>
                 <button className="w-4 h-4 bg-pink-600 rounded-sm border border-pink-800 flex items-center justify-center text-[10px] leading-none text-white font-bold hover:bg-red-600">×</button>
             </div>
        </div>

        {/* Title Banner Area */}
        <div className="bg-pink-50 border-b-2 border-dashed border-pink-300 p-4 text-center bg-[url('https://www.transparenttextures.com/patterns/tiny-checkers.png')]">
            <h1 className="text-3xl md:text-5xl font-bold text-pink-500 text-shadow-sm font-serif italic tracking-wide">
                 Cynical Fairy Book
            </h1>
            <p className="text-xs text-pink-400 mt-2">~ The fairy is watching you ~</p>
        </div>

        {/* Two-Column Layout */}
        <div className="flex flex-col md:flex-row min-h-[500px]">
            
            {/* === LEFT SIDEBAR (Profile & Nav) === */}
            <div className="w-full md:w-72 bg-pink-100/30 border-r-4 border-pink-300 border-double p-4 flex flex-col gap-4">
                
                {/* Profile Section */}
                <div className="bg-white border-2 border-pink-300 p-1 shadow-sm">
                    <div className="bg-pink-400 text-white text-xs font-bold px-2 py-1 mb-2">
                        :: Profile Settings ::
                    </div>
                    
                    {/* Fake Avatar */}
                    <div className="flex justify-center mb-3">
                         <div className="w-20 h-20 bg-pink-50 border-2 border-pink-200 flex items-center justify-center overflow-hidden">
                            <span className="text-4xl opacity-30">🧚‍♀️</span>
                         </div>
                    </div>

                    <div className="space-y-3 px-1 pb-2">
                         {/* Name Input */}
                         <div>
                            <label className="text-xs text-pink-500 font-bold block mb-1">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                                className="w-full border-b border-pink-300 bg-transparent text-sm text-pink-700 px-1 focus:outline-none focus:bg-pink-50"
                                placeholder="Your Name"
                            />
                         </div>
                         {/* Birth Input */}
                         <div>
                            <label className="text-xs text-pink-500 font-bold block mb-1">Birthday:</label>
                            <input
                                type="date"
                                name="birthDate"
                                value={userData.birthDate}
                                onChange={handleInputChange}
                                className="w-full border-b border-pink-300 bg-transparent text-sm text-pink-700 px-1 focus:outline-none focus:bg-pink-50"
                            />
                         </div>
                    </div>
                </div>

                {/* Role Selector (Sidebar) */}
                <div className="bg-white border-2 border-pink-300 p-1 shadow-sm">
                    <div className="bg-pink-400 text-white text-xs font-bold px-2 py-1 mb-2">
                        :: Choose Fairy ::
                    </div>
                    <div className="flex flex-col space-y-1 p-1">
                         {Object.values(FairyRole).map((role) => (
                             <label key={role} className="flex items-center cursor-pointer hover:bg-pink-100 p-1 rounded transition-colors">
                                 <input 
                                    type="radio" 
                                    name="role" 
                                    value={role} 
                                    checked={userData.role === role}
                                    onChange={handleInputChange}
                                    className="accent-pink-500 mr-2"
                                 />
                                 <span className="text-pink-600 text-xs font-bold">{role}</span>
                             </label>
                         ))}
                    </div>
                </div>

                {/* Visitor Counter */}
                <div className="mt-auto text-center pt-4">
                     <div className="text-[10px] text-pink-400 mb-1">You are visitor no.</div>
                     <span className="bg-black text-[#ff0000] font-mono px-2 py-0.5 border border-gray-400 text-xs tracking-widest">00832</span>
                </div>
            </div>

            {/* === RIGHT MAIN CONTENT === */}
            <div className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-pink-50/20 p-4 md:p-8 flex flex-col relative overflow-hidden">
                
                {/* Marquee (Now inside the right column, at the top) */}
                <Marquee />

                <div className="flex-1 flex flex-col items-center justify-center min-h-[400px]">
                    
                    {/* --- HOME VIEW --- */}
                    {view === ViewState.HOME && (
                        <div className="w-full max-w-md flex flex-col items-center animate-fade-in space-y-6">
                            
                            <div className="w-full bg-white/80 border-2 border-pink-200 p-4 shadow-sm relative">
                                <div className="absolute -top-3 -left-3 text-2xl animate-bounce">💌</div>
                                <label className="block text-pink-500 font-bold mb-2 text-center text-sm bg-pink-100 w-fit mx-auto px-4 py-0.5 rounded-full border border-pink-200">
                                    寫下你的煩惱
                                </label>
                                <textarea
                                    name="question"
                                    value={userData.question}
                                    onChange={handleInputChange}
                                    placeholder="例如：便祕了可以怎麼做？..."
                                    rows={3}
                                    className="w-full border-2 border-dashed border-pink-300 bg-pink-50 p-3 text-pink-700 focus:outline-none focus:border-pink-500 resize-none text-center"
                                />
                            </div>

                            <CrystalBall 
                                onClick={() => handleAsk(false)} 
                                isLoading={false} 
                                label="開始感應"
                            />
                        </div>
                    )}

                    {/* --- LOADING VIEW --- */}
                    {view === ViewState.LOADING && (
                        <div className="flex flex-col items-center space-y-6 animate-pulse">
                            <CrystalBall onClick={() => {}} isLoading={true} />
                            <div className="bg-white border-2 border-pink-400 px-6 py-2 rounded-full shadow-md">
                                <p className="text-pink-500 font-bold animate-bounce tracking-widest">連線中...</p>
                            </div>
                        </div>
                    )}

                    {/* --- ANSWER VIEW --- */}
                    {view === ViewState.ANSWER && (
                        <div className="w-full max-w-md flex flex-col items-center animate-fade-in-up space-y-6">
                            
                            <div className="w-full bg-white border-2 border-pink-400 p-1 shadow-lg transform rotate-1 transition-transform hover:rotate-0">
                                <div className="bg-pink-200 text-pink-600 text-xs font-bold p-1 text-center border-b border-pink-300 flex justify-between px-2">
                                     <span>★ RESULT.txt</span>
                                     <span>[x]</span>
                                </div>
                                <div className="p-8 text-center bg-[radial-gradient(circle,_#fff_2px,_transparent_2.5px)] bg-[length:10px_10px]">
                                    <p className="text-2xl font-bold text-pink-600 leading-relaxed font-serif">
                                        {answer}
                                    </p>
                                </div>
                                <div className="bg-pink-50 text-right p-1 text-[10px] text-pink-400 font-mono">
                                     {new Date().toLocaleDateString()}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 w-full px-4">
                                <button 
                                    onClick={handleReset}
                                    className="bg-white border-b-4 border-r-4 border-pink-200 text-pink-500 font-bold py-3 hover:bg-pink-50 hover:border-pink-300 transition-all active:border-0 active:translate-y-1 active:translate-x-1"
                                >
                                    意滿離
                                </button>
                                <button 
                                    onClick={handleGoToFollowUp}
                                    className="bg-pink-400 border-b-4 border-r-4 border-pink-600 text-white font-bold py-3 hover:bg-pink-500 transition-all active:border-0 active:translate-y-1 active:translate-x-1"
                                >
                                    爛死了再一次
                                </button>
                            </div>

                            <div className="w-full flex justify-center mt-2">
                                <button 
                                    onClick={handleShare}
                                    className="flex items-center space-x-2 bg-white px-4 py-2 border-2 border-dashed border-pink-300 text-pink-400 text-xs font-bold hover:bg-pink-50 transition-colors rounded-full"
                                >
                                    <span>♥</span>
                                    <span>分享結果</span>
                                </button>
                            </div>
                        </div>
                    )}

                    {/* --- FOLLOW UP VIEW --- */}
                    {view === ViewState.FOLLOW_UP && (
                        <div className="w-full max-w-md flex flex-col items-center animate-fade-in space-y-4">
                            
                            <div className="w-full border-2 border-pink-400 bg-[#fff] p-1 shadow-md">
                                 <div className="bg-pink-400 text-white text-center font-bold text-xs py-1 mb-2">
                                     :: FOLLOW UP MODE ::
                                 </div>
                                 <textarea
                                    name="question"
                                    value={userData.question}
                                    onChange={handleInputChange}
                                    placeholder="不爽就繼續問..."
                                    rows={4}
                                    className="w-full border-2 border-dashed border-pink-200 bg-pink-50 p-3 text-center text-lg text-pink-600 focus:outline-none focus:border-pink-400 resize-none"
                                    autoFocus
                                 />
                            </div>
                            
                            <CrystalBall 
                                onClick={() => handleAsk(true)} 
                                isLoading={false}
                                label="再次感應"
                            />
                        </div>
                    )}

                </div>
            </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
        .animate-fade-in-up {
            animation: fadeIn 0.5s ease-out forwards;
        }
        .text-shadow-sm {
            text-shadow: 2px 2px 0px #fff;
        }
      `}</style>
    </div>
  );
};

export default App;