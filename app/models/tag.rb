class Tag < ApplicationRecord
    validates :name, presence: true 
    validates :description, presence: true 

    has_many :taggables, 
        as: :taggable, 
        dependent: :destroy 

end