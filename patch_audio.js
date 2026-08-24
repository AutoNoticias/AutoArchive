const fs = require('fs');
const file = 'src/components/AudioNarrator.tsx';
let code = fs.readFileSync(file, 'utf8');

const replacement = `
    // Set up the persistent HTMLAudioElement for true background/screen-off playback
    if (!globalBackgroundAudio) {
      globalBackgroundAudio = new Audio(SILENT_WAV_BASE64);
      globalBackgroundAudio.loop = true;
      globalBackgroundAudio.setAttribute('playsinline', 'true');
      (globalBackgroundAudio as any).playsInline = true; // For Safari compatibility
      globalBackgroundAudio.preload = 'auto';
      
      let lastTickTime = Date.now();
      globalBackgroundAudio.addEventListener('timeupdate', () => {
        const now = Date.now();
        // Fire a tick event every 2 seconds minimum to keep React / TTS awake
        if (now - lastTickTime > 2000) {
          lastTickTime = now;
          window.dispatchEvent(new CustomEvent('mobile-audio-background-tick'));
        }
      });
    }
`;

code = code.replace(/\/\/ Set up the persistent HTMLAudioElement.*?globalBackgroundAudio\.preload = 'auto';\n    \}/s, replacement.trim());
fs.writeFileSync(file, code);
