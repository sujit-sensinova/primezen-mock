// Mounts a hidden SVG <filter> that any element can reference via
// `filter: url(#primezen-ripple)`. The turbulence's baseFrequency is
// animated with SMIL so the ripple keeps undulating while applied,
// without any React/JS re-renders.

const DisplacementFilter = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
  >
    <defs>
      <filter
        id="primezen-ripple"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          numOctaves="2"
          seed="3"
          baseFrequency="0.012 0.018"
          result="noise"
        >
          <animate
            attributeName="baseFrequency"
            dur="7s"
            values="0.012 0.018; 0.022 0.028; 0.012 0.018"
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.16 1 0.3 1; 0.16 1 0.3 1"
          />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="18" />
      </filter>
    </defs>
  </svg>
);

export default DisplacementFilter;
