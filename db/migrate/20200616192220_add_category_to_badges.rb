class AddCategoryToBadges < ActiveRecord::Migration[5.2]
  def change
    add_column :badges, :category, :string
    change_column_null :badges, :category, false 
  end
end
