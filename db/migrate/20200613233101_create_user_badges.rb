class CreateUserBadges < ActiveRecord::Migration[5.2]
  def change
    create_table :user_badges do |t|
      t.integer :user_id, null: false 
      t.integer :badge_id, null: false 
    end

    add_index :user_badges, [:user_id, :badge_id], unique: true 
  end
end
