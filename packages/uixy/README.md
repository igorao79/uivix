# @igorao79/uivix

A modern React + Tailwind CSS component library with 50+ animated components, text effects, and backgrounds.

## Installation

```bash
npm install @igorao79/uivix
```

**Peer dependencies:**

```bash
npm install react react-dom tailwindcss
```

## Quick Start

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from "@igorao79/uivix";

function App() {
  return (
    <Card variant="spotlight">
      <CardHeader>
        <CardTitle>Hello uivix</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="gradient">Click me</Button>
      </CardContent>
    </Card>
  );
}
```

## Components

### Form

| Component | Variants | Description |
|-----------|----------|-------------|
| `Button` | default, secondary, outline, ghost, destructive, link, gradient, glow, soft | Customizable button with loading state, icons |
| `Input` | default, filled, underline, floating, ghost, glow | Text input with label, error state, icons |
| `PasswordInput` | - | Password input with show/hide toggle |
| `SearchInput` | - | Search input with clear button |
| `OTPInput` | - | One-time password input with auto-advance |
| `Label` | - | Accessible form label |
| `Toggle` | default, ios, material, outline, glow, pill, slim, labeled | Toggle switch with multiple styles |

### Card

| Component | Variants | Description |
|-----------|----------|-------------|
| `Card` | default, bordered, elevated, ghost, gradient, glass, spotlight, neon, tilt, animated-border, noise, lifted | Card container with mouse-tracking effects |
| `CardHeader` | - | Card header section |
| `CardTitle` | - | Card heading |
| `CardDescription` | - | Card secondary text |
| `CardContent` | - | Card body |
| `CardFooter` | - | Card footer with flex layout |

### Text Animations

| Component | Description |
|-----------|-------------|
| `TypewriterText` | Typewriter effect with blinking cursor |
| `GradientText` | Animated gradient text colors |
| `GlitchText` | Periodic glitch/distortion effect |
| `ShimmerText` | Shimmer sweep across text |
| `WaveText` | Per-letter wave animation |
| `BlurText` | Blur-in reveal per word or letter |
| `CounterText` | Animated number counter |
| `MediaText` | Text with image/video fill |
| `SparklesText` | Floating sparkle particles around text |
| `HighlightText` | Animated marker highlight (7 styles: marker, underline, box, strikethrough, gradient, glow, bracket) |
| `ScrambleText` | Decoder-style scramble that resolves into the final text |
| `RotatingText` | Cycles through words with a slide-and-blur transition |

### Backgrounds

| Component | Description |
|-----------|-------------|
| `ParticleBackground` | Floating text/emoji/image nodes with connecting lines |
| `AuroraBackground` | Northern lights color animation |
| `GridBackground` | Animated dot/line grid |
| `StarfieldBackground` | Flying through stars effect |
| `WaveBackground` | Layered wave animation |
| `GradientMeshBackground` | Animated gradient mesh blobs |
| `MatrixRainBackground` | Matrix-style falling characters |
| `BokehBackground` | Blurred floating shapes (circle, hexagon, diamond, triangle, star, ring, mixed) |
| `PixelBackground` | Pixel art backgrounds (rain, life, terrain, noise) |
| `RippleBackground` | Expanding ripple circles |
| `DotPatternBackground` | Animated dot pattern |
| `RetroGridBackground` | 80s-style perspective grid |
| `MeteorBackground` | Falling meteor streaks |
| `BeamsBackground` | Animated light beams |

### Other

| Component | Variants | Description |
|-----------|----------|-------------|
| `Badge` | 16 variants (default, success, warning, destructive, glow, gradient, glass, neon, shimmer, premium, etc.) | Status badges with dot indicator |
| `Tooltip` | 10 variants (default, dark, light, gradient, glass, neon, success, warning, error, outlined) | Hover tooltip with arrow |
| `Avatar` | circle, square | Avatar with status dot (online, offline, busy, away) |
| `Progress` | - | Animated progress bar |
| `Skeleton` | - | Loading skeleton placeholder |
| `Separator` | - | Horizontal/vertical divider |
| `Marquee` | - | Scrolling content ticker |
| `Accordion` | single, multiple | Collapsible sections with animated height |
| `Tabs` | underline, pills | Tabbed panels |
| `Rating` | - | Interactive star rating (controlled, read-only) |
| `Slider` | - | Range slider with gradient fill and value bubble |
| `SegmentedControl` | sm, md, lg | iOS-style switcher with a sliding pill |
| `Stepper` | horizontal, vertical | Multi-step progress with animated connectors |

### Effects

| Component | Description |
|-----------|-------------|
| `SpotlightCard` | Card with a radial spotlight and border glow following the cursor |
| `TiltCard` | 3D tilt toward the cursor with a glare highlight |
| `FlipCard` | Two-sided card that flips on hover or click |
| `BorderBeam` | Beam of light travelling around a container's border |
| `MagneticButton` | Button pulled toward the cursor |
| `RippleButton` | Material-style ink ripple from the click point |
| `SwipeCards` | Tinder-style draggable card stack |
| `Lens` | Magnifying glass over an image |
| `AnimatedList` | Items pop in one by one, like a notification feed |
| `Loader` | Six loading indicators: spinner, dots, bars, pulse, orbit, square |

### Advanced

| Component | Description |
|-----------|-------------|
| `Dock` | macOS-style dock with cursor magnification |
| `CommandPalette` | Spotlight-style ⌘K menu with search and keyboard navigation |
| `Dialog` | Modal with backdrop blur, Escape-to-close and scroll lock |
| `ToastProvider` / `useToast` | Stacked, auto-dismissing notifications |
| `Calendar` | Month calendar with min/max and locale support |
| `Combobox` | Searchable select with keyboard navigation |
| `Timeline` | Vertical timeline with scroll-in animation |
| `ImageComparison` | Drag-to-reveal before/after slider |
| `OrbitingCircles` | Items orbiting a center element on concentric rings |
| `Confetti` | Canvas confetti burst fired via ref |

### Utilities

| Export | Description |
|--------|-------------|
| `cn()` | Utility function combining `clsx` + `tailwind-merge` |

## Usage Examples

### Button

```tsx
import { Button } from "@igorao79/uivix";

<Button variant="gradient" size="lg" loading>
  Submitting...
</Button>

<Button variant="glow" leftIcon={<StarIcon />}>
  Glow Button
</Button>
```

### Text Animations

```tsx
import { TypewriterText, GlitchText, HighlightText } from "@igorao79/uivix";

<TypewriterText words={["Hello", "World", "uivix"]} speed={100} />

<GlitchText intensity={5}>GLITCH</GlitchText>

<p>
  This is an <HighlightText variant="marker" color="rgba(139,92,246,0.4)">important concept</HighlightText> in design.
</p>
```

### Backgrounds

```tsx
import { AuroraBackground, BokehBackground, PixelBackground } from "@igorao79/uivix";

// Full-page aurora
<AuroraBackground />

// Bokeh with mixed shapes
<BokehBackground shape="mixed" count={20} />

// Pixel art Game of Life
<PixelBackground variant="life" pixelSize={6} />
```

### Card with Effects

```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter, Button } from "@igorao79/uivix";

// 3D tilt card
<Card variant="tilt">
  <CardHeader>
    <CardTitle>3D Tilt</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Move your mouse over me!</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Toggle & Tooltip

```tsx
import { Toggle, Tooltip, Badge } from "@igorao79/uivix";

<Toggle variant="ios" size="md" label="Dark Mode" />

<Tooltip content="Hello!" side="top" variant="gradient">
  <button>Hover me</button>
</Tooltip>

<Badge variant="premium" dot>PRO</Badge>
```

## Customization

All components accept `className` for Tailwind overrides:

```tsx
<Button className="bg-red-500 hover:bg-red-600 text-xl rounded-none">
  Custom Button
</Button>

<Card className="bg-blue-950 border-blue-500">
  Custom styled card
</Card>
```

## TypeScript

Full TypeScript support with exported types for all components:

```tsx
import type { ButtonProps, CardProps, TooltipVariant } from "@igorao79/uivix";
```

## License

MIT
