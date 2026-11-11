# Shehran design and animation handoff

Scope: a hand-built hero recreation plus a story-section example and reusable text animation. This is NOT a complete export of the full Framer website. Navigation overlays, all remaining sections, CMS, booking integration and existing third-party interactions are not exported.

## Fonts
- Headings: DM Serif Text, regular 400.
- Body, labels and buttons: DM Sans, 400 and 600.
- Hero headline: 64px desktop, 100% line height, uppercase.
- Section headline: 48px desktop, 120% line height.
- Body: 18px, 28px line height.
- Inter also appears in one project text style but is not the primary body font.

## Palette
Paper #EDE9E3; text #222222; accent #A32834; body #666666; white #FFFFFF.

## HTML
Rename shehran-html.txt to index.html and open it in a browser. CSS and JavaScript are included. Optional standalone CSS is supplied separately. Google Fonts requires a network connection.
Replace the example reservation email before launch.
Images reference the current project’s hosted assets; keep independent licensed copies for long-term use. Asset URL availability has not been independently tested.

## Framer
Create two new code files named SmoothText.tsx and RestaurantHero.tsx. Paste the matching downloaded file contents into each. Insert the desired component using Framer’s Assets panel.
SmoothText: choose DM Serif Text in its Font control, set the heading size, color, alignment and timing.
RestaurantHero: set width to Fill and height to Fit Content; choose the booking destination and images in its controls.
Ensure DM Serif Text and DM Sans remain enabled in the project.
The React hero is responsive but intentionally simpler than the original desktop left-rail layout. Use the HTML version as the closer desktop visual reference.
Animations use Framer Motion (available in Framer). No GSAP or SplitType dependency.
The text reveal runs once on entering view. Word stagger defaults to 70–85ms, duration 0.9–1.1s; hero image settles over 1.8s and badge rotates over 20s.
Reduced-motion preferences disable translation, image zoom and rotation. No scroll-jacking is used.

## Verification
The source page hero and typography were inspected. Downloaded examples have not been browser-rendered or compiled in this project. Existing page and code files were left unchanged.
