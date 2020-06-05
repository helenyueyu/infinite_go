class AddTagIdToTaggables < ActiveRecord::Migration[5.2]
  def change
    add_column :taggables, :tag_id, :integer 
  end
end
