import { useQuery } from "@tanstack/react-query"

export type useReactQueryProps = {
  key: string
  fn: () => any
}
export default function useReactQuery({ key, fn }: useReactQueryProps) {
  return useQuery({
    queryKey: [key],
    queryFn: () => fn(),
  })
}
