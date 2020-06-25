class RemoveCompanySizeAndCompanyTypeFromJobs < ActiveRecord::Migration[5.2]
  def change
    remove_column :jobs, :company_size, :string
    remove_column :jobs, :company_type, :string
  end
end
