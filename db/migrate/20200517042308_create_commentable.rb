class CreateCommentable < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.text :body, null: false 
      t.integer :user_id, null: false 
      t.integer :commentable_id, null: false 
      t.string :commentable_type, null: false 

      t.timestamps
    end

    add_index :comments, [:user_id, :commentable_id, :commentable_type], unique: true, name: 'user_commentable_index'
  end
end
