import Svg, { Path } from 'react-native-svg';

type ActionIconProps = {
  color: string;
  size?: number;
};

type HeartIconProps = ActionIconProps & {
  filled?: boolean;
};

export function HeartIcon({ color, filled = false, size = 20 }: HeartIconProps) {
  const path =
    'M12 20.25l-1.1-1C5.55 14.24 3 11.9 3 8.75 3 6.4 4.72 4.75 7 4.75c1.41 0 2.76.68 3.63 1.74L12 7.67l1.37-1.18C14.24 5.43 15.59 4.75 17 4.75 19.28 4.75 21 6.4 21 8.75c0 3.15-2.55 5.49-7.9 10.5L12 20.25z';

  if (filled) {
    return (
      <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
        <Path d={path} fill={color} />
      </Svg>
    );
  }

  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d={path}
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
    </Svg>
  );
}

export function ShareIcon({ color, size = 20 }: ActionIconProps) {
  return (
    <Svg fill="none" height={size} viewBox="0 0 24 24" width={size}>
      <Path
        d="M16 8l-4-4-4 4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
      <Path
        d="M12 4v9"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.6}
      />
      <Path
        d="M6 14v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
      />
    </Svg>
  );
}
