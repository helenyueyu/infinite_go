class CreateVotable < ActiveRecord::Migration[5.2]
  def change
    create_table :votes do |t|
      t.integer :value 
      t.integer :user_id, null: false 
      t.integer :voteable_id 
      t.string :voteable_type 

      t.timestamps
    end
  end
end
