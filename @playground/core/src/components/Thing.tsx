import { splitProps, Component, JSX } from 'solid-js';

export type Props = JSX.IntrinsicElements['p'] & { children: JSX.Element }

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
/**
 * A cool Thing to use in your app!
 */
export const Thing: Component<Props> = (props) => {
  const [local, rest] = splitProps(props, ['children'])
  return (
    <p {...rest}>
      <em>{local.children || `Some content required`}</em>
    </p>
  );
};

export default Thing;
