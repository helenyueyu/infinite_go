class AddUniquenessToTagIdTaggableIdForTaggables < ActiveRecord::Migration[5.2]
  def change
    add_index :taggables, [:tag_id, :taggable_id, :taggable_type], unique: true 
  end
end
