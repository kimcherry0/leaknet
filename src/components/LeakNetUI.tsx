import { Umbrella, Radio, Heart, MessageSquare } from 'lucide-react';

interface LeakNetUIProps {
  board: string;
  ping: string;
  title: string;
  hash: string;
  time: string;
  body: string;
  likes: string;
  commentsCount: string;
  commentsText: string;
}

export default function LeakNetUI({
  board, ping, title, hash, time, body, likes, commentsCount, commentsText
}: LeakNetUIProps) {
  
  // Parse comments: lines of "hash^text"
  const commentsList = commentsText.split('\n').filter(line => line.trim() !== '').map(line => {
    const parts = line.split('^');
    return {
      hash: parts[0] || '#NULL',
      text: parts.slice(1).join('^') || '',
    };
  });

  return (
    <div className="w-[480px] bg-[#0c0c0e] font-mono border border-[#1f2937] relative overflow-hidden shadow-2xl">
      {/* CRT Scanline Overlay (subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] z-10 pointer-events-none opacity-30"></div>
      
      {/* Top Decorator Line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#8b5cf6] to-transparent opacity-70"></div>
      
      <div className="p-5 relative z-20">
        {/* Header */}
        <div className="flex justify-between items-end border-b border-[#27272a] pb-2 mb-4">
          <div className="flex items-center gap-2 text-[#94a3b8] text-[13px] tracking-wide">
            <Umbrella className="w-4 h-4 text-[#a78bfa]" />
            <span>› [{board}]</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#22c55e]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>node:</span>
            <span className="bg-[#22c55e] text-black px-1 font-bold">██활성</span>
            <span>| {ping}ms</span>
          </div>
        </div>

        {/* Title & Metadata */}
        <div className="mb-5">
          <h1 className="text-[18px] font-bold text-[#f3f4f6] mb-1.5 leading-snug">
            {title}
          </h1>
          <div className="text-[12px] text-[#64748b] flex gap-2 font-semibold">
            <span className="text-[#38bdf8]">{hash}</span>
            <span>|</span>
            <span>{time}</span>
          </div>
        </div>

        {/* Body */}
        <div className="text-[14px] leading-relaxed text-[#d1d5db] whitespace-pre-wrap break-all mb-6">
          {body}
        </div>

        {/* Stats Divider */}
        <div className="border-t border-b border-[#27272a] py-2 mb-4 flex gap-4 text-[13px]">
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <Heart className="w-4 h-4 text-[#ef4444]" /> {likes}
          </div>
          <div className="flex items-center gap-1.5 text-[#9ca3af]">
            <MessageSquare className="w-4 h-4 text-[#8b5cf6]" /> {commentsCount}
          </div>
        </div>

        {/* Comments */}
        <div className="space-y-2 mt-2">
          {commentsList.map((c, i) => (
            <div key={i} className="text-[13px] flex items-start break-all leading-tight">
              <span className="text-[#64748b] mr-2 mt-0.5"><MessageSquare className="w-3 h-3" /></span>
              <span className="text-[#38bdf8] mr-1.5 shrink-0 font-semibold">{c.hash}</span>
              <span className="text-[#475569] mr-1.5 shrink-0">|</span>
              <span className="text-[#a1a1aa]">{c.text}</span>
            </div>
          ))}
          {commentsList.length === 0 && (
            <div className="text-[12px] text-gray-600 italic">...기록된 트래픽 없음...</div>
          )}
        </div>
      </div>
      
      {/* Bottom Decorator */}
      <div className="h-1 w-full bg-[#111] border-t border-[#1f2937] flex items-center justify-center">
         <div className="w-1/3 h-[1px] bg-emerald-500/30"></div>
      </div>
    </div>
  );
}
