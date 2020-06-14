class AddLocationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :location, :string
    User.all.each do |user|
      user.update_attributes(:location => "San Francisco, CA")
    end
  end
end
