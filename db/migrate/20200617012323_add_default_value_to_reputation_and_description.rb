class AddDefaultValueToReputationAndDescription < ActiveRecord::Migration[5.2]
  def change
    change_column :users, :description, :string, :default => "Apparently, this user prefers to keep an air of mystery about them."
    change_column :users, :reputation, :integer, :default => 1 
  end
end
