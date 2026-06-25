import Svg, { Circle, Path } from 'react-native-svg';

type TabIconProps = {
  color: string;
  focused: boolean;
  size?: number;
};

const STROKE_ACTIVE = 2;
const STROKE_INACTIVE = 1.6;

function strokeWidth(focused: boolean) {
  return focused ? STROKE_ACTIVE : STROKE_INACTIVE;
}

/** Ana ekran — ev */
export function HomeTabIcon({
  color,
  focused,
  size = 24,
}: TabIconProps) {
  const sw = strokeWidth(focused);

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M4.5 10.75 12 5l7.5 5.75"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={sw}
      />
      <Path
        d="M6.25 10.75V19.5h11.5V10.75"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={sw}
      />
      <Path
        d="M10.25 19.5v-4.75h3.5v4.75"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={focused ? sw : sw * 0.85}
      />
    </Svg>
  );
}

/** @deprecated Eski isim; Metro önbelleği için alias */
export const ExploreTabIcon = HomeTabIcon;

/** Ara — büyüteç */
export function SearchTabIcon({ color, focused, size = 24 }: TabIconProps) {
  const sw = strokeWidth(focused);

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Circle cx={10.5} cy={10.5} r={6.25} stroke={color} strokeWidth={sw} />
      <Path
        d="M15.2 15.2L20 20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={sw}
      />
    </Svg>
  );
}

/** Listem — yer imi / kayıtlı liste */
export function ListTabIcon({ color, focused, size = 24 }: TabIconProps) {
  const sw = strokeWidth(focused);

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M7 4.5h10a2 2 0 0 1 2 2v14.5l-7-4.25L5 21V6.5a2 2 0 0 1 2-2z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={sw}
      />
      {focused ? (
        <Path
          d="M9.5 9.5h5M9.5 12.5h3.5"
          stroke={color}
          strokeLinecap="round"
          strokeWidth={sw}
        />
      ) : null}
    </Svg>
  );
}

/** Hakkında — bilgi */
export function AboutTabIcon({ color, focused, size = 24 }: TabIconProps) {
  const sw = strokeWidth(focused);

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Circle cx={12} cy={12} r={8.75} stroke={color} strokeWidth={sw} />
      <Path
        d="M12 10.75v5.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={sw}
      />
      <Circle cx={12} cy={7.75} fill={color} r={1.1} />
    </Svg>
  );
}
