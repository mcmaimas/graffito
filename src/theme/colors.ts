// chlorophyll levels
export type LeafColor = 'darkGreen' | 'green' | 'yellow' | 'orange' | 'red' | 'default';

export const color_randomizer: LeafColor[] = ['darkGreen', 'green', 'yellow', 'orange', 'red']

export const LEAF_COLOR_SCHEME: Record<LeafColor, string> = {
  darkGreen: "#8BA726",
  green: "#D9D32F",
  yellow: "#FFDB31",
  orange: "#FF9828",
  red: "#FF6034",
  default: "#FAF0E6"
}
