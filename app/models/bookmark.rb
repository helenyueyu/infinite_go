class Bookmark < ApplicationRecord
    validates :user_id, presence: true 
    validates :user_id, uniqueness: {scope: [:bookmarkable_type, :bookmarkable_id] }

    belongs_to :bookmarkable, polymorphic: true 

    belongs_to :user 


    def validate_bookmark(user_id, bookmarkable_id, bookmarkable_type)
        existing_bookmark = Bookmark.find_by(user_id: user_id, bookmarkable_id: bookmarkable_id, bookmarkable_type: bookmarkable_type)
        
        if existing_bookmark
            existing_bookmark.destroy!
            return false
        end
        
        true 
    end

end
