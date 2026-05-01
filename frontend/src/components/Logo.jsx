export default function Logo() {
  return (
    <svg width="90" height="90" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">

      {/* Flames (behind wok) */}
      {/* Left flame */}
      <path d="M28 88 C28 80 33 72 33 72 C33 72 38 80 38 88 Z" fill="#e53935"/>
      <path d="M30 88 C30 82 33 76 33 76 C33 76 36 82 36 88 Z" fill="#ff9800"/>

      {/* Center flame (tallest) */}
      <path d="M38 88 C38 76 44 63 44 63 C44 63 50 76 50 88 Z" fill="#e53935"/>
      <path d="M40 88 C40 78 44 68 44 68 C44 68 48 78 48 88 Z" fill="#ff9800"/>
      <path d="M42 88 C42 81 44 74 44 74 C44 74 46 81 46 88 Z" fill="#ffee58"/>

      {/* Right flame */}
      <path d="M50 88 C50 80 55 72 55 72 C55 72 60 80 60 88 Z" fill="#e53935"/>
      <path d="M52 88 C52 82 55 76 55 76 C55 76 58 82 58 88 Z" fill="#ff9800"/>

      {/* Wok body */}
      <path d="M16 39 Q14 62 44 70 Q74 62 72 39 Z" fill="#37474f"/>

      {/* Wok interior */}
      <path d="M22 39 Q20 58 44 65 Q68 58 66 39 Z" fill="#455a64"/>

      {/* Food inside */}
      <circle cx="36" cy="52" r="3.5" fill="#66bb6a"/>
      <circle cx="52" cy="57" r="3"   fill="#ff7043"/>
      <ellipse cx="43" cy="47" rx="4" ry="2" fill="#ffca28" transform="rotate(-15 43 47)"/>
      <circle cx="59" cy="51" r="2.5" fill="#4caf50"/>
      <circle cx="33" cy="60" r="2"   fill="#ef5350"/>

      {/* Wok rim */}
      <ellipse cx="44" cy="39" rx="28" ry="6.5" fill="#546e7a"/>
      <ellipse cx="44" cy="37.5" rx="24" ry="4" fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.5"/>

      {/* Long handle */}
      <line x1="70" y1="41" x2="99" y2="50" stroke="#1c313a" strokeWidth="10" strokeLinecap="round"/>
      <line x1="70" y1="41" x2="99" y2="50" stroke="#37474f" strokeWidth="7"  strokeLinecap="round"/>
      <line x1="82" y1="45" x2="99" y2="50" stroke="#546e7a" strokeWidth="2"  strokeLinecap="round" opacity="0.4"/>

      {/* Chopstick 1 */}
      <line x1="4"  y1="31" x2="66" y2="38" stroke="#c8922a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="52" y1="36" x2="66" y2="38" stroke="#7a4f1e" strokeWidth="3" strokeLinecap="round"/>

      {/* Chopstick 2 */}
      <line x1="4"  y1="40" x2="66" y2="47" stroke="#c8922a" strokeWidth="3" strokeLinecap="round"/>
      <line x1="52" y1="45" x2="66" y2="47" stroke="#7a4f1e" strokeWidth="3" strokeLinecap="round"/>

      {/* Steam */}
      <path d="M30 30 C28 23 32 16 30 9"  stroke="#a5d6a7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M44 27 C42 20 46 13 44 6"  stroke="#a5d6a7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M58 30 C56 23 60 16 58 9"  stroke="#a5d6a7" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
    </svg>
  );
}
