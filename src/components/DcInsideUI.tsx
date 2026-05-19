interface DcInsideUIProps {
  gallery: string;
  title: string;
  author: string;
  body: string;
  time: string;
  views: string;
  likes: string;
  comments: string;
}

export default function DcInsideUI({ 
  gallery, title, author, body, time, views, likes, comments 
}: DcInsideUIProps) {
  return (
    <div className="w-[480px] bg-white font-sans text-sm border-t-[3px] border-[#3B4890]">
      {/* Header */}
      <div className="px-4 py-4 pb-2 border-b-2 border-black">
        <h2 className="text-[#3B4890] font-bold text-[19px] mb-3 flex items-center gap-1.5">
          {gallery} <span className="text-gray-400 text-xs font-normal align-middle">갤러리</span>
        </h2>
        <h1 className="text-[17px] font-medium text-gray-900 break-all mb-2">
          {title}
        </h1>
        
        <div className="flex flex-wrap justify-between items-center text-[12px] text-gray-500">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-700">{author}</span>
            <span className="text-gray-300">|</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>조회 {views}</span>
            <span>추천 <span className="text-[#3B4890] font-bold">{likes}</span></span>
            <span>댓글 <span className="text-red-500 font-bold">{comments}</span></span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 min-h-[180px] text-[15px] leading-relaxed text-[#333] whitespace-pre-wrap break-all pb-12">
        {body}
      </div>

      {/* Actions (Recommend) */}
      <div className="flex justify-center border-b border-gray-200 pb-8 px-4">
        <div className="border border-gray-300 w-[140px] h-[75px] rounded-[3px] flex text-center overflow-hidden cursor-pointer hover:bg-gray-50">
           <div className="flex-1 flex flex-col justify-center items-center h-full relative cursor-pointer border-r border-gray-200">
              <span className="text-red-600 font-bold text-lg mb-1">{likes}</span>
              <span className="text-[#666] text-[12px] font-medium tracking-tight h-5">개념글 추천</span>
           </div>
           <div className="flex-1 flex flex-col justify-center items-center h-full bg-gray-50/50">
              <span className="text-gray-700 font-bold text-lg mb-1">0</span>
              <span className="text-[#666] text-[12px] font-medium tracking-tight h-5">비추천</span>
           </div>
        </div>
      </div>

      {/* Footer minimal */}
      <div className="bg-[#f3f3f3] py-2.5 px-4 text-[12px] text-gray-500 flex justify-between items-center border-t border-gray-300">
        <div className="flex gap-4">
           <span>전체글</span>
           <span>개념글</span>
        </div>
        <div className="flex gap-2">
           <button className="border border-gray-300 bg-white px-3 py-1 text-xs">글쓰기</button>
           <button className="bg-[#3B4890] text-white px-3 py-1 text-xs border border-[#3B4890]">목록</button>
        </div>
      </div>
    </div>
  );
}
