class ChangeTagsToTaggables < ActiveRecord::Migration[5.2]
  def change
    rename_table :tags, :taggables 
  end
end
