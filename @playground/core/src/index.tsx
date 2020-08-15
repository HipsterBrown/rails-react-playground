import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
  /** Custom emphasized text for the Thing  */
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A cool Thing to use in your app!
 */
export const Thing: FC<Props> = ({ children, ...rest }) => {
  return (
    <p {...rest}>
      <em>{children || `the snozzberries taste like snozzberries`}</em>
    </p>
  );
};
