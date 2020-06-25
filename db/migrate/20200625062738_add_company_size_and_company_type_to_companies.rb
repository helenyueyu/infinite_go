class AddCompanySizeAndCompanyTypeToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :company_size, :string, null: false 
    add_column :companies, :company_type, :string, null: false 
  end
end
