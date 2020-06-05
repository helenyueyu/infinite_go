class AddTimestampsToJobs < ActiveRecord::Migration[5.2]
  def change
    add_column :jobs, :created_at, :datetime, null: false
    add_column :jobs, :updated_at, :datetime, null: false
  end
end
