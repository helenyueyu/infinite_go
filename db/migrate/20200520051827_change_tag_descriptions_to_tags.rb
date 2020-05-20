class ChangeTagDescriptionsToTags < ActiveRecord::Migration[5.2]
  def change
    rename_table :tag_descriptions, :tags
  end
end
