import { EncrypterCompare } from '@/domain/protocols/bcrypt'
import { Encrypter } from '@/domain/protocols/bcrypt/encrypter'
import bcrypt from 'bcrypt'
export class BcryptAdapter implements Encrypter, EncrypterCompare {
  private readonly bcrypt = bcrypt
  constructor (private readonly saltsRound: number) {

  }

  encrypt (plainText: string): { hash: string } {
    return {
      hash: this.bcrypt.hashSync(plainText, this.saltsRound)
    }
  }

  compare (params: { hash: string, plainText: string }): boolean {
    return this.bcrypt.compareSync(params.plainText, params.hash)
  };
}
