import {
  ClipboardCheck,
  Factory,
  Handshake,
  HardHat,
  Leaf,
  Recycle,
  Scale,
  ShieldCheck,
  Ship,
  Truck,
  Users,
} from 'lucide-react';

/**
 * Maps icon names used in src/data/*.js to lucide-react components.
 * Only icons listed here are bundled. Add new names here when the data needs them.
 */
const ICONS = {
  ClipboardCheck,
  Factory,
  Handshake,
  HardHat,
  Leaf,
  Recycle,
  Scale,
  ShieldCheck,
  Ship,
  Truck,
  Users,
};

/** Decorative icon (hidden from screen readers; pair it with visible text). */
export default function Icon({ name, size = 28, className = '' }) {
  const Component = ICONS[name] ?? Recycle;
  return <Component size={size} strokeWidth={1.75} aria-hidden="true" className={className} />;
}
