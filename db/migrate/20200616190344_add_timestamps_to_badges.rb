class AddTimestampsToBadges < ActiveRecord::Migration[5.2]
  def change
    add_column :badges, :created_at, :datetime
    add_column :badges, :updated_at, :datetime
    Badge.all.each do |badge|
      badge.update_attributes(:created_at => Time.now, :updated_at => Time.now)
    end
    change_column_null :badges, :created_at, false 
    change_column_null :badges, :updated_at, false 
  end
end
