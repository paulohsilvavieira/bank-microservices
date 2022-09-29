class CreateUsers < ActiveRecord::Migration[7.0]
  def up
    create_table :users do |t|
      t.string :first_name
      t.string :second_name
      t.string :email
      t.string :document_type
      t.string :document
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
