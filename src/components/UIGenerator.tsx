import { useState, useRef } from 'react';
import * as htmlToImage from 'html-to-image';
import KakaoTalkUI from './KakaoTalkUI';
import DcInsideUI from './DcInsideUI';
import LeakNetUI from './LeakNetUI';
import { MessageCircle, Monitor, Umbrella, Download, Loader2 } from 'lucide-react';

export default function UIGenerator() {
  const [activeTab, setActiveTab] = useState<'kakao' | 'dc' | 'leaknet'>('leaknet');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const downloadImage = async () => {
    if (!previewRef.current) return;
    
    try {
      setIsGenerating(true);
      // Wait for font loading if any
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2, // Retina resolution for crisp text
      });
      
      const link = document.createElement('a');
      link.download = `${activeTab}_ui_${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
      alert('이미지 생성에 실패했습니다.');
    } finally {
      setIsGenerating(false);
    }
  };

  // State for KakaoTalk
  const [kakaoSender, setKakaoSender] = useState('김철수');
  const [kakaoMessage, setKakaoMessage] = useState('오늘 점심 뭐 먹을까?');
  const [kakaoTime, setKakaoTime] = useState('오후 12:30');

  // State for DC Inside
  const [dcGallery, setDcGallery] = useState('국내야구 갤러리');
  const [dcTitle, setDcTitle] = useState('오늘 저녁 메뉴 추천 받는다');
  const [dcAuthor, setDcAuthor] = useState('ㅇㅇ(118.235)');
  const [dcBody, setDcBody] = useState('진짜 맛장군들만 추천해줘라\\n배고파서 현기증 난다');
  const [dcTime, setDcTime] = useState('14:23');
  const [dcViews, setDcViews] = useState('142');
  const [dcLikes, setDcLikes] = useState('12');
  const [dcComments, setDcComments] = useState('3');

  // State for LeakNet
  const [lnBoard, setLnBoard] = useState('누수구역:자유게시판');
  const [lnTitle, setLnTitle] = useState('H섹터 24시 베이커리 빵 굽는 냄새 나는데');
  const [lnHash, setLnHash] = useState('#x9aF');
  const [lnBody, setLnBody] = useState('여기 오븐 애들 움직이는 거 아니냐?\\n지금 격벽 쪽으로 뭔가 지나갔음 ㄷㄷ\\nACC 순찰대 뜨기 전에 빨리 우회로 확보해라');
  const [lnTime, setLnTime] = useState('60.05.19 14:23');
  const [lnPing, setLnPing] = useState('42');
  const [lnLikes, setLnLikes] = useState('8');
  const [lnCommentsCount, setLnCommentsCount] = useState('2');
  const [lnCommentsText, setLnCommentsText] = useState('#88dQ^야 글 내려라 아이피 따이기전에\n#z1p0^ㅋㅋㅋ 너나 조심해');

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50 font-sans">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-5 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">가짜 UI 생성기</h1>
          <p className="text-sm text-gray-500 mt-1">API 파라미터를 시뮬레이션 합니다.</p>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('dc')}
            className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center gap-1.5 ${
              activeTab === 'dc'
                ? 'border-b-2 border-primary text-blue-600 border-blue-600 bg-blue-50/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Monitor size={16} />
            디시인사이드
          </button>
          <button
            onClick={() => setActiveTab('kakao')}
            className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center gap-1.5 ${
              activeTab === 'kakao'
                ? 'border-b-2 border-yellow-400 text-yellow-700 bg-yellow-50/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <MessageCircle size={16} />
            카카오톡
          </button>
          <button
            onClick={() => setActiveTab('leaknet')}
            className={`flex-1 py-3 px-2 text-xs font-medium flex items-center justify-center gap-1.5 ${
              activeTab === 'leaknet'
                ? 'border-b-2 border-purple-500 text-purple-700 bg-purple-50/50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Umbrella size={16} />
            리크넷
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'dc' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">갤러리 이름</label>
                <input
                  type="text"
                  value={dcGallery}
                  onChange={(e) => setDcGallery(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">게시글 제목</label>
                <input
                  type="text"
                  value={dcTitle}
                  onChange={(e) => setDcTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">작성자 (IP)</label>
                <input
                  type="text"
                  value={dcAuthor}
                  onChange={(e) => setDcAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">본문 내용</label>
                <textarea
                  value={dcBody}
                  onChange={(e) => setDcBody(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none whitespace-pre-wrap"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">작성 시간</label>
                  <input
                    type="text"
                    value={dcTime}
                    onChange={(e) => setDcTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">조회수</label>
                  <input
                    type="text"
                    value={dcViews}
                    onChange={(e) => setDcViews(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">추천수</label>
                  <input
                    type="text"
                    value={dcLikes}
                    onChange={(e) => setDcLikes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">댓글수</label>
                  <input
                    type="text"
                    value={dcComments}
                    onChange={(e) => setDcComments(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'kakao' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">발신자 명</label>
                <input
                  type="text"
                  value={kakaoSender}
                  onChange={(e) => setKakaoSender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">메시지 내용</label>
                <textarea
                  value={kakaoMessage}
                  onChange={(e) => setKakaoMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none whitespace-pre-wrap"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">전송 시간</label>
                <input
                  type="text"
                  value={kakaoTime}
                  onChange={(e) => setKakaoTime(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-yellow-500"
                />
              </div>
            </>
          )}

          {activeTab === 'leaknet' && (
            <>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">게시판명</label>
                <select
                  value={lnBoard}
                  onChange={(e) => setLnBoard(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white"
                >
                  <option value="긴급:실시간경보">긴급:실시간경보</option>
                  <option value="누수구역:자유게시판">누수구역:자유게시판</option>
                  <option value="우산:암시장거래">우산:암시장거래</option>
                  <option value="공지">공지</option>
                  <option value="쪽지">쪽지</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">게시글 제목</label>
                <input
                  type="text"
                  value={lnTitle}
                  onChange={(e) => setLnTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">작성자(해시)</label>
                  <input
                    type="text"
                    value={lnHash}
                    onChange={(e) => setLnHash(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">작성 시간</label>
                  <input
                    type="text"
                    value={lnTime}
                    onChange={(e) => setLnTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">본문 내용</label>
                <textarea
                  value={lnBody}
                  onChange={(e) => setLnBody(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none whitespace-pre-wrap font-mono"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                 <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">응답(ms)</label>
                  <input type="text" value={lnPing} onChange={(e) => setLnPing(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">하트수(♥)</label>
                  <input type="text" value={lnLikes} onChange={(e) => setLnLikes(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-700">댓글수</label>
                  <input type="text" value={lnCommentsCount} onChange={(e) => setLnCommentsCount(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">댓글 (작성자^내용 | 줄바꿈으로 구분)</label>
                <textarea
                  value={lnCommentsText}
                  onChange={(e) => setLnCommentsText(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-none whitespace-pre-wrap font-mono bg-gray-50"
                  placeholder="#해시^댓글내용 작성"
                />
              </div>
            </>
          )}

          <div className="mt-8 bg-blue-50 rounded-md p-4 text-xs text-blue-800 leading-relaxed shadow-inner">
            <span className="font-semibold block mb-1">💡 URL 구조 예시</span>
            <code className="block text-blue-900 bg-blue-100/80 px-2 py-1.5 rounded opacity-80 break-all select-all mt-2">
              {activeTab === 'dc' 
                ? `https://my-api.com/dc?g=${encodeURIComponent(dcGallery)}&t=${encodeURIComponent(dcTitle)}&a=${encodeURIComponent(dcAuthor)}&b=${encodeURIComponent(dcBody)}` 
                : activeTab === 'kakao' 
                ? `https://my-api.com/kakao?name=${encodeURIComponent(kakaoSender)}&msg=${encodeURIComponent(kakaoMessage)}&time=${encodeURIComponent(kakaoTime)}`
                : `https://my-api.com/leaknet?board=${encodeURIComponent(lnBoard)}&hash=${encodeURIComponent(lnHash)}&body=${encodeURIComponent(lnBody).substring(0,20)}...`}
            </code>
          </div>
        </div>
      </div>

        {/* Preview Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex flex-col items-center justify-center p-8 gap-6">
        
        <button
          onClick={downloadImage}
          disabled={isGenerating}
          className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {isGenerating ? '이미지 굽는 중...' : '📸 이미지로 캡처하기'}
        </button>

        <div ref={previewRef} className="rounded-xl overflow-hidden ring-1 ring-gray-200/50 shadow-2xl transition-all duration-300">
          {activeTab === 'dc' && (
            <DcInsideUI
              gallery={dcGallery}
              title={dcTitle}
              author={dcAuthor}
              body={dcBody}
              time={dcTime}
              views={dcViews}
              likes={dcLikes}
              comments={dcComments}
            />
          )}
          
          {activeTab === 'kakao' && (
            <KakaoTalkUI
              sender={kakaoSender}
              message={kakaoMessage}
              time={kakaoTime}
            />
          )}

          {activeTab === 'leaknet' && (
            <LeakNetUI
              board={lnBoard}
              ping={lnPing}
              title={lnTitle}
              hash={lnHash}
              time={lnTime}
              body={lnBody}
              likes={lnLikes}
              commentsCount={lnCommentsCount}
              commentsText={lnCommentsText}
            />
          )}
        </div>
      </div>
    </div>
  );
}
