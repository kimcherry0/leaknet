interface KakaoTalkUIProps {
  sender: string;
  message: string;
  time: string;
}

export default function KakaoTalkUI({ sender, message, time }: KakaoTalkUIProps) {
  return (
    <div className="w-[360px] bg-[#abc1d1] font-sans h-[500px] flex flex-col relative">
      {/* Header */}
      <div className="bg-[#abc1d1] bg-opacity-90 backdrop-blur-sm h-12 flex items-center px-4 justify-between z-10 sticky top-0">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5 text-gray-700" fill="none" strokeWidth="2.5" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"></path></svg>
          <span className="font-semibold text-[17px] text-gray-800 tracking-tight">{sender}</span>
        </div>
        <div className="flex items-center gap-4 text-gray-700">
           <svg className="w-5 h-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
           <svg className="w-5 h-5" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 pb-20 overflow-hidden flex flex-col justify-end">
        
        {/* Date Divider */}
        <div className="flex justify-center mb-5">
           <span className="bg-black/10 text-white text-[11px] px-3 py-1 rounded-full">
             2025년 5월 19일 월요일
           </span>
        </div>

        {/* Message Bubble container */}
        <div className="flex gap-2.5 max-w-[85%]">
          {/* Profile Image (Placeholder) */}
          <div className="w-10 h-10 bg-white rounded-[15px] overflow-hidden shrink-0 flex items-center justify-center">
            <svg className="w-9 h-9 text-gray-300 mt-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12a5 5 0 110-10 5 5 0 010 10zm0 2c-5.33 0-8 2.67-8 8v2h16v-2c0-5.33-2.67-8-8-8z"></path></svg>
          </div>
          
          <div className="flex flex-col gap-1 items-start">
            {/* Name */}
            <span className="text-[13px] text-gray-700 ml-1 block">{sender}</span>
            
            <div className="flex items-end gap-1.5">
               {/* Bubble */}
               <div className="bg-white rounded-lg rounded-tl-sm px-3 py-2 text-[14.5px] text-gray-900 leading-snug shadow-sm whitespace-pre-wrap break-all relative">
                 {message}
               </div>

               {/* Time */}
               <span className="text-[11px] text-[#556677] shrink-0 mb-1">{time}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Input area fake */}
      <div className="absolute bottom-0 w-full bg-white h-14 flex items-center px-3 border-t border-gray-200">
         <div className="w-6 h-6 rounded-full border border-gray-300 text-gray-400 flex items-center justify-center mr-3 shrink-0">
            <svg className="w-4 h-4" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
         </div>
         <div className="flex-1 bg-[#F5F5F5] h-9 rounded-full px-4 flex items-center">
            <span className="text-[14px] text-gray-400">메시지 입력...</span>
         </div>
      </div>
    </div>
  );
}
