import styles from './ShelfDivider.module.css'

export default function ShelfDivider() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg
        className={styles.svg}
        viewBox="0 0 800 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Central hairline rule ── */}
        <line x1="0" y1="32" x2="800" y2="32" className={styles.rule} />

        {/* ── Left scrollwork arm ── */}
        {/* Main sweeping scroll - left */}
        <path
          d="M 310 32 C 295 32 285 26 278 20 C 271 14 268 8 260 7 C 252 6 246 11 246 18 C 246 25 251 30 258 30 C 263 30 267 27 267 23"
          className={styles.scroll}
        />
        {/* Inner counter-scroll */}
        <path
          d="M 310 32 C 300 32 292 36 287 41 C 282 46 281 52 275 54 C 269 56 264 52 264 47"
          className={styles.scroll}
        />
        {/* Tight inner curl */}
        <path
          d="M 246 18 C 246 14 249 11 253 11 C 257 11 260 14 260 18"
          className={styles.curlSmall}
        />
        {/* Secondary flourish arm */}
        <path
          d="M 295 32 C 290 29 284 25 278 22 C 272 19 268 15 262 14"
          className={styles.arm}
        />
        {/* Leaf accent */}
        <ellipse cx="263" cy="14" rx="4" ry="2.5" transform="rotate(-35 263 14)" className={styles.leaf} />

        {/* Outer rule cap — left */}
        <path d="M 180 32 L 310 32" className={styles.rule} />
        {/* Decorative knot left */}
        <circle cx="220" cy="32" r="2" className={styles.dot} />
        <circle cx="200" cy="32" r="1.2" className={styles.dotSmall} />
        {/* Terminal fleur-de-lis — left */}
        <g transform="translate(183, 32)">
          {/* Stem */}
          <line x1="0" y1="-7" x2="0" y2="7" className={styles.fleurStem} />
          {/* Centre petal */}
          <path d="M 0 -7 C -2 -11 -2 -16 0 -18 C 2 -16 2 -11 0 -7" className={styles.fleurPetal} />
          {/* Left petal */}
          <path d="M 0 -5 C -4 -7 -8 -6 -9 -4 C -8 -2 -4 -2 0 -4" className={styles.fleurPetal} />
          {/* Right petal */}
          <path d="M 0 -5 C 4 -7 8 -6 9 -4 C 8 -2 4 -2 0 -4" className={styles.fleurPetal} />
          {/* Collar band */}
          <line x1="-3" y1="-3" x2="3" y2="-3" className={styles.fleurCollar} />
          {/* Lower petal */}
          <path d="M 0 7 C -2 11 -2 15 0 17 C 2 15 2 11 0 7" className={styles.fleurPetal} />
          <line x1="-2.5" y1="5" x2="2.5" y2="5" className={styles.fleurCollar} />
        </g>

        {/* ── Right scrollwork arm (mirror) ── */}
        <path
          d="M 490 32 C 505 32 515 26 522 20 C 529 14 532 8 540 7 C 548 6 554 11 554 18 C 554 25 549 30 542 30 C 537 30 533 27 533 23"
          className={styles.scroll}
        />
        <path
          d="M 490 32 C 500 32 508 36 513 41 C 518 46 519 52 525 54 C 531 56 536 52 536 47"
          className={styles.scroll}
        />
        <path
          d="M 554 18 C 554 14 551 11 547 11 C 543 11 540 14 540 18"
          className={styles.curlSmall}
        />
        <path
          d="M 505 32 C 510 29 516 25 522 22 C 528 19 532 15 538 14"
          className={styles.arm}
        />
        <ellipse cx="537" cy="14" rx="4" ry="2.5" transform="rotate(35 537 14)" className={styles.leaf} />

        <path d="M 490 32 L 620 32" className={styles.rule} />
        <circle cx="580" cy="32" r="2" className={styles.dot} />
        <circle cx="600" cy="32" r="1.2" className={styles.dotSmall} />
        <g transform="translate(617, 32)">
          <line x1="0" y1="-7" x2="0" y2="7" className={styles.fleurStem} />
          <path d="M 0 -7 C -2 -11 -2 -16 0 -18 C 2 -16 2 -11 0 -7" className={styles.fleurPetal} />
          <path d="M 0 -5 C -4 -7 -8 -6 -9 -4 C -8 -2 -4 -2 0 -4" className={styles.fleurPetal} />
          <path d="M 0 -5 C 4 -7 8 -6 9 -4 C 8 -2 4 -2 0 -4" className={styles.fleurPetal} />
          <line x1="-3" y1="-3" x2="3" y2="-3" className={styles.fleurCollar} />
          <path d="M 0 7 C -2 11 -2 15 0 17 C 2 15 2 11 0 7" className={styles.fleurPetal} />
          <line x1="-2.5" y1="5" x2="2.5" y2="5" className={styles.fleurCollar} />
        </g>

        {/* ── Central cartouche medallion ── */}
        {/* Outer ring */}
        <ellipse cx="400" cy="32" rx="72" ry="24" className={styles.cartoucheOuter} />
        {/* Inner ring */}
        <ellipse cx="400" cy="32" rx="64" ry="18" className={styles.cartoucheInner} />
        {/* Cartouche end caps - left */}
        <path d="M 328 32 C 328 28 332 26 336 28 C 332 30 330 34 333 36 C 330 35 328 34 328 32 Z" className={styles.cartoucheCap} />
        {/* Cartouche end caps - right */}
        <path d="M 472 32 C 472 28 468 26 464 28 C 468 30 470 34 467 36 C 470 35 472 34 472 32 Z" className={styles.cartoucheCap} />
        {/* Top crown flourish */}
        <path d="M 390 8 C 393 5 397 4 400 4 C 403 4 407 5 410 8" className={styles.crownArc} />
        <circle cx="400" cy="4" r="2" className={styles.crownDot} />
        <circle cx="390" cy="9" r="1.5" className={styles.crownDot} />
        <circle cx="410" cy="9" r="1.5" className={styles.crownDot} />
        {/* Bottom anchor flourish */}
        <path d="M 390 56 C 393 59 397 60 400 60 C 403 60 407 59 410 56" className={styles.crownArc} />
        <circle cx="400" cy="60" r="2" className={styles.crownDot} />
        {/* Inner serif text - monogram */}
        <text
          x="400"
          y="37"
          textAnchor="middle"
          className={styles.monogram}
        >
          AC
        </text>
      </svg>
    </div>
  )
}
