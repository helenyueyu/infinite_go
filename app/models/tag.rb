class Tag < ApplicationRecord
    validates :name, presence: true 
    validates :description, presence: true 

    has_many :taggables, 
        foreign_key: :tag_id, 
        class_name: :Taggable, 
        dependent: :destroy 

end