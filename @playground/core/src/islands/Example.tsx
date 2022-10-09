import Thing from "@/components/Thing";
import { PropsWithChildren } from "react";

export default function Example({ children }: PropsWithChildren) {
  return <Thing>{children}</Thing>
}
