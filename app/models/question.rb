class Question < ApplicationRecord
    validates :title, presence: true 
    validates :body, presence: true 

    belongs_to :user 

    has_many :answers, 
        foreign_key: :question_id, 
        class_name: :Answer, 
        dependent: :destroy 

    has_many :votes, 
        as: :voteable, 
        dependent: :destroy 
    
    has_many :comments, 
        as: :commentable, 
        dependent: :destroy

    has_many :taggables, 
        as: :taggable, 
        dependent: :destroy 

    has_many :tags, 
        through: :taggables, 
        source: :tag

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end

    def answer_count
        self.answers.size 
    end

    def self.search(page, page_limit, query)
        if query.length > 0 
            if query.first == '['
                query = query[1..query.length-2]
                res = Question.joins(:tags).where(tags: {name: query})
            else
                res = where('title LIKE ?', "%#{query}%")
            end

            if res.length > 0 
                return res.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
            else
                return [] 
            end
        end
        self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
    end
    
 
end

