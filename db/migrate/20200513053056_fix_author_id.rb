class FixAuthorId < ActiveRecord::Migration[5.2]
  def change
    rename_column :questions, :author_id, :user_id 
  end
end
