require 'rails_helper'

RSpec.describe User, type: :model do
    it 'Se usuario for valido' do
      user = User.new(first_name: 'John', second_name: 'Doe', email: 'johndoe@foo.bar', document_type: 'RG', document: '123456789')
      expect(user).to be_valid
    end
    it 'Se usuario for invalido' do
      user = User.new(first_name: 'John', second_name: 'Doe', email: 'johndoe@foo.bar')
      expect(user).to_not be_valid
    end

end
