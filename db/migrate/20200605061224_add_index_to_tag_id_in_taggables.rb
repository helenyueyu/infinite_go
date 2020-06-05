class AddIndexToTagIdInTaggables < ActiveRecord::Migration[5.2]
  def change
    add_index :taggables, :tag_id 
  end
end
