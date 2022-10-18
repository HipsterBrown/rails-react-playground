import type { JSX } from 'solid-js'
import Thing from "@/components/Thing";

export default function Example(props: { children: JSX.Element }) {
  return <Thing>{props.children}</Thing>
}
