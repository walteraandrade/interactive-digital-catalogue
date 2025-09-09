export default function WarningIcon({ size = 48, title = "Warning", className = "", ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>{title}</title>

      {/* optional soft drop shadow */}
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feOffset result="offOut" in="SourceAlpha" dx="0" dy="1" />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="1" />
          <feColorMatrix result="matrixOut" in="blurOut" type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0.2"/>
          <feBlend in="SourceGraphic" in2="matrixOut" mode="normal"/>
        </filter>
      </defs>

      {/* yellow triangle with black stroke */}
      <path
        d="M32 6 L58 52 H6 Z"
        fill="#FFEB3B"
        stroke="#000"
        strokeWidth="3"
        strokeLinejoin="round"
        strokeLinecap="round"
        filter="url(#shadow)"
      />

      {/* exclamation vertical bar */}
      <rect
        x="30.2"
        y="18"
        width="3.6"
        height="18"
        rx="1.2"
        fill="#000"
      />

      {/* exclamation dot */}
      <circle cx="32" cy="44.5" r="3.5" fill="#000" />
    </svg>
  );
}
