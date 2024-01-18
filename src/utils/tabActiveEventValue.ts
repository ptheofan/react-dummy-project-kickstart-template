
export default function tabActiveEventValue() {
  let hidden, eventName;
  if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
    hidden = "hidden";
    eventName = "visibilitychange";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } else if (typeof (document as any).msHidden !== "undefined") {
    hidden = "msHidden";
    eventName = "msvisibilitychange";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } else if (typeof (document as any).webkitHidden !== "undefined") {
    hidden = "webkitHidden";
    eventName = "webkitvisibilitychange";
  } else {
    hidden = "";
    eventName = "";
  }
  return { hidden, eventName };
}
