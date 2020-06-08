class AddCharacterLimitToTagName < ActiveRecord::Migration[5.2]
  def change
    change_column :tags, :name, :string, :limit => 35
  end
end
