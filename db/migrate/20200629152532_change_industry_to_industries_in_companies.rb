class ChangeIndustryToIndustriesInCompanies < ActiveRecord::Migration[5.2]
  def change
    rename_column :companies, :industry, :industries 
  end
end
