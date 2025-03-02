
export const triggerHaptic = (pattern: number | number[] = 50) => {
  if ("vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      console.log("Haptic feedback not supported", e);
    }
  }
};
