# require 'rails_helper'

RSpec.describe 'CreateUsersController', type: :request do
  let!(:params) do
    {
      first_name: 'John',
      second_name: 'Doe',
      email: 'johndoe@foo.bar',
      document_type: 'RG',
      document: '123456789'
    }
  end
  let!(:params_wrong) do
    {
      first_name: 'John'
    }
  end
  it 'POST Salvar User - 201' do
    post '/users', params: { user: params }
    expect(response).to have_http_status(:created)
  end
  it 'POST Salvar User - 400' do
    post '/users', params: { user: params_wrong }
    expect(response).to have_http_status(:bad_request)
  end
end
