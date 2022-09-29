class User < ApplicationRecord
  validates :first_name, presence: true
  validates :email, presence: true
  validates :second_name, presence: true
  validates :document, presence: true
  validates :document_type, presence: true
end
