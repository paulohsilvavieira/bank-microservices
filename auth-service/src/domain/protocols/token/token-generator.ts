export interface TokenGenerator{
  generate: (payload: any) => {token: string}
}
