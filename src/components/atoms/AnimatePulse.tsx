function AnimatePulse({ children }: PageProps) {
  return <span className="animate-pulse">{children}</span>;
}

function AnimatePing({ children }: PageProps) {
  return <span className="animate-ping">{children}</span>;
}

function AnimateBounce({ children }: PageProps) {
  return <span className="animate-bounce">{children}</span>;
}

function AnimateSpin({ children }: PageProps) {
  return <span className="animate-spin">{children}</span>;
}

export { AnimateBounce, AnimatePing, AnimatePulse, AnimateSpin };
