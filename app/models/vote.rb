class Vote < ApplicationRecord
    validates :value, inclusion: {in: [1, -1]}
    validates :user_id, presence: true 
    
    belongs_to :voteable, polymorphic: true 

    belongs_to :user 
end
