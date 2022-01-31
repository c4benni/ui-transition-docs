
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


export function isHTML(el: any) {
  return el instanceof HTMLElement;
}

export function nextAnimFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve);
  });
}

export const undefinedProp = (type: any | any[]) => ({
  type,
  default: undefined,
});

export const requiredProp = (type: any | any[]) => ({
  type,
  required: true,
});

export const undefinedStringProp = undefinedProp(String);
export const requiredStringProp = requiredProp(String);
