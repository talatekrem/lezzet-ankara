import type { ReactNode } from 'react';
import Svg, { Circle, Path } from 'react-native-svg';

type MetaIconProps = {
  color: string;
  size?: number;
};

const STROKE = 1.6;

export function DistrictMetaIcon({ color, size = 16 }: MetaIconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M12 21s6-5.2 6-10.5a6 6 0 1 0-12 0C6 15.8 12 21 12 21z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={STROKE}
      />
      <Circle cx={12} cy={10.5} r={2.2} stroke={color} strokeWidth={STROKE} />
    </Svg>
  );
}

export function RatingMetaIcon({ color, size = 16 }: MetaIconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M12 4.5l2.2 4.6 5 .7-3.6 3.4.9 5.1L12 16.4 7.5 18.3l.9-5.1-3.6-3.4 5-.7L12 4.5z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={STROKE}
      />
    </Svg>
  );
}

export function ReviewMetaIcon({ color, size = 16 }: MetaIconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M6.5 6.5h11a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2H11l-4.5 3v-3h0a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={STROKE}
      />
      <Path
        d="M9 10.5h6M9 13h4"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={STROKE}
      />
    </Svg>
  );
}

export function HoursMetaIcon({ color, size = 16 }: MetaIconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Circle cx={12} cy={12} r={7.5} stroke={color} strokeWidth={STROKE} />
      <Path
        d="M12 8.25V12l2.8 2.2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={STROKE}
      />
    </Svg>
  );
}

export type DetailMetaIcon = (props: MetaIconProps) => ReactNode;
