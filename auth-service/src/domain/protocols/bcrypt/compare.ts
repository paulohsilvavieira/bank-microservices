export interface EncrypterCompare {
  compare: (params: { hash: string, plainText: string }) => boolean
}
