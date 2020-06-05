class AddNullConstraintToTagIdOnTaggables < ActiveRecord::Migration[5.2]
  def change
    change_column_null :taggables, :tag_id, false
  end
end
