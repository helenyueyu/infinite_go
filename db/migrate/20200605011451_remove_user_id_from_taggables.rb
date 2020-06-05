class RemoveUserIdFromTaggables < ActiveRecord::Migration[5.2]
  def change
    remove_column :taggables, :user_id
  end
end
