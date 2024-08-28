interface Document {
  startViewTransition?: (callback: () => void) => Readonly<{ ready: Promise }>;
}
