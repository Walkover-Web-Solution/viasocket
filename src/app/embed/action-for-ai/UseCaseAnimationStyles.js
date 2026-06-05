const ucAnimationStyles = `
/* USE-CASE PANEL ANIMATION — icons pulse in sequence + content progressively reveals */
@keyframes ucIconPulseBlue {
  0%, 18%, 100% { transform: scale(1); box-shadow: none; }
  4%, 12% { transform: scale(1.12); box-shadow: 0 0 0 6px rgba(59, 130, 246, 0.16); }
}
@keyframes ucIconPulseRed {
  0%, 18%, 100% { transform: scale(1); box-shadow: none; }
  4%, 12% { transform: scale(1.12); box-shadow: 0 0 0 6px rgba(168, 32, 13, 0.12); }
}
@keyframes ucIconPulseGreen {
  0%, 18%, 100% { transform: scale(1); box-shadow: none; }
  4%, 12% { transform: scale(1.12); box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.18); }
}
.uc-step:nth-child(1) .uc-step-ico { animation: ucIconPulseBlue 5.4s ease-in-out infinite; animation-delay: 0s; }
.uc-step:nth-child(2) .uc-step-ico { animation: ucIconPulseRed 5.4s ease-in-out infinite; animation-delay: 1.5s; }
.uc-step:nth-child(3) .uc-step-ico { animation: ucIconPulseGreen 5.4s ease-in-out infinite; animation-delay: 3s; }

@keyframes ucDecReveal1 {
  0%, 24% { opacity: 0.2; transform: translateX(-5px); }
  32%, 100% { opacity: 1; transform: translateX(0); }
}
@keyframes ucDecReveal2 {
  0%, 28% { opacity: 0.2; transform: translateX(-5px); }
  36%, 100% { opacity: 1; transform: translateX(0); }
}
@keyframes ucDecReveal3 {
  0%, 32% { opacity: 0.2; transform: translateX(-5px); }
  40%, 100% { opacity: 1; transform: translateX(0); }
}
.uc-decision-item:nth-child(1) { animation: ucDecReveal1 5.4s ease-out infinite; }
.uc-decision-item:nth-child(2) { animation: ucDecReveal2 5.4s ease-out infinite; }
.uc-decision-item:nth-child(3) { animation: ucDecReveal3 5.4s ease-out infinite; }

@keyframes ucActReveal1 {
  0%, 52% { opacity: 0.2; transform: translateX(-5px); }
  60%, 100% { opacity: 1; transform: translateX(0); }
}
@keyframes ucActReveal2 {
  0%, 56% { opacity: 0.2; transform: translateX(-5px); }
  64%, 100% { opacity: 1; transform: translateX(0); }
}
@keyframes ucActReveal3 {
  0%, 60% { opacity: 0.2; transform: translateX(-5px); }
  68%, 100% { opacity: 1; transform: translateX(0); }
}
.uc-action:nth-child(1) { animation: ucActReveal1 5.4s ease-out infinite; }
.uc-action:nth-child(2) { animation: ucActReveal2 5.4s ease-out infinite; }
.uc-action:nth-child(3) { animation: ucActReveal3 5.4s ease-out infinite; }

@keyframes ucDone1 {
  0%, 55% { background: #f1f5f9; color: #94a3b8; }
  62%, 100% { background: #dcfce7; color: #15803d; }
}
@keyframes ucDone2 {
  0%, 59% { background: #f1f5f9; color: #94a3b8; }
  66%, 100% { background: #dcfce7; color: #15803d; }
}
@keyframes ucDone3 {
  0%, 63% { background: #f1f5f9; color: #94a3b8; }
  70%, 100% { background: #dcfce7; color: #15803d; }
}
.uc-action:nth-child(1) .uc-action-status { animation: ucDone1 5.4s ease-out infinite; }
.uc-action:nth-child(2) .uc-action-status { animation: ucDone2 5.4s ease-out infinite; }
.uc-action:nth-child(3) .uc-action-status { animation: ucDone3 5.4s ease-out infinite; }
`;

export default function UseCaseAnimationStyles() {
    return <style dangerouslySetInnerHTML={{ __html: ucAnimationStyles }} />;
}
