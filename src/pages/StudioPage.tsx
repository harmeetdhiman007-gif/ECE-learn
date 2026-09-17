import { Link } from 'react-router-dom';
import { PYQ_TRACKS, STUDIO_TRACKS, countTrackQuestions } from '../lib/pyq/index.js';

export default function StudioPage() {
  return (
    <div className="page">
      <div className="page-head">
        <h1>🛠️ Design Studios</h1>
        <p className="page-sub">
          Hands-on design tracks — PCB layout and VLSI / FPGA / Verilog. These
          are skill studios, not exam papers: each one has 20 practice editions
          × 65 questions plus on-demand subject practice, with an AI explainer
          on every answer. +10 XP per correct answer.
        </p>
      </div>

      <div className="pyq-note">
        📐 Studios follow the SiliconCAD curriculum — materials, routing and DRC
        for boards; RTL, timing and the ASIC flow for chips. Questions are
        original practice items.
      </div>

      <div className="pyq-columns">
        {STUDIO_TRACKS.map((id) => {
          const t = PYQ_TRACKS[id];
          const n = countTrackQuestions(id);
          return (
            <Link key={id} to={`/studio/${id}`} className="pyq-column">
              <span className="pyq-col-emoji">{t.emoji}</span>
              <span className="pyq-col-head">
                <span className="pyq-col-title">{t.title}</span>
                <span className="pyq-col-sub">Design studio</span>
              </span>
              <span className="pyq-col-blurb">{t.blurb}</span>
              <span className="pyq-col-foot">
                <span>
                  {t.years.length} {t.paperWord.toLowerCase()}s · {n} questions
                </span>
                <span className="pyq-col-cta">Open the studio →</span>
              </span>
            </Link>
          );
        })}
      </div>

      <Link to="/pyq" className="text-link">
        🎓 Looking for GATE ECE or CSE? Go to GATE PYQs →
      </Link>
    </div>
  );
}
