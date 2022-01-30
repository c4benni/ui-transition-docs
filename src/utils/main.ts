
type MediaListener = (arg: {media: MediaQueryList, callback: (e: MediaQueryListEvent)=> void}) => void

export const mediaListener :MediaListener= ({ media, callback }) => {
  try {
    media.addEventListener("change", callback);
  } catch (e: any) {
    // older browser. Hey safari iphone 8!
    if (/undefined is not a function/i.test(e.message)) {
      media?.addListener?.(callback);
    }
  }
};
