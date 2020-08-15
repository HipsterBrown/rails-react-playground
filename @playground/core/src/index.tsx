import React, { FC, HTMLAttributes, ReactChild } from 'react';

export interface Props extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing: FC<Props> = ({ children, ...rest }) => {
  return (
    <p {...rest}>
      <em>{children || `the snozzberries taste like snozzberries`}</em>
    </p>
  );
};
