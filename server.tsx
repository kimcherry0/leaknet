import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import React from "react";
import { Umbrella, Radio, Heart, MessageSquare } from "lucide-react";

// Cache for fonts to avoid refetching on every request
const fontsCache: { pretendard?: ArrayBuffer; d2coding?: ArrayBuffer } = {};

async function loadFonts() {
  try {
    if (!fontsCache.pretendard) {
      // Using Pretendard via jsDelivr CDN
      const res = await fetch("https://cdn.jsdelivr.net/gh/orioncactus/pretendard/packages/pretendard/dist/public/static/Pretendard-Regular.ttf");
      fontsCache.pretendard = await res.arrayBuffer();
    }
  } catch (err) {
    console.error("Failed to load Pretendard font", err);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Pre-load logic for fonts
  loadFonts();

  // The actual Image Generation Endpoint (LeakNet)
  app.get("/api/leaknet", async (req, res) => {
    try {
      // Validate and load fonts
      await loadFonts();

      const board = (req.query.b || req.query.board as string) || "누수구역:자유게시판";
      const ping = (req.query.p || req.query.ping as string) || "42";
      const title = (req.query.t || req.query.title as string) || "제목없음";
      const hash = (req.query.h || req.query.hash as string) || "#NULL";
      const time = (req.query.d || req.query.time as string) || "00.00.00 00:00";
      const body = (req.query.c || req.query.body as string) || "내용이 없습니다.";
      const likes = (req.query.l || req.query.likes as string) || "0";
      const commentsCount = (req.query.m || req.query.commentsCount as string) || "0";
      const commentsText = (req.query.r || req.query.commentsText as string) || "";

      // Parse comments => expected format "hash^text" per line
      const commentsList = commentsText
        .split("\\n") // sometimes newlines come as literal \n in query params
        .flatMap(c => c.split("\n"))
        .filter(c => c.trim() !== "")
        .map(line => {
          const parts = line.split("^");
          return {
            hash: parts[0] || "#NULL",
            text: parts.slice(1).join("^") || "..."
          };
        });

      // Design using pure Flexbox (Satori restricted)
      const element = (
        <div 
          style={{ 
            display: "flex", 
            flexDirection: "column", 
            width: 480, 
            backgroundColor: "#0c0c0e", 
            border: "1px solid #1f2937", 
            color: "#f3f4f6", 
            fontFamily: "Pretendard", 
            padding: 20 
          }}
        >
          {/* Header */}
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

          {/* Title & Metadata */}
          <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
            <div style={{ fontSize: 18, fontWeight: "bold", marginBottom: 6 }}>{title}</div>
            <div style={{ display: "flex", fontSize: 12, color: "#64748b", fontWeight: "bold", gap: 8 }}>
              <span style={{ color: "#38bdf8" }}>{hash}</span>
              <span>|</span>
              <span>{time}</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ display: "flex", fontSize: 14, color: "#d1d5db", lineHeight: 1.5, marginBottom: 24, whiteSpace: "pre-wrap" }}>
            {body}
          </div>

          {/* Stats Divider */}
          <div style={{ display: "flex", borderTop: "1px solid #27272a", borderBottom: "1px solid #27272a", paddingTop: 10, paddingBottom: 10, marginBottom: 15, gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", color: "#9ca3af", fontSize: 13, gap: 6 }}>
              <Heart size={14} color="#ef4444" /> {likes}
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "#9ca3af", fontSize: 13, gap: 6 }}>
              <MessageSquare size={14} color="#8b5cf6" /> {commentsCount}
            </div>
          </div>

          {/* Comments */}
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

      // Render React element to SVG string using Satori
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

      // Render SVG to PNG using resvg
      const resvg = new Resvg(svg, {
        background: "rgba(12, 12, 14, 1)",
        fitTo: {
          mode: "width",
          value: 480,
        },
      });
      const pngData = resvg.render();
      const pngBuffer = pngData.asPng();

      // Send the image
      res.setHeader("Content-Type", "image/png");
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache it if you want
      res.send(pngBuffer);

    } catch (error) {
      console.error(error);
      res.status(500).send("Error generating LeakNet image");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
