class AddBadgeDescriptionToBadges < ActiveRecord::Migration[5.2]
  def change
    add_column :badges, :description, :string 
    Badge.all.each do |badge|
      badge.update_attributes(:description => "default description")
    end
    change_column_null :badges, :description, false 
  end
end

