class AddUserTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :firstname
      t.string :lastname
      t.string :email
      t.string :phone
      t.timestamps 
    end
  end
end
