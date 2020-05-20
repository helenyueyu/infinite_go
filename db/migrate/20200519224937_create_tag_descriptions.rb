class CreateTagDescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_descriptions do |t|
      t.text :description, null: false 
      t.integer :tag_id, null: false 

      t.timestamps
    end

    add_index :tag_descriptions, :tag_id, unique: true 
  end
end
