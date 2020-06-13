class AddNullConstraintToAccepted < ActiveRecord::Migration[5.2]
  def change
    change_column_null :answers, :accepted, false
  end
end
