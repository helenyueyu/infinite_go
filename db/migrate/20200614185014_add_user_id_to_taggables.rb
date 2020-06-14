class AddUserIdToTaggables < ActiveRecord::Migration[5.2]
  def change
    add_column :taggables, :user_id, :integer
    Taggable.all.each do |taggable|
      taggable.update_attributes(:user_id => 1)
    end
    change_column_null :taggables, :user_id, false 
  end
end
