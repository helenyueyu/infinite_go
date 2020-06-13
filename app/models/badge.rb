class Badge < ApplicationRecord
    has_many :user_badges, 
        class_name: :UserBadge, 
        foreign_key: :badge_id, 
        dependent: :destroy 

    has_many :users, 
        through: :user_badges, 
        source: :user, 
        dependent: :destroy 
end
