type MediaListener = (arg: {
  media: MediaQueryList;
  callback: (e: MediaQueryListEvent) => void;
}) => void;

export const mediaListener: MediaListener = ({ media, callback }) => {
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

export function copy(arg: {
  text: string;
  done?: () => void;
  onSuccess: () => void;
  onError: () => void;
}): Promise<boolean> {
  const {
    text,
    done = () => {},
    onSuccess = () => {},
    onError = () => {},
  } = arg;

  return new Promise((r) => {
    const oldBrowser = () => {
      try {
        let psuedoInput = document.createElement("input");
        psuedoInput.classList.add("sr-only");
        psuedoInput.setAttribute("tabindex", "-1");
        psuedoInput.setAttribute("aria-hidden", "true");
        psuedoInput.value = text;
        document.body.appendChild(psuedoInput);
        psuedoInput.select();

        document.execCommand("copy");
        document.body.removeChild(psuedoInput);
        onSuccess();
        r(true);
      } catch (e) {
        if (e) {
          onError();
          r(false);
        }
      } finally {
        done();
      }
    };

    if ("clipboard" in navigator) {
      try {
        navigator.clipboard.writeText(text);
        onSuccess();
        done();

        r(true);
      } catch (e) {
        if (e) {
          oldBrowser();
        }
      }
    } else oldBrowser();
  });
}
