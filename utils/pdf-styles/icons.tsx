import React from 'react'
import { Svg, Path } from '@react-pdf/renderer'

interface IconProps {
  width?: number
  height?: number
  color?: string
  className?: string
}

export const GlobeIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </Svg>
)

export const GithubIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </Svg>
)

export const PresentationIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M19 3H5C3.89 3 3 3.9 3 5v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7v3h-3v-3H8l4-4 4 4h-3z" />
  </Svg>
)

export const MailIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </Svg>
)

export const PhoneIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </Svg>
)

export const LinkedinIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </Svg>
)

export const AwardIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" />
  </Svg>
)

export const ExternalLinkIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path 
      fill={color} 
      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const GraduationIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
  </Svg>
)

export const BuildingIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
  </Svg>
)

export const BriefcaseIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
  </Svg>
)

export const CircleIcon: React.FC<IconProps> = ({ width = 3, height = 3, color = '#A855F7' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path fill={color} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
  </Svg>
)

export const RightArrowIcon: React.FC<IconProps> = ({ width = 10, height = 10, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path 
      fill={color}
      d="M13.25 8.75L16.5 12l-3.25 3.25m-6.5-3.25h9.5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const TechStackIcon: React.FC<IconProps> = ({ width = 12, height = 12, color = '#475569' }) => (
  <Svg viewBox="0 0 24 24" width={width} height={height}>
    <Path
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 18L22 12L16 6M8 6L2 12L8 18"
    />
  </Svg>
) 