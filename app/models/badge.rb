class Badge < ApplicationRecord
    validates :name, presence: true 
    validates :description, presence: true 
    validates :medal_type, presence: true 
    validates :category, presence: true 

    validates :medal_type, inclusion: {in: ['gold', 'silver', 'bronze']} 

    has_many :user_badges, 
        class_name: :UserBadge, 
        foreign_key: :badge_id, 
        dependent: :destroy 

    has_many :users, 
        through: :user_badges, 
        source: :user, 
        dependent: :destroy 
end
