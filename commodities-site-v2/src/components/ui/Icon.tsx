import {
  Building2,
  Cable,
  Car,
  ClipboardCheck,
  Cog,
  Factory,
  Handshake,
  HardHat,
  Layers,
  Magnet,
  Milk,
  MonitorSmartphone,
  Network,
  Package,
  Recycle,
  Ship,
  Trees,
  Truck,
  Warehouse,
  Zap,
  type LucideIcon,
  type LucideProps,
} from 'lucide-react';

/** Content icon names → icon components. Category icons can be swapped for a custom set later. */
const registry: Record<string, LucideIcon> = {
  ferrous: Magnet,
  'non-ferrous': Cable,
  elv: Car,
  weee: MonitorSmartphone,
  plastics: Milk,
  fibre: Package,
  wood: Trees,
  bulk: Layers,
  truck: Truck,
  factory: Factory,
  handshake: Handshake,
  ship: Ship,
  network: Network,
  cog: Cog,
  car: Car,
  clipboard: ClipboardCheck,
  hardhat: HardHat,
  recycle: Recycle,
  warehouse: Warehouse,
  zap: Zap,
  building: Building2,
};

type Props = LucideProps & { name: string };

export function Icon({ name, size = 24, strokeWidth = 1.75, ...rest }: Props) {
  const Cmp = registry[name] ?? Layers;
  return (
    <Cmp aria-hidden="true" focusable="false" size={size} strokeWidth={strokeWidth} {...rest} />
  );
}
