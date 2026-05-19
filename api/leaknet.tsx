import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import React from "react";
import { Umbrella, Radio, Heart, MessageSquare } from "lucide-react";

const fontsCache: { pretendard?: ArrayBuffer } = {};

async function loadFonts() {
  if (!fontsCache.pretendard) {
    const res = await fetch("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static/Pretendard-Regular.ttf");
    fontsCache.pretendard = await res.arrayBuffer();
  }
}

export default async function handler(req: any, res: any) {
  try {
    await loadFonts();

    const query = req.query || {};
    
    const board = ((query.b || query.board || "누수구역:자유게시판") as string).replace(/_/g, " ");
    const ping = ((query.p || query.ping || "42") as string).replace(/_/g, " ");
    const title = ((query.t || query.title || "제목없음") as string).replace(/_/g, " ");
    const hash = ((query.h || query.hash || "#NULL") as string).replace(/_/g, " ");
    const time = ((query.d || query.time || "00.00.00 00:00") as string).replace(/_/g, " ");
    const body = ((query.c || query.body || "내용이 없습니다.") as string).replace(/_/g, " ");
    const likes = ((query.l || query.likes || "0") as string).replace(/_/g, " ");
    const commentsCount = ((query.m || query.commentsCount || "0") as string).replace(/_/g, " ");
    const commentsText = ((query.r || query.commentsText || "") as string).replace(/_/g, " ");

    const commentsList = commentsText
      .split(/\\n|\n|\|/)
      .filter(c => c.trim() !== "")
      .map(line => {
        const parts = line.split("^");
        return {
          hash: parts[0] || "#NULL",
          text: parts.slice(1).join("^") || "..."
        };
      });

    const element = (
      <div style={{ display: "flex", flexDirection: "column", width: 480, backgroundColor: "#0c0c0e", border: "1px solid #1f2937", color: "#f3f4f6", fontFamily: "Pretendard", padding: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #27272a", paddingBottom: 10, marginBottom: 15 }}>
          <div style={{ display: "flex", alignItems: "center", color: "#a78bfa", fontSize: 13, gap: 6 }}>
            <Umbrella size={14} color="#a78bfa" />
            <span>› [{board}]</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#22c55e", fontSize: 12, gap: 4 }}>
            <Radio size={12} color="#22c55e" />
            <span>node:</span>
            <span style={{ backgroundColor: "#22c55e", color: "black", padding: "0 4px", fontWeight: "bold" }}>██활성</span>
            <span>| {ping}ms</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
          <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>{title}</div>
          <div style={{ display: "flex", fontSize: 12, color: "#64748b", fontWeight: "bold", gap: 8 }}>
            <span style={{ color: "#38bdf8" }}>{hash}</span>
            <span>|</span>
            <span>{time}</span>
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 14, color: "#d1d5db", lineHeight: 1.5, marginBottom: 24, whiteSpace: "pre-wrap" }}>
          {body}
        </div>

        <div style={{ display: "flex", borderTop: "1px solid #27272a", borderBottom: "1px solid #27272a", paddingTop: 10, paddingBottom: 10, marginBottom: 15, gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", color: "#9ca3af", fontSize: 13, gap: 6 }}>
            <Heart size={14} color="#ef4444" /> {likes}
          </div>
          <div style={{ display: "flex", alignItems: "center", color: "#9ca3af", fontSize: 13, gap: 6 }}>
            <MessageSquare size={14} color="#8b5cf6" /> {commentsCount}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {commentsList.map((c, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", fontSize: 13, lineHeight: 1.3 }}>
              <span style={{ color: "#64748b", marginRight: 8, marginTop: 2 }}><MessageSquare size={12} /></span>
              <span style={{ color: "#38bdf8", marginRight: 6, fontWeight: "bold", flexShrink: 0 }}>{c.hash}</span>
              <span style={{ color: "#475569", marginRight: 6, flexShrink: 0 }}>|</span>
              <span style={{ color: "#a1a1aa" }}>{c.text}</span>
            </div>
          ))}
          {commentsList.length === 0 && (
            <div style={{ display: "flex", fontSize: 12, color: "#4b5563", fontStyle: "italic" }}>...기록된 트래픽 없음...</div>
          )}
        </div>
      </div>
    );

    const svg = await satori(element, {
      width: 480,
      fonts: [
        {
          name: "Pretendard",
          data: fontsCache.pretendard!,
          weight: 400,
          style: "normal",
        },
      ],
    });

    const resvg = new Resvg(svg, {
      background: "rgba(12, 12, 14, 1)",
      fitTo: {
        mode: "width",
        value: 480,
      },
    });
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=31536000"); // 1 year cache
    res.send(pngBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating LeakNet image");
  }
}
