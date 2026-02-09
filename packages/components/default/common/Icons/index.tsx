import type { LucideProps } from "lucide-react";
import React from "react";
import * as LucideIcons from "lucide-react";

export type NamedSize = "xs" | "sm" | "md" | "lg" | "xl";
export type IconName = keyof typeof LucideIcons;

export interface LucideIconProps extends Omit<LucideProps, "size"> {
  name: IconName;
  size?: number | string | NamedSize;
}

const SIZE_MAP: Record<NamedSize, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
};

/**
 * Resolves a size value to its numeric pixel equivalent
 * @param size - Size value to resolve (named size, number, or string)
 * @returns Resolved numeric size or undefined
 */
const resolveIconSize = (
  size?: number | string | NamedSize,
): number | undefined => {
  if (size === undefined) return undefined;

  if (typeof size === "number") return size;

  if (typeof size === "string") {
    // Check if it's a named size
    if (size in SIZE_MAP) return SIZE_MAP[size as NamedSize];

    // Check if it's a numeric string
    const numericSize = Number(size);
    if (!isNaN(numericSize)) return numericSize;
  }

  return undefined;
};

/**
 * LucideIcon component that renders a Lucide icon by name
 *
 * @example
 * // Basic usage
 * <LucideIcon name="Settings" />
 *
 * @example
 * // With named size
 * <LucideIcon name="User" size="md" />
 *
 * @example
 * // With custom color
 * <LucideIcon name="Heart" className="text-red" />
 */
/** @component */
export const LucideIcon: React.FC<LucideIconProps> = ({
  name,
  size,
  color,
  ...props
}) => {
  if (!name) {
    console.warn("No icon name provided to LucideIcon");
    return null;
  }

  // Ensure name is valid key of LucideIcons
  // Ensure name is valid key of LucideIcons
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Lucide icon "${name}" not found`);
    return null;
  }

  // Ensure it is a valid React component
  const isComponent = (val: unknown): val is React.ComponentType<unknown> => {
    if (!val) return false;
    if (typeof val === 'function') return true;

    // Check for standard React component properties securely
    if (typeof val === 'object' && val !== null) {
      const v = val as { $$typeof?: symbol };
      return (
        v.$$typeof === Symbol.for('react.forward_ref') ||
        v.$$typeof === Symbol.for('react.memo') ||
        v.$$typeof === Symbol.for('react.lazy')
      );
    }
    return false;
  };

  if (!isComponent(IconComponent)) {
    console.warn(`Lucide export "${name}" is not a valid React component`);
    return null;
  }

  try {
    const { name: _name, size: _size, color: _color, iconPosition: _iconPosition, ...rest } = props as Record<string, unknown>;

    // Only pass valid SVG/Lucide props to the icon component
    return (
      <IconComponent
        size={resolveIconSize(size)}
        color={color}
        {...rest}
      />
    );
  } catch (error) {
    console.error(`Error rendering Lucide icon "${name}":`, error);
    return null;
  }
};

export default LucideIcon;
