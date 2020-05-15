class FixAuthorIdInAnswers < ActiveRecord::Migration[5.2]
  def change
    rename_column :answers, :author_id, :user_id 
  end
end
