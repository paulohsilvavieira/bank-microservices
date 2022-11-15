export interface Encrypter {
  encrypt: (plainText: string) => { encryptedText: string}
}
