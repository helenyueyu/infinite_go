class Tag < ApplicationRecord
    validates :name, presence: true 
    validates :description, presence: true 

    has_many :taggables, 
        foreign_key: :tag_id, 
        class_name: :Taggable, 
        dependent: :destroy 

    def self.exists?(name)
        tag = where('name LIKE ?', "#{name}")
        tag.size == 1 
    end
end