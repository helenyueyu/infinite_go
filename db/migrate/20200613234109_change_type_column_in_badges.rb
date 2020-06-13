class ChangeTypeColumnInBadges < ActiveRecord::Migration[5.2]
  def change
    rename_column :badges, :type, :medal_type 
  end
end
