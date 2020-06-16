class AddDescriptionToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :description, :string
    User.all.each do |user|
      user.update_attributes(:description => "Apparently, this user prefers to keep an air of mystery about them.")
    end
    change_column_null :users, :description, false 
  end
end
