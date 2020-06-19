class Question < ApplicationRecord
    is_impressionable 

    def impression_count 
        impressions.size 
    end

    attr_accessor :current_vote 

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
        source: :tag, 
        dependent: :destroy 

    def current_user_vote(current_user)
        vote = self.votes.where('user_id = ?', current_user.id).first
        return 0 if vote.nil? 
        vote.value 
    end

    def view_count
        self.impressionist_count  
    end

    def vote_count  
        self.votes.where('value = 1').count - self.votes.where('value = -1').count
    end

    def answer_count
        self.answers.size 
    end

    def has_accepted_answer?
        self.answers.where('accepted = true').count == 1
    end

    def self.get_random(num)
        return self.all if self.all.size < num 
        chosen = []
        res = [] 
        size = Question.all.size 
        while res.length < num 
            random_idx = rand(0..size-1)
            if !chosen.include?(random_idx)
                q = Question.all[random_idx]
                res << q
                chosen << random_idx 
            end
        end
        res 
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

