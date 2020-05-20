class RemoveTagIdFromTagDescriptions < ActiveRecord::Migration[5.2]
  def change
    remove_column :tag_descriptions, :tag_id 
  end
end
