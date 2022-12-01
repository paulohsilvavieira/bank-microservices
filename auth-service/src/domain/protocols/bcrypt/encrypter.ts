export interface Encrypter {
  encrypt: (plainText: string) => { hash: string}
}
