class AddIndustryToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :industry, :string, array: true, default: [], null: false 
  end
end
