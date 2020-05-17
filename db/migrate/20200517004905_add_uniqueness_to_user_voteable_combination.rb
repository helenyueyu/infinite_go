class AddUniquenessToUserVoteableCombination < ActiveRecord::Migration[5.2]
  def change
    add_index :votes, [:user_id, :voteable_type, :voteable_id], unique: true 
  end
end
