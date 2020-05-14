class Question < ApplicationRecord
    belongs_to :user 

    def self.search(page, page_limit, query)
        if query.length > 0 
            res = where('title LIKE ?', "%#{query}%")
            if res.length > 0 
                return res.offset((page-1)*page_limit).limit(page_limit)
            else
                return [] 
            end
        end
        self.all.offset((page-1)*page_limit).limit(page_limit)
    end
    
 
end

