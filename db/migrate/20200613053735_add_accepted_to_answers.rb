class AddAcceptedToAnswers < ActiveRecord::Migration[5.2]
  def change
    add_column :answers, :accepted, :boolean 
    Answer.all.each do |answer|
      answer.update_attributes(:accepted => false)
    end 
  end
end
