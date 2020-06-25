class AddDateFoundedToCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :date_founded, :integer, null: false 
  end
end
