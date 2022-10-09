import { FC, HTMLAttributes, PropsWithChildren } from 'react';

export type Props = PropsWithChildren<HTMLAttributes<HTMLParagraphElement>>

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A cool Thing to use in your app!
 */
export const Thing: FC<Props> = ({ children, ...rest }) => {
  return (
    <p {...rest}>
      <em>{children || `Some content required`}</em>
    </p>
  );
};

export default Thing;
