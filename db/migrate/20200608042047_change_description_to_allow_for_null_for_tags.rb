class ChangeDescriptionToAllowForNullForTags < ActiveRecord::Migration[5.2]
  def change
    change_column_null :tags, :description, true
  end
end
