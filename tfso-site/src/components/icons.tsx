// Векторные иконки (стиль lucide): stroke="currentColor", 24x24, strokeWidth 2
import type { ReactNode } from 'react'

type IconProps = { className?: string }

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

/* ── Алиасы в стиле новой версии (newlook) ── */
export const LayersIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M12 3 2 8l10 5 10-5-10-5Z" />
    <path d="m2 16 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
)
export const Svg = ({ children, className = 'h-5 w-5', strokeWidth = 1.8 }: IconProps & { children: ReactNode; strokeWidth?: number }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
)

export const IconCalendar = CalendarAlias
export const IconTrophy = TrophyAlias
export const IconMap = MapAlias
export const IconLayers = LayersAlias
export const IconCompass = CompassAlias
export const IconFile = FileAlias
export const IconUsers = UsersAlias
export const IconPin = PinAlias
export const IconMail = MailAlias
export const IconPhone = PhoneAlias
export const IconArrow = ArrowAlias
export const IconClock = ClockAlias
export const IconAlert = AlertAlias
export const IconX = XAlias
export const IconMenu = MenuAlias
export const IconUp = UpAlias
export const IconCheck = CheckAlias
export const IconSend = SendAlias
export const IconFlag = FlagAlias

function CalendarAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="4.6" width="18" height="16.4" rx="2.6" />
      <path d="M3 9.6h18M8 2.8v3.4M16 2.8v3.4" />
    </Svg>
  )
}
function TrophyAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M7 4h10v5a5 5 0 0 1-10 0V4Z" />
      <path d="M7 5.5H4.5V7a3.5 3.5 0 0 0 3 3.46M17 5.5h2.5V7a3.5 3.5 0 0 1-3 3.46" />
      <path d="M12 14v3.5M8.5 20.5h7M10 17.5h4l.7 3H9.3l.7-3Z" />
    </Svg>
  )
}
function MapAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M9 3.5 3.6 5.7A1 1 0 0 0 3 6.63v12.2a1 1 0 0 0 1.36.93L9 18l6 2.5 5.4-2.2a1 1 0 0 0 .6-.93V5.17a1 1 0 0 0-1.36-.93L15 6 9 3.5Z" />
      <path d="M9 3.5v14.6M15 6v14.5" />
    </Svg>
  )
}
function LayersAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3.5 12.5 8.5 4.7 8.5-4.7M3.5 16.8l8.5 4.7 8.5-4.7" />
    </Svg>
  )
}
function CompassAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="m15.6 8.4-2 5.2-5.2 2 2-5.2 5.2-2Z" />
    </Svg>
  )
}
function FileAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 2.8H7a2 2 0 0 0-2 2v14.4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.8l-5-5Z" />
      <path d="M14 2.8v5h5M9 13h6M9 16.6h4" />
    </Svg>
  )
}
function UsersAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M16 20v-1.6a4 4 0 0 0-4-4H6.5a4 4 0 0 0-4 4V20" />
      <circle cx="9.2" cy="7.4" r="3.4" />
      <path d="M21.5 20v-1.6a4 4 0 0 0-3-3.86M15.6 4.2a3.4 3.4 0 0 1 0 6.4" />
    </Svg>
  )
}
function PinAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M20 10.4c0 5.4-8 11.6-8 11.6s-8-6.2-8-11.6a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.2" r="2.9" />
    </Svg>
  )
}
function MailAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="2.6" y="4.8" width="18.8" height="14.4" rx="2.4" />
      <path d="m3.4 7 7.5 5.4a2 2 0 0 0 2.2 0L20.6 7" />
    </Svg>
  )
}
function PhoneAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21.4 16.9v2.6a1.8 1.8 0 0 1-2 1.8 17.8 17.8 0 0 1-7.8-2.8 17.5 17.5 0 0 1-5.4-5.4A17.8 17.8 0 0 1 3.4 5.2a1.8 1.8 0 0 1 1.8-2h2.6a1.8 1.8 0 0 1 1.8 1.55c.12.9.34 1.79.66 2.63a1.8 1.8 0 0 1-.4 1.9L8.7 10.5a14.4 14.4 0 0 0 5.4 5.4l1.15-1.16a1.8 1.8 0 0 1 1.9-.4c.85.32 1.73.54 2.64.66a1.8 1.8 0 0 1 1.55 1.8Z" />
    </Svg>
  )
}
function ArrowAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4.5 12h15M13.2 5.7 19.5 12l-6.3 6.3" />
    </Svg>
  )
}
function ClockAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.2" />
      <path d="M12 6.8V12l3.4 2" />
    </Svg>
  )
}
function AlertAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M10.3 3.6 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.6a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9.2v4.4M12 17.2h.01" />
    </Svg>
  )
}
function XAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  )
}
function MenuAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </Svg>
  )
}
function UpAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 19.5V5M5.7 11.3 12 5l6.3 6.3" />
    </Svg>
  )
}
function CheckAlias(p: IconProps) {
  return (
    <Svg {...p} strokeWidth={2.4}>
      <path d="m4.5 12.5 5 5 10-11" />
    </Svg>
  )
}
function SendAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M21.3 3.4 10.8 13.9M21.3 3.4l-6.9 18-3.6-7.5-7.5-3.6 18-6.9Z" />
    </Svg>
  )
}
function FlagAlias(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M5 21.5V4M5 4.8h11.5l-2 3.6 2 3.6H5" />
    </Svg>
  )
}

export const CalendarIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Icon>
)

export const FlagIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </Icon>
)

export const MapIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
    <path d="M15 5.754v15M9 3.246v15" />
  </Icon>
)

export const CompassIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </Icon>
)

export const AlertTriangleIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </Icon>
)

export const XIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Icon>
)

export const MenuIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </Icon>
)

export const ArrowRightIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </Icon>
)

export const FileTextIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4M16 13H8M16 17H8M10 9H8" />
  </Icon>
)

export const UsersIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </Icon>
)

export const TrophyIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </Icon>
)

export const MapPinIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
)

export const MailIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </Icon>
)

export const PhoneIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </Icon>
)

export const SendIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M14.536 21.686a.5.5 0 0 0 .653-.653l-6.5-12a.5.5 0 0 0-.892.027L6.35 15.65l-5.007 1.88a.5.5 0 0 0 .027.892z" />
    <path d="m18 2 4 4-9.4 1.6" />
  </Icon>
)

export const CheckCircleIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M21.801 10A10 10 0 1 1 17 3.335" />
    <path d="m9 11 3 3L22 4" />
  </Icon>
)

export const LoaderIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M12 2v4.8M12 17.2V22M4.93 4.93l3.4 3.4M15.68 15.68l3.4 3.4M2 12h4.8M17.2 12H22M4.93 19.07l3.4-3.4M15.68 8.32l3.4-3.4" />
  </Icon>
)

export const ImageOffIcon = ({ className }: IconProps) => (
  <Icon className={className}>
    <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11.3" />
    <path d="M21 15v3a3 3 0 0 1-.5 1.5l-8.37-8.37" />
    <path d="m21 21-6-6" />
    <circle cx="9" cy="9" r="2" />
  </Icon>
)
