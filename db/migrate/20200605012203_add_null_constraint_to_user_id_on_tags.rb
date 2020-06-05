class AddNullConstraintToUserIdOnTags < ActiveRecord::Migration[5.2]
  def change
    change_column_null :tags, :user_id, false
  end
end
