# Design system

## Direction

Calm editorial landing page for a private massage practice. The hero combines approved photo 7 with restrained typography; spacing and the warm mineral palette carry the rest of the visual hierarchy.

## Visual language

- `#DEDDDB` is the page canvas, `#F9F3E7` the primary reading surface and `#D9C5BA` the quiet atmospheric field.
- `#866554` is the warm accent; `#513833` is used for ink, primary actions and the strongest surfaces.
- Manrope is used for Russian copy and controls. Original Surfer appears only as a small human accent.
- Corners use a consistent 16px radius. Dividers are 1px and shadows are used only where elevation is functional.
- Display text is capped at 6rem with tracking no tighter than `-0.04em`.

## Layout

- Desktop uses asymmetric editorial splits and full-width section fields.
- Mobile collapses every split to one readable column without horizontal scrolling.
- Pricing remains in scan-friendly rows; the visit process uses a sticky editorial sequence on desktop and a compact vertical sequence on mobile.

## Interaction

- Telegram is the primary action throughout the page; MAX is the secondary booking route in the contact section.
- The trust section stays typographic: Alexandra's confirmed 12 years of practice anchors the composition.
- Motion is limited to a restrained first-screen image reveal and subtle hover/focus feedback.
- Service rows expose a contextual Telegram action without turning the whole row into a hidden link.
- Yandex reviews use a dedicated consent surface. The external iframe does not exist in the document until the visitor checks the consent box and presses the load button.
- Focus rings, reduced-motion preferences and touch-sized controls are preserved.

## Image policy

Photo 7 is rendered as the main hero image with a responsive `object-fit: cover` crop. Other photographs are not rendered until the client approves their placement.
