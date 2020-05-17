class Question < ApplicationRecord
    belongs_to :user 

    has_many :answers, 
        foreign_key: :question_id, 
        class_name: :Answer, 
        dependent: :destroy 

    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end

    def self.search(page, page_limit, query)
        if query.length > 0 
            res = where('title LIKE ?', "%#{query}%")
            if res.length > 0 
                return res.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
            else
                return [] 
            end
        end
        self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
    end
    
 
end

