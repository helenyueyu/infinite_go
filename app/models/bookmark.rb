class Bookmark < ApplicationRecord
    validates :user_id, presence: true 
    validates :user_id, uniqueness: {scope: [:bookmarkable_type, :bookmarkable_id] }

    belongs_to :bookmarkable, polymorphic: true 

    belongs_to :user 
end
