import React from 'react';

interface InstagramDirectIconProps {
  size?: number | string;
  className?: string;
  strokeWidth?: number;
  fill?: string;
}

/**
 * Official Instagram Direct / Messaging Paper Plane Icon
 * Geometry matches Instagram's exact vector path specification.
 */
export const InstagramDirectIcon: React.FC<InstagramDirectIconProps> = ({
  size = 24,
  className = '',
  strokeWidth = 2,
  fill = 'none',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="22" y1="3" x2="9.218" y2="10.083" />
      <polygon points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" />
    </svg>
  );
};
