FactoryBot.define do
  factory :user do 
    first_name { 'John'}
    second_name { 'Doe' }
    email {'johndoe@foobar.com'}
    document_type{'RG'}
    document{'123456789'}
  end
end

