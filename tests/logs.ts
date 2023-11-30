export type Root = Root2[]

export interface Root2 {
  src: string
  location: string
  path: string
  originalReqId: string
  component: string
  level: number
  msg: string
  time: string
  useragent: string
}
