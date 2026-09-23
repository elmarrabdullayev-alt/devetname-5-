import { mediaUrls } from '../data/invitation';

let sharedAudio: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => {
    try {
      listener();
    } catch {
      // ignore
    }
  });
}

export function getSharedAudio(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;

  if (!sharedAudio) {
    sharedAudio = new Audio(mediaUrls.invitationMusic);
    sharedAudio.loop = true;
    sharedAudio.preload = 'auto';

    sharedAudio.addEventListener('play', notifyListeners);
    sharedAudio.addEventListener('pause', notifyListeners);
    sharedAudio.addEventListener('ended', notifyListeners);
    sharedAudio.addEventListener('error', (e) => {
      console.warn(`Musiqi faylı tapılmadı və ya səsləndirilə bilmədi: "${mediaUrls.invitationMusic}"`, e);
      notifyListeners();
    });
  }

  return sharedAudio;
}

export function subscribeAudio(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export async function playSharedAudio(): Promise<boolean> {
  const audio = getSharedAudio();
  if (!audio) return false;

  try {
    await audio.play();
    notifyListeners();
    return true;
  } catch (error) {
    console.warn('Musiqi jesti tələb olunur və ya brauzer icazəsi gözlənilir:', error);
    notifyListeners();
    return false;
  }
}

export function pauseSharedAudio(): void {
  const audio = getSharedAudio();
  if (!audio) return;
  audio.pause();
  notifyListeners();
}

export function isSharedAudioPlaying(): boolean {
  if (!sharedAudio) return false;
  return !sharedAudio.paused && !sharedAudio.ended;
}
