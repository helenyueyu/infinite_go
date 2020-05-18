class CreateTaggable < ActiveRecord::Migration[5.2]
  def change
    create_table :tags do |t|
      t.string :name, null: false 
      t.integer :user_id, null: false 
      t.integer :taggable_id, null: false 
      t.string :taggable_type, null: false 

      t.timestamps
    end

    add_index :tags, [:user_id, :taggable_id, :taggable_type], unique: true, name: 'user_taggable_index'
  end
end
