# Wedding Site Overhaul Design

**Date:** 2026-02-14
**Couple:** Shayne and Mark
**Wedding:** Wednesday, February 25, 2026 at 9AM
**Ceremony:** Our Lady of Mount Carmel Parish Church, J.V. Serina St. Carmen, CDO City
**Reception:** Somewhere by Casa de Canitoan, Canitoan-Macapagal Drive, CDO City

## Approach

Phased overhaul — 4 phases tackled sequentially, each testable independently.

---

## Phase 1: Navbar Redesign

### Problems
- Confusing navigation structure
- Outdated visual design
- Clunky mobile menu (full-screen overlay)
- No active page indicator
- FAQ and Contact pages exist but removed from nav

### Desktop Design (>768px)
- Fixed top bar with "Shayne & Mark" on the left
- Horizontal nav links with dropdown grouping:
  - **Home** | **Our Story** | **Wedding** (dropdown: Details, Schedule, Dress Code) | **Guests** (dropdown: RSVP, Guestbook, Gallery, Photo Share) | **Info** (dropdown: FAQ, Contact)
- Active page highlighted with gold underline
- Glass-morphism background on scroll (existing behavior, refined)

### Mobile Design (<768px)
- Slim top bar with "Shayne & Mark" + hamburger icon
- Slide-in drawer from the right (not full-screen overlay)
- Collapsible sections matching desktop groups
- Active page highlighted with background color
- Backdrop overlay that closes menu on tap
- Smooth close animation on link tap

### Styling
- Keep gold (#d4af37) accent and Playfair Display font
- Cleaner spacing, subtle hover animations
- Active route indicator: gold underline (desktop), highlighted bg (mobile)

---

## Phase 2: Interactive Map

### Problems
- Basic Google Maps iframe showing only one location
- No interactivity
- Doesn't match site design

### Technology
Leaflet.js — free, no API key required, lightweight

### Features
- Custom-styled map tiles (elegant/muted to match wedding theme)
- Multiple markers with custom gold pins:
  - Ceremony: Our Lady of Mount Carmel Parish Church
  - Reception: Somewhere by Casa de Canitoan
- Clickable popups on each marker: venue name, address, event time
- "Get Directions" buttons inside popups (Google Maps + Waze)
- Map container: rounded corners, gold border, matching site aesthetic
- Responsive with touch/pinch zoom on mobile

---

## Phase 3: Fix Broken Routes & Links

### Issues
- Footer references pages that don't exist: Wedding Party, Travel, Registry
- FAQ and Contact pages exist but aren't in navbar or routes
- Content across site uses placeholder/incorrect details

### Changes
- Remove dead footer links (Wedding Party, Travel, Registry)
- Add FAQ and Contact routes back to App.js
- Add FAQ and Contact to navbar under "Info" group
- Update all content site-wide to match real invitation:
  - Wedding time: 9AM (not whatever placeholder exists)
  - Venue names: correct church and reception names
  - Attire: Principal Sponsors (Barong/Filipiniana in neutrals), Guests (formal gray, no jeans, no white)
  - Gifts: monetary preference
  - Special notes: no uninvited kids, no plus ones

---

## Phase 4: Visual Polish & Backend Fixes

### Visual
- Consistent animations and transitions across all pages
- Update couple names to "Shayne and Mark" everywhere
- Clean up Schedule page to match real wedding timeline

### Backend
- Fix RSVP form — add email field for notifications
- Fix or remove weather widget (currently shows fake data)
- Move hardcoded email credentials to environment variables

---

## Implementation Order

1. Phase 1 (Navbar) — foundation for all navigation
2. Phase 2 (Map) — independent feature enhancement
3. Phase 3 (Routes) — content fixes depend on navbar being done
4. Phase 4 (Polish) — final pass after structure is solid
