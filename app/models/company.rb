class Company < ApplicationRecord
    validates :name, :description, :company_size, :company_type, :date_founded, :industry, presence: true 

    has_many :jobs, 
        class_name: :Job, 
        foreign_key: :company_id, 
        dependent: :destroy 
    
    belongs_to :user 
end
