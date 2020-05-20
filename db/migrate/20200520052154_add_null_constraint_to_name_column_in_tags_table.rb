class AddNullConstraintToNameColumnInTagsTable < ActiveRecord::Migration[5.2]
  def change
    change_column_null :tags, :name, false 
  end
end
