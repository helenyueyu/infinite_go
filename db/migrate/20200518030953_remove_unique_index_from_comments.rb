class RemoveUniqueIndexFromComments < ActiveRecord::Migration[5.2]
  def change
    remove_index :comments, name: 'user_commentable_index'
  end
end
