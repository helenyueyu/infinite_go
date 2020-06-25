class RemoveIndustryFromJobs < ActiveRecord::Migration[5.2]
  def change
    remove_column :jobs, :industry, :string
  end
end
