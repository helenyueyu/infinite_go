class RemoveUniqueIndexFromTags < ActiveRecord::Migration[5.2]
  def change
    remove_index :tags, name: 'user_taggable_index'
  end
end
