class CreateJobs < ActiveRecord::Migration[5.2]
  def change
    create_table :jobs do |t|
      t.string :title, null: false 
      t.string :location, null: false 
      t.text :description, null: false 
      
      t.string :experience_level, array: true, default: [], null: false 
      t.string :industry, array: true, default: [], null: false 

      t.string :job_type, null: false
      t.string :company_size, null: false 
      t.string :company_type, null: false

      t.integer :company_id, null: false 
      t.integer :user_id, null: false 
    end

    add_index :jobs, :company_id
    add_index :jobs, :user_id
  end
end
