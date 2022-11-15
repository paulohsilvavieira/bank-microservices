export interface TokenGenerator{
  generate: (plainText: string) => {token: string}
}
