class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id, null: false 
      t.integer :bookmarkable_id, null: false 
      t.integer :bookmarkable_type, null: false 

      t.timestamps
    end

    add_index :bookmarks, [:user_id, :bookmarkable_id], unique: true 
  end
end
