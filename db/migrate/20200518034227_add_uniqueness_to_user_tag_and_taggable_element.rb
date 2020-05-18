class AddUniquenessToUserTagAndTaggableElement < ActiveRecord::Migration[5.2]
  def change
    add_index :tags, [:name, :user_id, :taggable_id, :taggable_type], unique: true, name: 'user_taggable_index'
  end
end
