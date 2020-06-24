class CreateIgnoredTags < ActiveRecord::Migration[5.2]
  def change
    create_table :ignored_tags do |t|
      t.integer :user_id, null: false 
      t.integer :tag_id, null: false

      t.timestamps
    end

    add_index :ignored_tags, [:user_id, :tag_id], unique: true
  end
end
