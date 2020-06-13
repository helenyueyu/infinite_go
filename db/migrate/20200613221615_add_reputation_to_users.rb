class AddReputationToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :reputation, :integer
    User.all.each do |user|
      user.update_attributes(:reputation => 1)
    end 
    change_column_null :users, :reputation, false
  end
end
