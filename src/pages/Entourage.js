import React from 'react';
import useScrollAnimation from '../hooks/useScrollAnimation';
import './Entourage.css';

/* ── Retro SVG decorations ── */
const CompassRose = () => (
  <svg viewBox="0 0 120 120" fill="none" className="ent-compass-svg">
    <circle cx="60" cy="60" r="52" stroke="#d4af37" strokeWidth="1" opacity="0.25" />
    <circle cx="60" cy="60" r="44" stroke="#d4af37" strokeWidth="0.7" opacity="0.2" />
    <circle cx="60" cy="60" r="4" fill="#d4af37" opacity="0.2" />
    {/* N */}
    <polygon points="60,10 55,30 60,25 65,30" fill="#d4af37" opacity="0.2" />
    {/* S */}
    <polygon points="60,110 55,90 60,95 65,90" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.2" />
    {/* E */}
    <polygon points="110,60 90,55 95,60 90,65" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.2" />
    {/* W */}
    <polygon points="10,60 30,55 25,60 30,65" stroke="#d4af37" strokeWidth="0.7" fill="none" opacity="0.2" />
    <line x1="60" y1="8" x2="60" y2="4" stroke="#d4af37" strokeWidth="1" opacity="0.2" />
    <line x1="60" y1="116" x2="60" y2="112" stroke="#d4af37" strokeWidth="1" opacity="0.2" />
    <line x1="4" y1="60" x2="8" y2="60" stroke="#d4af37" strokeWidth="1" opacity="0.2" />
    <line x1="112" y1="60" x2="116" y2="60" stroke="#d4af37" strokeWidth="1" opacity="0.2" />
  </svg>
);

const AnchorIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="ent-deco-svg">
    <circle cx="30" cy="12" r="5" stroke="#d4af37" strokeWidth="1.8" />
    <line x1="30" y1="17" x2="30" y2="50" stroke="#d4af37" strokeWidth="1.8" />
    <path d="M16 42 Q16 50 30 52 Q44 50 44 42" stroke="#d4af37" strokeWidth="1.8" fill="none" />
    <line x1="22" y1="30" x2="38" y2="30" stroke="#d4af37" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M14 42 L16 42" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
    <path d="M44 42 L46 42" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PlaneIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="ent-deco-svg">
    <path d="M48 18 L28 30 L12 26 L16 30 L28 32 L28 44 L24 48 L28 46 L32 48 L28 44 L28 32 L48 38 L50 34 L32 30 L48 18Z" stroke="#d4af37" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
    <path d="M10 20 Q6 22 8 24" stroke="#d4af37" strokeWidth="1" fill="none" strokeLinecap="round" />
    <path d="M6 16 Q2 18 4 20" stroke="#d4af37" strokeWidth="0.8" fill="none" strokeLinecap="round" />
  </svg>
);

const RingsIcon = () => (
  <svg viewBox="0 0 60 60" fill="none" className="ent-deco-svg">
    <circle cx="22" cy="30" r="12" stroke="#d4af37" strokeWidth="1.5" />
    <circle cx="38" cy="30" r="12" stroke="#d4af37" strokeWidth="1.5" />
    <circle cx="22" cy="24" r="2" fill="#d4af37" opacity="0.4" />
  </svg>
);

/* ── Data ── */
const entourageData = {
  groom: { role: 'Groom', name: 'Mark Demphrie R. Jayo' },
  bride: { role: 'Bride', name: 'Shayne Penales' },
  groomParents: {
    role: "Groom's Parents",
    names: ['Ricardo B. Jayo', 'Demphna R. Jayo']
  },
  brideParents: {
    role: "Bride's Parents",
    names: ['Solomon L. Ybañez', 'Susan P. Ybañez']
  },
  bestMan: { role: 'Best Man', name: 'Roland R. Devilleres' },
  maidOfHonor: { role: 'Maid of Honor', name: 'Lutta B. Devilleres' },
  groomsmen: {
    role: 'Groomsmen',
    names: [
      'Joshua P. Ybañez',
      'Kristoffer Alex C. Vergara',
      'Jesus T. Bilbao, Jr',
      'Marly Shan B. Penales',
      'Kyle C. Golosinda'
    ]
  },
  bridesmaids: {
    role: 'Bridesmaids',
    names: [
      'Krishnaprem Y. Meniano',
      'Mary Charm Emerald J. Vergara',
      'Shahonney J. Bilbao',
      'Jackie J. Asis',
      'Lillianne Vianney B. Golosinda'
    ]
  },
  banner: { role: 'Banner', name: 'Blessly Rihanna Charmaine J. Vergara' },
  bibleBearer: { role: 'Bible Bearer', name: 'Ric Noah Kristoff J. Vergara' },
  coinBearer: { role: 'Coin Bearer', name: 'Ead Lucas G. Achas' },
  ringBearer: { role: 'Ring Bearer', name: 'Markuz Miguel J. Vergara' },
  flowerGirls: {
    role: 'Flower Girls',
    names: [
      'Lenna G. Pocon',
      'Alexa Ava J. Vergara',
      'Lara Gia B. Devilleres'
    ]
  }
};

const principalSponsors = [
  { mr: 'Mr. Leonardo S. Golosinda', mrs: 'Mrs. Rufina C. Golosinda' },
  { mr: 'Mr. Nathaniel G. Galvez', mrs: 'Mrs. Rhodora Y. Galvez' },
  { mr: 'Mr. Yolando S. Meniano', mrs: 'Mrs. Methosa Y. Meniano' },
  { mr: 'Mr. Roel T. Borres', mrs: 'Mrs. Mary Ann A. Borres' },
  { mr: 'Mr. Nestor B. Pomicpic', mrs: 'Mrs. Precella R. Pomicpic' },
  { mr: 'Mr. Jemuel A. Racines', mrs: 'Mrs. Sarah P. Racines' },
  { mr: 'Mr. Alexander A. Vergara', mrs: 'Mrs. Ma. Imelda C. Vergara' },
  { mr: 'Mr. Francisco M. Magallon', mrs: 'Mrs. Josephine M. Magallon' },
  { mr: 'Mr. Dionisio G. Genalo', mrs: 'Mrs. Leonarda C. Genalo' },
  { mr: 'Mr. Joseph M. Rodriguez', mrs: 'Mrs. Concepcion A. Rodriguez' },
  { mr: 'Mr. Vicente C. Verdida', mrs: 'Mrs. Lorecil D. Verdida' },
  { mr: 'Mr. Leonardo C. Mahinay', mrs: 'Mrs. Niña May D. Mahinay' },
  { mr: 'Mr. Ricky G. Manisan', mrs: 'Mrs. Lolita A. Manisan' },
  { mr: 'Mr. Jay J. Lafuente', mrs: 'Mrs. Jennifer C. Lafuente' },
  { mr: 'Mr. Peter A. Racines', mrs: null }
];

const secondarySponsors = {
  veil: {
    role: 'Veil',
    subtitle: 'To cloth us together',
    names: ['Mr. Christian A. Jayo', 'Mrs. Charlene C. Jayo']
  },
  cord: {
    role: 'Cord',
    subtitle: 'To bind us as one',
    names: ['Mr. Glenn A. Caibigan', 'Mrs. Pauline Erika C. Caibigan']
  },
  candle: {
    role: 'Candle',
    subtitle: 'To light our path',
    names: ['Mr. Jessie T. Pocon', 'Mrs. Mary Rose G. Pocon']
  }
};

/* ── Helper: renders a role block ── */
const RoleBlock = ({ role, names, name, delay = 0 }) => (
  <div className="ent-role-block" data-animate="fade-up" data-delay={delay}>
    <h4 className="ent-role-label">{role}</h4>
    {name && <p className="ent-name">{name}</p>}
    {names && names.map((n, i) => <p key={i} className="ent-name">{n}</p>)}
  </div>
);

/* ── Component ── */
const Entourage = () => {
  useScrollAnimation();

  const d = entourageData;

  return (
    <div className="entourage-page">
      {/* Hero */}
      <section className="ent-hero">
        <div className="container">
          <div className="ent-hero-decos">
            <RingsIcon />
            <AnchorIcon />
          </div>
          <h1 className="ent-hero-title" data-animate="fade-up">Entourage</h1>
          <div className="ent-hero-divider" />
          <p className="ent-hero-subtitle" data-animate="fade-up" data-delay="0.15">
            The people who make our love story complete
          </p>
        </div>
      </section>

      {/* ── Couple & Parents ── */}
      <section className="ent-section section">
        <div className="container">
          <div className="ent-couple-grid" data-animate="fade-up">
            {/* Groom side */}
            <div className="ent-couple-col">
              <RoleBlock role={d.groom.role} name={d.groom.name} delay={0} />
              <RoleBlock role={d.groomParents.role} names={d.groomParents.names} delay={0.1} />
            </div>
            {/* Bride side */}
            <div className="ent-couple-col">
              <RoleBlock role={d.bride.role} name={d.bride.name} delay={0.05} />
              <RoleBlock role={d.brideParents.role} names={d.brideParents.names} delay={0.15} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Best Man & Maid of Honor ── */}
      <section className="ent-section section">
        <div className="container">
          <div className="ent-pair-grid" data-animate="fade-up">
            <RoleBlock role={d.bestMan.role} name={d.bestMan.name} delay={0} />
            <RoleBlock role={d.maidOfHonor.role} name={d.maidOfHonor.name} delay={0.1} />
          </div>
        </div>
      </section>

      {/* ── Groomsmen & Bridesmaids ── */}
      <section className="ent-section section">
        <div className="container">
          <div className="ent-pair-grid" data-animate="fade-up">
            <RoleBlock role={d.groomsmen.role} names={d.groomsmen.names} delay={0} />
            <RoleBlock role={d.bridesmaids.role} names={d.bridesmaids.names} delay={0.1} />
          </div>
        </div>
      </section>

      {/* ── Special Roles ── */}
      <section className="ent-section section">
        <div className="container">
          <div className="ent-special-grid">
            <RoleBlock role={d.banner.role} name={d.banner.name} delay={0} />
            <RoleBlock role={d.bibleBearer.role} name={d.bibleBearer.name} delay={0.08} />
            <div className="ent-pair-grid ent-pair-compact" data-animate="fade-up" data-delay="0.16">
              <div className="ent-role-block">
                <h4 className="ent-role-label">{d.coinBearer.role}</h4>
                <p className="ent-name">{d.coinBearer.name}</p>
              </div>
              <div className="ent-role-block">
                <h4 className="ent-role-label">{d.ringBearer.role}</h4>
                <p className="ent-name">{d.ringBearer.name}</p>
              </div>
            </div>
            <RoleBlock role={d.flowerGirls.role} names={d.flowerGirls.names} delay={0.24} />
          </div>
        </div>
      </section>

      {/* ── Divider with travel deco ── */}
      <div className="ent-divider-row">
        <PlaneIcon />
        <div className="ent-dashed-line" />
        <AnchorIcon />
      </div>

      {/* ── Principal Sponsors ── */}
      <section className="ent-section ent-sponsors-section section">
        <div className="container">
          <h2 className="ent-script-title" data-animate="fade-up">Principal Sponsors</h2>
          <div className="ent-sponsors-list">
            {principalSponsors.map((pair, i) => (
              <div key={i} className="ent-sponsor-row" data-animate="fade-up" data-delay={i * 0.05}>
                <span className="ent-sponsor-name">{pair.mr}</span>
                {pair.mrs && <span className="ent-sponsor-name">{pair.mrs}</span>}
              </div>
            ))}
          </div>
          <div className="ent-compass-watermark">
            <CompassRose />
          </div>
        </div>
      </section>

      {/* ── Secondary Sponsors ── */}
      <section className="ent-section ent-secondary-section section">
        <div className="container">
          <h2 className="ent-script-title" data-animate="fade-up">Secondary Sponsors</h2>
          <div className="ent-secondary-grid">
            {Object.values(secondarySponsors).map((sponsor, i) => (
              <div key={i} className="ent-secondary-card" data-animate="fade-up" data-delay={i * 0.12}>
                <div className="ent-secondary-accent" />
                <h4 className="ent-secondary-role">{sponsor.role}</h4>
                <p className="ent-secondary-subtitle">{sponsor.subtitle}</p>
                <div className="ent-secondary-divider" />
                {sponsor.names.map((name, j) => (
                  <p key={j} className="ent-secondary-name">{name}</p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Entourage;
