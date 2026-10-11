declare const spindle: any;

console.log("[Midnight Rose Theme] Backend worker starting...");

if (typeof spindle !== 'undefined') {
  if (spindle.onFrontendMessage) {
    spindle.onFrontendMessage((payload: any, userId?: string) => {
      if (payload?.type === 'ping') {
        spindle.sendToFrontend({ type: 'pong', timestamp: Date.now() }, userId);
      }
    });
  }
}
