import { useState, useEffect, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --navy: #0A1628;
    --navy2: #0D2040;
    --card: #112244;
    --green: #00C896;
    --green2: #00A878;
    --amber: #FFB347;
    --coral: #FF6B6B;
    --purple: #7C3AED;
    --sky: #0EA5E9;
    --white: #FFFFFF;
    --muted: #8BA8C4;
    --offwhite: #E8F5F0;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--navy);
    color: var(--white);
    min-height: 100vh;
    overflow-x: hidden;
  }

  .app { display: flex; min-height: 100vh; }

  /* SIDEBAR */
  .sidebar {
    width: 240px;
    min-height: 100vh;
    background: var(--navy2);
    border-right: 1px solid rgba(0,200,150,0.15);
    display: flex;
    flex-direction: column;
    padding: 0;
    position: fixed;
    top: 0; left: 0;
    z-index: 100;
  }

  .logo-area {
    padding: 24px 20px 20px;
    border-bottom: 1px solid rgba(0,200,150,0.12);
  }

  .logo-row { display: flex; align-items: center; gap: 10px; }

  .logo-icon {
    width: 40px; height: 40px;
    background: var(--green);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .logo-text {
    font-family: 'Syne', sans-serif;
    font-size: 18px;
    font-weight: 800;
    color: var(--white);
    letter-spacing: -0.3px;
  }

  .logo-sub { font-size: 10px; color: var(--green); letter-spacing: 1.5px; margin-top: 1px; }

  .nav-section { padding: 16px 12px 8px; }
  .nav-label { font-size: 9px; letter-spacing: 2px; color: var(--muted); padding: 0 8px 8px; text-transform: uppercase; }

  .nav-item {
    display: flex; align-items: center; gap: 10px;
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 13.5px;
    font-weight: 400;
    color: var(--muted);
    margin-bottom: 2px;
    border: 1px solid transparent;
  }

  .nav-item:hover { background: rgba(0,200,150,0.08); color: var(--white); }
  .nav-item.active {
    background: rgba(0,200,150,0.15);
    color: var(--green);
    border-color: rgba(0,200,150,0.2);
    font-weight: 500;
  }

  .nav-icon { font-size: 16px; width: 20px; text-align: center; }

  .sidebar-footer {
    margin-top: auto;
    padding: 16px;
    border-top: 1px solid rgba(0,200,150,0.1);
  }

  .user-card {
    background: rgba(0,200,150,0.08);
    border: 1px solid rgba(0,200,150,0.15);
    border-radius: 12px;
    padding: 12px;
    display: flex; align-items: center; gap: 10px;
  }

  .avatar {
    width: 36px; height: 36px;
    background: linear-gradient(135deg, var(--green), var(--sky));
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 14px;
  }

  .user-name { font-size: 13px; font-weight: 500; }
  .user-plan { font-size: 10px; color: var(--green); }

  /* MAIN CONTENT */
  .main {
    margin-left: 240px;
    flex: 1;
    min-height: 100vh;
    background: var(--navy);
  }

  /* TOPBAR */
  .topbar {
    padding: 16px 28px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(10,22,40,0.95);
    backdrop-filter: blur(12px);
    position: sticky; top: 0; z-index: 50;
  }

  .search-bar {
    display: flex; align-items: center; gap: 10px;
    background: var(--navy2);
    border: 1px solid rgba(0,200,150,0.2);
    border-radius: 12px;
    padding: 9px 16px;
    width: 320px;
    transition: all 0.2s;
  }

  .search-bar:focus-within { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,200,150,0.1); }
  .search-bar input { background: none; border: none; outline: none; color: var(--white); font-size: 13.5px; font-family: 'DM Sans', sans-serif; width: 100%; }
  .search-bar input::placeholder { color: var(--muted); }

  .topbar-right { display: flex; align-items: center; gap: 12px; }

  .notif-btn {
    width: 38px; height: 38px;
    background: var(--navy2);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; font-size: 16px; position: relative;
    transition: all 0.2s;
  }

  .notif-btn:hover { border-color: var(--green); }

  .notif-dot {
    position: absolute; top: 6px; right: 6px;
    width: 8px; height: 8px;
    background: var(--coral);
    border-radius: 50%;
    border: 2px solid var(--navy);
  }

  .health-score-chip {
    background: rgba(0,200,150,0.12);
    border: 1px solid rgba(0,200,150,0.3);
    border-radius: 20px;
    padding: 6px 14px;
    font-size: 12px;
    font-weight: 500;
    color: var(--green);
    display: flex; align-items: center; gap: 6px;
  }

  /* PAGE */
  .page { padding: 28px; }
  .page-title { font-family: 'Syne', sans-serif; font-size: 26px; font-weight: 800; margin-bottom: 4px; }
  .page-sub { color: var(--muted); font-size: 14px; margin-bottom: 24px; }

  /* CARDS */
  .card {
    background: var(--card);
    border: 1px solid rgba(0,200,150,0.1);
    border-radius: 16px;
    padding: 20px;
  }

  .card-sm { padding: 16px; }

  /* STAT GRID */
  .stat-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 24px;
  }

  .stat-card {
    background: var(--card);
    border: 1px solid rgba(0,200,150,0.12);
    border-radius: 16px;
    padding: 18px 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.2s;
  }

  .stat-card:hover { transform: translateY(-2px); border-color: rgba(0,200,150,0.3); }

  .stat-card::before {
    content: '';
    position: absolute; top: 0; left: 0;
    width: 3px; height: 100%;
  }

  .stat-card.green::before { background: var(--green); }
  .stat-card.amber::before { background: var(--amber); }
  .stat-card.coral::before { background: var(--coral); }
  .stat-card.sky::before { background: var(--sky); }

  .stat-label { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .stat-val { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; margin-bottom: 4px; }
  .stat-val.green { color: var(--green); }
  .stat-val.amber { color: var(--amber); }
  .stat-val.coral { color: var(--coral); }
  .stat-val.sky { color: var(--sky); }
  .stat-change { font-size: 11px; color: var(--muted); }
  .stat-change span { color: var(--green); }
  .stat-icon { position: absolute; top: 16px; right: 16px; font-size: 22px; opacity: 0.5; }

  /* MAIN GRID */
  .main-grid { display: grid; grid-template-columns: 1fr 340px; gap: 20px; margin-bottom: 20px; }
  .full-width { grid-column: 1 / -1; }

  /* FOOD DISCOVERY */
  .filter-row {
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 20px; flex-wrap: wrap;
  }

  .filter-chip {
    padding: 7px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255,255,255,0.1);
    background: rgba(255,255,255,0.04);
    font-size: 12.5px;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--muted);
    font-family: 'DM Sans', sans-serif;
  }

  .filter-chip:hover { border-color: var(--green); color: var(--green); }
  .filter-chip.active { background: var(--green); border-color: var(--green); color: var(--navy); font-weight: 600; }

  .food-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .food-card {
    background: var(--card);
    border: 1px solid rgba(0,200,150,0.08);
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.25s;
    position: relative;
  }

  .food-card:hover { transform: translateY(-4px); border-color: rgba(0,200,150,0.3); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }

  .food-img {
    height: 130px;
    display: flex; align-items: center; justify-content: center;
    font-size: 52px;
    position: relative;
    overflow: hidden;
  }

  .food-badge {
    position: absolute; top: 10px; right: 10px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .badge-healthy { background: rgba(0,200,150,0.9); color: var(--navy); }
  .badge-vegan { background: rgba(14,165,233,0.9); color: white; }
  .badge-protein { background: rgba(255,179,71,0.9); color: var(--navy); }

  .ai-match {
    position: absolute; top: 10px; left: 10px;
    background: rgba(124,58,237,0.9);
    padding: 3px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    color: white;
  }

  .food-info { padding: 14px 16px; }
  .food-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .food-rest { font-size: 11px; color: var(--muted); margin-bottom: 10px; }
  .food-meta { display: flex; align-items: center; justify-content: space-between; }
  .food-cal { font-size: 12px; color: var(--amber); font-weight: 500; }
  .food-price { font-size: 14px; font-weight: 700; color: var(--green); }

  .add-btn {
    position: absolute; bottom: 14px; right: 14px;
    width: 30px; height: 30px;
    background: var(--green);
    border-radius: 50%;
    border: none;
    color: var(--navy);
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    line-height: 1;
  }

  .add-btn:hover { transform: scale(1.15); background: var(--green2); }

  /* NUTRITION TRACKER */
  .macro-row { display: flex; gap: 12px; margin-bottom: 20px; }

  .macro-item { flex: 1; }
  .macro-label { font-size: 11px; color: var(--muted); margin-bottom: 6px; display: flex; justify-content: space-between; }
  .macro-label span { color: var(--white); font-weight: 500; }

  .progress-bar { height: 8px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
  .progress-fill { height: 100%; border-radius: 4px; transition: width 0.6s ease; }

  .calorie-ring {
    width: 120px; height: 120px;
    margin: 0 auto 16px;
    position: relative;
  }

  .calorie-ring svg { transform: rotate(-90deg); }

  .calorie-center {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
  }

  .cal-num { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--green); }
  .cal-sub { font-size: 10px; color: var(--muted); }

  /* AI CHAT */
  .chat-container { display: flex; flex-direction: column; height: 400px; }
  .chat-messages { flex: 1; overflow-y: auto; padding-right: 8px; display: flex; flex-direction: column; gap: 12px; }
  .chat-messages::-webkit-scrollbar { width: 4px; }
  .chat-messages::-webkit-scrollbar-track { background: transparent; }
  .chat-messages::-webkit-scrollbar-thumb { background: rgba(0,200,150,0.3); border-radius: 2px; }

  .msg { display: flex; gap: 10px; animation: fadeUp 0.3s ease; }
  .msg.user { flex-direction: row-reverse; }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

  .msg-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; flex-shrink: 0; margin-top: 2px;
  }

  .msg-avatar.bot { background: linear-gradient(135deg, var(--green), var(--sky)); }
  .msg-avatar.user { background: linear-gradient(135deg, var(--purple), var(--coral)); }

  .msg-bubble {
    max-width: 80%;
    padding: 10px 14px;
    border-radius: 14px;
    font-size: 13px;
    line-height: 1.5;
  }

  .msg.bot .msg-bubble { background: rgba(0,200,150,0.1); border: 1px solid rgba(0,200,150,0.2); border-radius: 4px 14px 14px 14px; }
  .msg.user .msg-bubble { background: rgba(124,58,237,0.2); border: 1px solid rgba(124,58,237,0.3); border-radius: 14px 4px 14px 14px; }

  .msg-time { font-size: 10px; color: var(--muted); margin-top: 4px; }

  .chat-input-row {
    display: flex; gap: 10px; margin-top: 16px;
    padding-top: 14px;
    border-top: 1px solid rgba(255,255,255,0.06);
  }

  .chat-input {
    flex: 1;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(0,200,150,0.2);
    border-radius: 12px;
    padding: 10px 14px;
    color: var(--white);
    font-size: 13px;
    font-family: 'DM Sans', sans-serif;
    outline: none;
    transition: all 0.2s;
  }

  .chat-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(0,200,150,0.1); }
  .chat-input::placeholder { color: var(--muted); }

  .send-btn {
    width: 42px; height: 42px;
    background: var(--green);
    border: none;
    border-radius: 12px;
    color: var(--navy);
    font-size: 18px;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all 0.2s;
    font-weight: 700;
  }

  .send-btn:hover { background: var(--green2); transform: scale(1.05); }

  /* RESTAURANTS */
  .rest-list { display: flex; flex-direction: column; gap: 12px; }

  .rest-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    padding: 14px 16px;
    display: flex; align-items: center; gap: 14px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rest-card:hover { background: rgba(0,200,150,0.06); border-color: rgba(0,200,150,0.2); transform: translateX(3px); }

  .rest-emoji { font-size: 32px; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border-radius: 12px; }
  .rest-info { flex: 1; }
  .rest-name { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; }
  .rest-type { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .rest-tags { display: flex; gap: 6px; margin-top: 6px; flex-wrap: wrap; }
  .rest-tag { padding: 2px 8px; border-radius: 10px; font-size: 10px; background: rgba(0,200,150,0.1); color: var(--green); border: 1px solid rgba(0,200,150,0.2); }
  .rest-meta { text-align: right; }
  .rest-score { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 800; color: var(--green); }
  .rest-score-label { font-size: 10px; color: var(--muted); }
  .rest-time { font-size: 11px; color: var(--amber); margin-top: 4px; }

  /* RANK BADGE */
  .rank-badge {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700;
    flex-shrink: 0;
  }

  .rank-1 { background: linear-gradient(135deg, #FFD700, #FFA500); color: #222; }
  .rank-2 { background: linear-gradient(135deg, #C0C0C0, #A0A0A0); color: #222; }
  .rank-3 { background: linear-gradient(135deg, #CD7F32, #A0522D); color: white; }
  .rank-other { background: rgba(255,255,255,0.08); color: var(--muted); }

  /* ORDER TRACKING */
  .track-map {
    height: 200px;
    background: linear-gradient(135deg, #0D2040 0%, #112244 50%, #0A1628 100%);
    border-radius: 14px;
    position: relative;
    overflow: hidden;
    margin-bottom: 20px;
    display: flex; align-items: center; justify-content: center;
  }

  .map-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(0,200,150,0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,200,150,0.05) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .map-route {
    position: absolute;
    width: 70%; height: 2px;
    background: linear-gradient(90deg, var(--green), var(--amber));
    top: 50%; left: 15%;
    border-radius: 2px;
  }

  .map-dots {
    position: absolute;
    width: 70%; top: 50%; left: 15%;
    display: flex; justify-content: space-between; align-items: center;
    transform: translateY(-50%);
  }

  .map-pin { font-size: 22px; animation: pulse 2s infinite; }
  .bike-icon { font-size: 24px; animation: driveRight 4s linear infinite; }

  @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.2)} }
  @keyframes driveRight { 0%{transform:translateX(0)} 50%{transform:translateX(60px)} 100%{transform:translateX(0)} }

  .track-steps { display: flex; gap: 0; margin-bottom: 20px; }

  .track-step { flex: 1; text-align: center; position: relative; }
  .track-step::before {
    content: '';
    position: absolute;
    top: 16px; left: 50%;
    width: 100%; height: 2px;
    background: rgba(255,255,255,0.1);
    z-index: 0;
  }
  .track-step:last-child::before { display: none; }

  .step-dot {
    width: 32px; height: 32px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 8px;
    font-size: 14px;
    position: relative; z-index: 1;
    border: 2px solid transparent;
    transition: all 0.3s;
  }

  .step-done { background: var(--green); border-color: var(--green); }
  .step-active { background: rgba(0,200,150,0.2); border-color: var(--green); animation: stepPulse 1.5s infinite; }
  .step-pending { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.1); }
  @keyframes stepPulse { 0%,100%{box-shadow:0 0 0 0 rgba(0,200,150,0.4)} 50%{box-shadow:0 0 0 8px rgba(0,200,150,0)} }

  .step-label { font-size: 11px; color: var(--muted); }
  .step-label.done { color: var(--green); }
  .step-label.active { color: var(--white); font-weight: 500; }

  /* AI RECOMMENDATION BANNER */
  .ai-banner {
    background: linear-gradient(135deg, rgba(0,200,150,0.12), rgba(14,165,233,0.1));
    border: 1px solid rgba(0,200,150,0.25);
    border-radius: 16px;
    padding: 16px 20px;
    display: flex; align-items: center; gap: 16px;
    margin-bottom: 24px;
  }

  .ai-icon {
    width: 44px; height: 44px;
    background: linear-gradient(135deg, var(--green), var(--sky));
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
  }

  .ai-text { flex: 1; }
  .ai-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; margin-bottom: 3px; }
  .ai-sub { font-size: 12px; color: var(--muted); }

  .btn-primary {
    padding: 8px 18px;
    background: var(--green);
    border: none;
    border-radius: 10px;
    color: var(--navy);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    white-space: nowrap;
    transition: all 0.2s;
  }

  .btn-primary:hover { background: var(--green2); transform: translateY(-1px); }

  /* SECTION HEADER */
  .section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
  .section-title { font-family: 'Syne', sans-serif; font-size: 17px; font-weight: 700; }
  .see-all { font-size: 12px; color: var(--green); cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; }
  .see-all:hover { text-decoration: underline; }

  /* ACTIVE ORDER MINI CARD */
  .active-order {
    background: linear-gradient(135deg, rgba(255,179,71,0.1), rgba(255,107,107,0.08));
    border: 1px solid rgba(255,179,71,0.25);
    border-radius: 14px;
    padding: 16px;
    margin-bottom: 16px;
  }

  .order-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
  .order-title { font-family: 'Syne', sans-serif; font-size: 14px; font-weight: 700; }
  .order-eta { font-size: 11px; color: var(--amber); }

  .live-chip {
    background: rgba(255,107,107,0.2);
    border: 1px solid rgba(255,107,107,0.4);
    border-radius: 20px;
    padding: 3px 10px;
    font-size: 10px;
    color: var(--coral);
    font-weight: 600;
    display: flex; align-items: center; gap: 4px;
  }

  .live-dot { width: 6px; height: 6px; background: var(--coral); border-radius: 50%; animation: liveBlink 1s infinite; }
  @keyframes liveBlink { 0%,100%{opacity:1} 50%{opacity:0.3} }

  /* HEALTHPASS CHIP */
  .healthpass {
    background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(14,165,233,0.1));
    border: 1px solid rgba(124,58,237,0.3);
    border-radius: 12px;
    padding: 12px 16px;
    display: flex; align-items: center; justify-content: space-between;
    margin-bottom: 16px;
  }

  .hp-left { display: flex; align-items: center; gap: 10px; }
  .hp-icon { font-size: 22px; }
  .hp-title { font-family: 'Syne', sans-serif; font-size: 13px; font-weight: 700; }
  .hp-sub { font-size: 11px; color: var(--muted); }
  .hp-btn { padding: 6px 14px; background: var(--purple); border: none; border-radius: 8px; color: white; font-size: 11px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
  .hp-btn:hover { opacity: 0.85; }

  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy2); }
  ::-webkit-scrollbar-thumb { background: rgba(0,200,150,0.3); border-radius: 3px; }

  /* RESPONSIVE */
  @media (max-width: 1100px) {
    .food-grid { grid-template-columns: repeat(2, 1fr); }
    .main-grid { grid-template-columns: 1fr; }
    .stat-grid { grid-template-columns: repeat(2, 1fr); }
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────
const FOODS = [
  { id:1, emoji:"🥗", name:"Quinoa Buddha Bowl", rest:"GreenLeaf Kitchen", cal:320, price:189, tag:"Healthy", match:98, bg:"#0D2040" },
  { id:2, emoji:"🍛", name:"Palak Paneer (Low-Oil)", rest:"Healthy Dhaba Co.", cal:280, price:149, tag:"Vegan", match:95, bg:"#112233" },
  { id:3, emoji:"🥙", name:"Grilled Chicken Wrap", rest:"FitBite Cloud Kitchen", cal:420, price:219, tag:"Protein", match:92, bg:"#0F1F38" },
  { id:4, emoji:"🍲", name:"Moong Dal Khichdi", rest:"Mom's Kitchen", cal:240, price:129, tag:"Healthy", match:96, bg:"#0D2040" },
  { id:5, emoji:"🥑", name:"Avocado Veggie Toast", rest:"Cafe Greens", cal:310, price:179, tag:"Vegan", match:89, bg:"#112233" },
  { id:6, emoji:"🍱", name:"Brown Rice + Dal Combo", rest:"NutriBox", cal:380, price:159, tag:"Protein", match:91, bg:"#0F1F38" },
];

const RESTAURANTS = [
  { id:1, emoji:"🌿", name:"GreenLeaf Kitchen", type:"Cloud Kitchen", tags:["Vegan","Organic","FSSAI A+"], score:97, time:"18 min", rank:1 },
  { id:2, emoji:"🔥", name:"FitBite Cloud Kitchen", type:"Healthy QSR", tags:["High Protein","Keto","FSSAI A"], score:94, time:"22 min", rank:2 },
  { id:3, emoji:"🏠", name:"Mom's Kitchen", type:"Home Chef", tags:["Homestyle","Low Oil","Fresh"], score:91, time:"28 min", rank:3 },
  { id:4, emoji:"☕", name:"Cafe Greens", type:"Cafe", tags:["Vegan","Gluten-Free"], score:88, time:"20 min", rank:4 },
  { id:5, emoji:"🍱", name:"NutriBox", type:"Dark Kitchen", tags:["Meal Prep","Macros"], score:85, time:"25 min", rank:5 },
];

const INIT_CHAT = [
  { id:1, role:"bot", text:"Namaste! 🙏 Main NutriBot hoon — aapka AI health coach. Aaj kya khana chahte ho? Mujhe batao apni health goal aur main best meal suggest karunga! 🥗", time:"10:30 AM" },
  { id:2, role:"user", text:"Mujhe weight loss ke liye lunch suggest karo, mujhe spicy khana pasand hai 🌶️", time:"10:31 AM" },
  { id:3, role:"bot", text:"Perfect! 🎯 Weight loss + spicy combination ke liye meri top picks:\n\n1. 🥗 Masala Quinoa Bowl — 320 kcal, high fiber\n2. 🍛 Spicy Palak Chicken — 380 kcal, high protein\n3. 🌶️ Harissa Grilled Veggies — 240 kcal, low carb\n\nSabse best option: Masala Quinoa Bowl — aapki calorie goal ke 85% match hai! Add karu? ✨", time:"10:31 AM" },
];

const FILTERS = ["All 🌟", "Vegan 🌱", "High Protein 💪", "Low Carb 🥬", "Keto 🥑", "< 300 cal ⚡"];

const TAG_COLORS = { Healthy:"badge-healthy", Vegan:"badge-vegan", Protein:"badge-protein" };

// ── APP COMPONENT ────────────────────────────────────────────────────────────
export default function NutriVerseApp() {
  const [tab, setTab] = useState("home");
  const [filter, setFilter] = useState("All 🌟");
  const [cart, setCart] = useState([]);
  const [calories, setCalories] = useState({ consumed: 1240, goal: 1800 });
  const [macros] = useState({ protein: { val: 68, goal: 120, color: "#00C896" }, carbs: { val: 145, goal: 200, color: "#FFB347" }, fat: { val: 42, goal: 60, color: "#FF6B6B" } });
  const [chat, setChat] = useState(INIT_CHAT);
  const [chatInput, setChatInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [orderStep, setOrderStep] = useState(2);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, typing]);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrderStep(s => s < 4 ? s + 1 : 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const addToCart = (food) => {
    setCart(c => [...c, food]);
    setCalories(cal => ({ ...cal, consumed: cal.consumed + food.cal }));
  };

  const sendMsg = () => {
    if (!chatInput.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: chatInput, time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) };
    setChat(c => [...c, userMsg]);
    setChatInput("");
    setTyping(true);

    const responses = [
      "Bahut achha choice! 🌟 Ye meal aapki health goal ke saath perfectly align karta hai. Protein content high hai aur calories controlled. Ek baar zaroor try karo!",
      "Great question! 💡 Aapke current macros ke hisab se aaj aur 560 calories le sakte ho. Dinner mein light khao — Moong Dal Khichdi perfect rahega!",
      "Aapka BMI analysis ke hisab se, low-carb + high-protein meals best hain. Daily 1800 kcal target pe rehna important hai. Main aapko daily meal plan bhi bana sakta hoon! 📋",
      "Ye bahut common question hai! 🎯 Water intake bhi track karo — din mein 8-10 glasses. Aur haaan, 30 min walk after dinner se results 2x fast aate hain! 🚶",
    ];
    setTimeout(() => {
      setTyping(false);
      setChat(c => [...c, { id: Date.now()+1, role: "bot", text: responses[Math.floor(Math.random()*responses.length)], time: new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) }]);
    }, 1500);
  };

  const navItems = [
    { id:"home", icon:"🏠", label:"Home" },
    { id:"discover", icon:"🔍", label:"Discover" },
    { id:"tracker", icon:"📊", label:"Nutrition" },
    { id:"restaurants", icon:"🍽️", label:"Restaurants" },
    { id:"orders", icon:"🛵", label:"Track Order" },
    { id:"nutribot", icon:"🤖", label:"NutriBot AI" },
  ];

  const calPct = Math.min((calories.consumed / calories.goal) * 100, 100);
  const circumference = 2 * Math.PI * 50;
  const dashOffset = circumference - (calPct / 100) * circumference;

  const steps = [
    { icon:"✅", label:"Order Placed", status: orderStep >= 1 ? "done" : "pending" },
    { icon:"👨‍🍳", label:"Preparing", status: orderStep >= 2 ? (orderStep === 2 ? "active" : "done") : "pending" },
    { icon:"🛵", label:"On the Way", status: orderStep >= 3 ? (orderStep === 3 ? "active" : "done") : "pending" },
    { icon:"🏠", label:"Delivered", status: orderStep >= 4 ? "done" : (orderStep === 3 ? "pending" : "pending") },
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="logo-area">
            <div className="logo-row">
              <div className="logo-icon">🌿</div>
              <div>
                <div className="logo-text">NutriVerse.ai</div>
                <div className="logo-sub">AI FOOD PLATFORM</div>
              </div>
            </div>
          </div>

          <nav className="nav-section">
            <div className="nav-label">Main Menu</div>
            {navItems.map(n => (
              <div key={n.id} className={`nav-item${tab===n.id?" active":""}`} onClick={() => setTab(n.id)}>
                <span className="nav-icon">{n.icon}</span>
                {n.label}
                {n.id === "nutribot" && <span style={{marginLeft:"auto",background:"rgba(124,58,237,0.3)",color:"#A78BFA",borderRadius:"10px",padding:"2px 6px",fontSize:"9px",fontWeight:700}}>AI</span>}
                {n.id === "orders" && <span style={{marginLeft:"auto",background:"rgba(255,107,107,0.2)",color:"var(--coral)",borderRadius:"10px",padding:"2px 6px",fontSize:"9px",fontWeight:700}}>LIVE</span>}
              </div>
            ))}
          </nav>

          <div className="sidebar-footer">
            <div className="user-card">
              <div className="avatar">A</div>
              <div>
                <div className="user-name">Sukul Singh</div>
                <div className="user-plan">⭐ HealthPass Pro</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="main">
          {/* TOPBAR */}
          <div className="topbar">
            <div className="search-bar">
              <span>🔍</span>
              <input placeholder="Search healthy meals, restaurants..." />
            </div>
            <div className="topbar-right">
              <div className="health-score-chip">
                🧬 Health Score: <strong>87/100</strong>
              </div>
              <div className="notif-btn">
                🔔
                <div className="notif-dot" />
              </div>
            </div>
          </div>

          {/* ── HOME ── */}
          {tab === "home" && (
            <div className="page">
              <div className="page-title">Good morning, <sukul></sukul>! </div>
              <div className="page-sub">Aaj ka healthy goal — 1800 kcal. Abhi tak 1240 kcal consume kiya hai.</div>

              <div className="stat-grid">
                {[
                  { label:"Calories Today", val:`${calories.consumed}`, unit:" kcal", color:"green", icon:"🔥", change:"560 remaining" },
                  { label:"AI Match Score", val:"94", unit:"%", color:"sky", icon:"🧠", change:"↑ 3% this week" },
                  { label:"Streak", val:"12", unit:" days", color:"amber", icon:"⚡", change:"Personal best!" },
                  { label:"Orders This Month", val:"28", unit:"", color:"coral", icon:"📦", change:"↑ 4 from last month" },
                ].map((s,i) => (
                  <div key={i} className={`stat-card ${s.color}`}>
                    <div className="stat-icon">{s.icon}</div>
                    <div className="stat-label">{s.label}</div>
                    <div className={`stat-val ${s.color}`}>{s.val}<span style={{fontSize:14}}>{s.unit}</span></div>
                    <div className="stat-change">{s.change.includes("↑") ? <><span>{s.change}</span></> : s.change}</div>
                  </div>
                ))}
              </div>

              <div className="ai-banner">
                <div className="ai-icon">🤖</div>
                <div className="ai-text">
                  <div className="ai-title">NutriBot AI Recommendation</div>
                  <div className="ai-sub">Aapki health profile ke hisab se aaj dinner mein Grilled Salmon + Quinoa perfect hai — 98% match!</div>
                </div>
                <button className="btn-primary" onClick={() => setTab("nutribot")}>Chat Now →</button>
              </div>

              <div className="main-grid">
                <div>
                  <div className="section-header">
                    <div className="section-title">🌟 AI Recommended for You</div>
                    <button className="see-all" onClick={() => setTab("discover")}>See All →</button>
                  </div>
                  <div className="food-grid">
                    {FOODS.slice(0,3).map(f => (
                      <div key={f.id} className="food-card">
                        <div className="food-img" style={{background:`linear-gradient(135deg,${f.bg},#0A1628)`}}>
                          <span>{f.emoji}</span>
                          <div className={`food-badge ${TAG_COLORS[f.tag]}`}>{f.tag}</div>
                          <div className="ai-match">🤖 {f.match}%</div>
                        </div>
                        <div className="food-info">
                          <div className="food-name">{f.name}</div>
                          <div className="food-rest">📍 {f.rest}</div>
                          <div className="food-meta">
                            <div className="food-cal">🔥 {f.cal} kcal</div>
                            <div className="food-price">₹{f.price}</div>
                          </div>
                        </div>
                        <button className="add-btn" onClick={() => addToCart(f)}>+</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div className="card card-sm">
                    <div className="section-title" style={{marginBottom:16}}>📊 Today's Nutrition</div>
                    <div className="calorie-ring">
                      <svg width="120" height="120" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#00C896" strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round" style={{transition:"stroke-dashoffset 0.8s ease"}} />
                      </svg>
                      <div className="calorie-center">
                        <div className="cal-num">{Math.round(calPct)}%</div>
                        <div className="cal-sub">of goal</div>
                      </div>
                    </div>
                    <div className="macro-row" style={{flexDirection:"column",gap:10,marginBottom:0}}>
                      {Object.entries(macros).map(([k,v]) => (
                        <div key={k} className="macro-item">
                          <div className="macro-label">{k.charAt(0).toUpperCase()+k.slice(1)} <span>{v.val}g / {v.goal}g</span></div>
                          <div className="progress-bar"><div className="progress-fill" style={{width:`${(v.val/v.goal)*100}%`,background:v.color}} /></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="card card-sm">
                    <div className="active-order">
                      <div className="order-top">
                        <div>
                          <div className="order-title">Quinoa Buddha Bowl</div>
                          <div className="order-eta">Estimated: 12 min 🛵</div>
                        </div>
                        <div className="live-chip"><div className="live-dot"/>LIVE</div>
                      </div>
                      <button className="btn-primary" style={{width:"100%",textAlign:"center"}} onClick={() => setTab("orders")}>Track Order →</button>
                    </div>
                    <div className="healthpass">
                      <div className="hp-left">
                        <div className="hp-icon">⭐</div>
                        <div>
                          <div className="hp-title">HealthPass Pro</div>
                          <div className="hp-sub">Free delivery + AI Coach</div>
                        </div>
                      </div>
                      <button className="hp-btn">Active ✓</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── DISCOVER ── */}
          {tab === "discover" && (
            <div className="page">
              <div className="page-title">🔍 Discover Healthy Food</div>
              <div className="page-sub">Aapke liye AI-curated meals — taste + nutrition ka perfect balance</div>
              <div className="filter-row">
                {FILTERS.map(f => (
                  <div key={f} className={`filter-chip${filter===f?" active":""}`} onClick={() => setFilter(f)}>{f}</div>
                ))}
              </div>
              <div className="food-grid">
                {FOODS.map(f => (
                  <div key={f.id} className="food-card">
                    <div className="food-img" style={{background:`linear-gradient(135deg,${f.bg},#0A1628)`}}>
                      <span style={{fontSize:58}}>{f.emoji}</span>
                      <div className={`food-badge ${TAG_COLORS[f.tag]}`}>{f.tag}</div>
                      <div className="ai-match">🤖 {f.match}% match</div>
                    </div>
                    <div className="food-info">
                      <div className="food-name">{f.name}</div>
                      <div className="food-rest">📍 {f.rest}</div>
                      <div className="food-meta">
                        <div className="food-cal">🔥 {f.cal} kcal</div>
                        <div className="food-price">₹{f.price}</div>
                      </div>
                    </div>
                    <button className="add-btn" onClick={() => addToCart(f)}>+</button>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <div style={{marginTop:24,padding:"14px 20px",background:"rgba(0,200,150,0.1)",border:"1px solid rgba(0,200,150,0.3)",borderRadius:14,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <span style={{fontFamily:"Syne, sans-serif",fontWeight:700}}>🛒 {cart.length} item{cart.length>1?"s":""} in cart</span>
                  <button className="btn-primary">Place Order →</button>
                </div>
              )}
            </div>
          )}

          {/* ── NUTRITION TRACKER ── */}
          {tab === "tracker" && (
            <div className="page">
              <div className="page-title">📊 Nutrition Tracker</div>
              <div className="page-sub">Daily macros, calorie intake, aur health progress</div>
              <div className="main-grid">
                <div className="card">
                  <div className="section-title" style={{marginBottom:20}}>Today's Calorie Summary</div>
                  <div style={{display:"flex",alignItems:"center",gap:32,marginBottom:28}}>
                    <div className="calorie-ring" style={{width:140,height:140}}>
                      <svg width="140" height="140" viewBox="0 0 140 140">
                        <circle cx="70" cy="70" r="58" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="12"/>
                        <circle cx="70" cy="70" r="58" fill="none" stroke="#00C896" strokeWidth="12" strokeDasharray={2*Math.PI*58} strokeDashoffset={2*Math.PI*58-(calPct/100)*2*Math.PI*58} strokeLinecap="round"/>
                      </svg>
                      <div className="calorie-center">
                        <div className="cal-num" style={{fontSize:26}}>{calories.consumed}</div>
                        <div className="cal-sub">of {calories.goal} kcal</div>
                      </div>
                    </div>
                    <div style={{flex:1,display:"flex",flexDirection:"column",gap:16}}>
                      {Object.entries(macros).map(([k,v]) => (
                        <div key={k}>
                          <div className="macro-label" style={{marginBottom:8}}>{k.charAt(0).toUpperCase()+k.slice(1)}<span>{v.val}g / {v.goal}g</span></div>
                          <div className="progress-bar" style={{height:10}}><div className="progress-fill" style={{width:`${(v.val/v.goal)*100}%`,background:v.color}}/></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                    {[["Breakfast","Poha + Chai","380 kcal","7:30 AM"],["Lunch","Quinoa Bowl","320 kcal","1:00 PM"],["Snack","Nuts + Fruit","180 kcal","4:30 PM"]].map(([meal,item,cal,time],i) => (
                      <div key={i} style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:12,padding:"14px 16px"}}>
                        <div style={{fontSize:11,color:"var(--muted)",marginBottom:6}}>{meal}</div>
                        <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:13,marginBottom:4}}>{item}</div>
                        <div style={{color:"var(--amber)",fontSize:12,fontWeight:500}}>{cal}</div>
                        <div style={{color:"var(--muted)",fontSize:11,marginTop:4}}>{time}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div className="card card-sm">
                    <div className="section-title" style={{marginBottom:14}}>Weekly Progress</div>
                    {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((day,i) => {
                      const vals=[85,92,78,88,95,70,82];
                      return (
                        <div key={day} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                          <div style={{width:30,fontSize:11,color:"var(--muted)"}}>{day}</div>
                          <div style={{flex:1,height:8,background:"rgba(255,255,255,0.06)",borderRadius:4,overflow:"hidden"}}>
                            <div style={{width:`${vals[i]}%`,height:"100%",background:vals[i]>90?"var(--green)":vals[i]>75?"var(--amber)":"var(--coral)",borderRadius:4,transition:"width 0.6s"}}/>
                          </div>
                          <div style={{width:32,fontSize:11,color:"var(--muted)",textAlign:"right"}}>{vals[i]}%</div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="card card-sm">
                    <div className="section-title" style={{marginBottom:12}}>🏆 Health Achievements</div>
                    {[["🔥","7-Day Streak","Keep it up!","var(--amber)"],["💪","Protein Goal","3x this week","var(--green)"],["⚡","Under Calorie","Yesterday","var(--sky)"]].map(([ic,title,sub,col],i) => (
                      <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 0",borderBottom:i<2?"1px solid rgba(255,255,255,0.05)":"none"}}>
                        <div style={{width:36,height:36,background:`${col}22`,border:`1px solid ${col}44`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>{ic}</div>
                        <div><div style={{fontSize:13,fontWeight:600}}>{title}</div><div style={{fontSize:11,color:"var(--muted)"}}>{sub}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── RESTAURANTS ── */}
          {tab === "restaurants" && (
            <div className="page">
              <div className="page-title">🍽️ Smart Restaurant Ranking</div>
              <div className="page-sub">AI-ranked by nutrition quality, hygiene, speed & reviews</div>
              <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
                {[["🧬","AI Nutrition Score","40%","var(--green)"],["🏅","FSSAI Hygiene","25%","var(--sky)"],["⚡","Delivery Speed","20%","var(--amber)"],["⭐","User Reviews","15%","var(--coral)"]].map(([ic,label,pct,col],i) => (
                  <div key={i} style={{flex:"1 1 200px",background:"var(--card)",border:`1px solid ${col}33`,borderRadius:14,padding:"14px 16px",display:"flex",alignItems:"center",gap:12}}>
                    <div style={{width:40,height:40,background:`${col}22`,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>{ic}</div>
                    <div><div style={{fontSize:12,fontWeight:600}}>{label}</div><div style={{fontSize:20,fontFamily:"Syne,sans-serif",fontWeight:800,color:col}}>{pct}</div></div>
                  </div>
                ))}
              </div>
              <div className="rest-list">
                {RESTAURANTS.map(r => (
                  <div key={r.id} className="rest-card">
                    <div className={`rank-badge rank-${r.rank<=3?r.rank:"other"}`}>{r.rank}</div>
                    <div className="rest-emoji">{r.emoji}</div>
                    <div className="rest-info">
                      <div className="rest-name">{r.name}</div>
                      <div className="rest-type">{r.type}</div>
                      <div className="rest-tags">{r.tags.map(t => <span key={t} className="rest-tag">{t}</span>)}</div>
                    </div>
                    <div className="rest-meta">
                      <div className="rest-score">{r.score}</div>
                      <div className="rest-score-label">Health Score</div>
                      <div className="rest-time">⏱ {r.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ORDER TRACKING ── */}
          {tab === "orders" && (
            <div className="page">
              <div className="page-title">🛵 Live Order Tracking</div>
              <div className="page-sub">Real-time GPS tracking powered by WebSocket</div>
              <div className="main-grid">
                <div>
                  <div className="track-map">
                    <div className="map-grid" />
                    <div className="map-route" />
                    <div className="map-dots">
                      <span className="map-pin">📍</span>
                      <span className="bike-icon">🛵</span>
                      <span className="map-pin">🏠</span>
                    </div>
                    <div style={{position:"absolute",top:10,left:14,background:"rgba(0,0,0,0.6)",borderRadius:8,padding:"6px 12px",fontSize:12,backdropFilter:"blur(8px)"}}>
                      📡 GPS Live  <span style={{color:"var(--green)"}}>●</span>
                    </div>
                  </div>
                  <div className="card" style={{marginBottom:20}}>
                    <div className="track-steps">
                      {steps.map((step,i) => (
                        <div key={i} className="track-step">
                          <div className={`step-dot step-${step.status}`}>{step.status==="done"?"✓":step.icon}</div>
                          <div className={`step-label ${step.status}`}>{step.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="card">
                    <div className="section-title" style={{marginBottom:16}}>Order Details</div>
                    <div style={{display:"flex",flexDirection:"column",gap:12}}>
                      {[["🥗 Quinoa Buddha Bowl","₹189","GreenLeaf Kitchen"],["🥤 Green Smoothie","₹89","GreenLeaf Kitchen"]].map(([item,price,rest],i) => (
                        <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 14px",background:"rgba(255,255,255,0.03)",borderRadius:10}}>
                          <div><div style={{fontSize:14,fontWeight:500}}>{item}</div><div style={{fontSize:11,color:"var(--muted)"}}>{rest}</div></div>
                          <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"var(--green)"}}>{price}</div>
                        </div>
                      ))}
                      <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:12,display:"flex",justifyContent:"space-between"}}>
                        <span style={{fontWeight:600}}>Total</span>
                        <span style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:18,color:"var(--green)"}}>₹278</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div className="card card-sm">
                    <div style={{textAlign:"center",padding:"8px 0 16px"}}>
                      <div style={{fontSize:48,marginBottom:8}}>🛵</div>
                      <div style={{fontFamily:"Syne,sans-serif",fontSize:16,fontWeight:800,marginBottom:4}}>Ravi Kumar</div>
                      <div style={{color:"var(--muted)",fontSize:13,marginBottom:12}}>Your Delivery Partner</div>
                      <div style={{display:"flex",justifyContent:"center",gap:2,marginBottom:16}}>{"⭐⭐⭐⭐⭐".split("").map((s,i)=><span key={i}>{s}</span>)}</div>
                      <div style={{display:"flex",gap:10}}>
                        <button style={{flex:1,padding:"9px",background:"rgba(0,200,150,0.15)",border:"1px solid rgba(0,200,150,0.3)",borderRadius:10,color:"var(--green)",fontSize:13,fontWeight:600,cursor:"pointer"}}>📞 Call</button>
                        <button style={{flex:1,padding:"9px",background:"rgba(14,165,233,0.15)",border:"1px solid rgba(14,165,233,0.3)",borderRadius:10,color:"var(--sky)",fontSize:13,fontWeight:600,cursor:"pointer"}}>💬 Chat</button>
                      </div>
                    </div>
                  </div>
                  <div className="card card-sm">
                    <div style={{fontSize:13,fontWeight:700,marginBottom:14}}>⏱ Estimated Arrival</div>
                    <div style={{textAlign:"center"}}>
                      <div style={{fontFamily:"Syne,sans-serif",fontSize:42,fontWeight:800,color:"var(--amber)"}}>12</div>
                      <div style={{color:"var(--muted)",fontSize:13}}>minutes away</div>
                    </div>
                    <div style={{marginTop:16,padding:"10px",background:"rgba(0,200,150,0.08)",borderRadius:10,fontSize:12,color:"var(--muted)",textAlign:"center"}}>
                      🤖 AI Route Optimization active — fastest route selected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── NUTRIBOT ── */}
          {tab === "nutribot" && (
            <div className="page">
              <div className="page-title">🤖 NutriBot AI</div>
              <div className="page-sub">Aapka personal AI nutrition coach — Hindi + English dono mein</div>
              <div className="main-grid">
                <div className="card" style={{display:"flex",flexDirection:"column"}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20,paddingBottom:16,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
                    <div style={{width:44,height:44,background:"linear-gradient(135deg,var(--green),var(--sky))",borderRadius:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:22}}>🤖</div>
                    <div>
                      <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:16}}>NutriBot</div>
                      <div style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"var(--green)"}}>
                        <div style={{width:8,height:8,background:"var(--green)",borderRadius:"50%",animation:"liveBlink 1s infinite"}}/>
                        Online — GPT-4 Powered
                      </div>
                    </div>
                    <div style={{marginLeft:"auto",fontSize:11,color:"var(--muted)"}}>Hindi • English • Tamil • Bengali</div>
                  </div>
                  <div className="chat-container">
                    <div className="chat-messages">
                      {chat.map(m => (
                        <div key={m.id} className={`msg ${m.role}`}>
                          <div className={`msg-avatar ${m.role}`}>{m.role==="bot"?"🤖":"A"}</div>
                          <div>
                            <div className="msg-bubble" style={{whiteSpace:"pre-wrap"}}>{m.text}</div>
                            <div className="msg-time" style={{textAlign:m.role==="user"?"right":"left"}}>{m.time}</div>
                          </div>
                        </div>
                      ))}
                      {typing && (
                        <div className="msg bot">
                          <div className="msg-avatar bot">🤖</div>
                          <div className="msg-bubble" style={{display:"flex",gap:4,alignItems:"center"}}>
                            {[0,1,2].map(i => <div key={i} style={{width:8,height:8,background:"var(--green)",borderRadius:"50%",animation:`liveBlink 1s ${i*0.2}s infinite`}}/>)}
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef}/>
                    </div>
                    <div className="chat-input-row">
                      <input className="chat-input" placeholder="Apna meal ya health question poochho..." value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMsg()} />
                      <button className="send-btn" onClick={sendMsg}>↑</button>
                    </div>
                  </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",gap:16}}>
                  <div className="card card-sm">
                    <div className="section-title" style={{marginBottom:14}}>🎯 Quick Prompts</div>
                    {["Aaj ka lunch suggest karo","Mera BMI kya hai?","Weight loss meal plan banao","Protein sources batao","Keto diet kya hota hai?","Aaj kitna paani piya?"].map((p,i) => (
                      <div key={i} onClick={() => { setChatInput(p); }} style={{padding:"9px 12px",background:"rgba(0,200,150,0.06)",border:"1px solid rgba(0,200,150,0.15)",borderRadius:10,fontSize:12,cursor:"pointer",marginBottom:8,transition:"all 0.2s",color:"var(--offwhite)"}} onMouseOver={e=>e.target.style.borderColor="var(--green)"} onMouseOut={e=>e.target.style.borderColor="rgba(0,200,150,0.15)"}>
                        💬 {p}
                      </div>
                    ))}
                  </div>
                  <div className="card card-sm">
                    <div className="section-title" style={{marginBottom:12}}>🧬 Your Health Profile</div>
                    {[["Goal","Weight Loss 🎯"],["Age","28 years"],["Activity","Moderate 🏃"],["BMI","23.4 (Normal)"],["Allergies","None"],["Diet Type","Non-Veg"]].map(([k,v],i) => (
                      <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<5?"1px solid rgba(255,255,255,0.04)":"none",fontSize:12}}>
                        <span style={{color:"var(--muted)"}}>{k}</span>
                        <span style={{fontWeight:500}}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
