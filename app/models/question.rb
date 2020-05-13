class Question < ApplicationRecord
    belongs_to :user 
    
    def self.search(search)
        if search 
            res = where('title LIKE ?', "%#{search}%")
            if res.length > 0 
                res 
            else
                self.all 
            end
        end
    end
end

