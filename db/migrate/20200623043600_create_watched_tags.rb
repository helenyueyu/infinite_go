class CreateWatchedTags < ActiveRecord::Migration[5.2]
  def change
    create_table :watched_tags do |t|
      t.integer :user_id, null: false 
      t.integer :tag_id, null: false 

      t.timestamps
    end

    add_index :watched_tags, [:user_id, :tag_id], unique: true
  end
end
