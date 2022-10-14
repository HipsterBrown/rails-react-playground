import Thing, { Props as ThingProps } from "@/components/Thing";

export default function Example({ children }: Pick<ThingProps, 'children'>) {
  return <Thing>{children}</Thing>
}
