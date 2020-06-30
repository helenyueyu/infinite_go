class Question < ApplicationRecord
    is_impressionable 

    def impression_count 
        impressions.size 
    end

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

    has_many :bookmarks, 
        as: :bookmarkable, 
        dependent: :destroy 

    def current_user_bookmark(current_user)
        bookmark = self.bookmarks.where('user_id = ?', current_user.id).first 
        return 0 if bookmark.nil? 
        1
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

    # return self.select('tags.*, COUNT(taggables.tag_id) tag_freq')
    # .joins(:taggables)
    # .group('tags.id')
    # .order('tag_freq DESC')
    # .offset((page-1)*page_limit)
    # .limit(page_limit)
    # .order(created_at: :desc)

    def self.search(page, page_limit, query, filter)
        if query.length > 0 
            if query.first == '['
                query = query[1..query.length-2]
                res = Question.joins(:tags).where(tags: {name: query})
            else
                res = where('title LIKE ?', "%#{query}%")
            end

            if res.length > 0 
                if filter == 'upvote'
                    return [res.select('questions.*, COUNT(votes.voteable_id) upvotes')
                            .joins(:votes)
                            .group('questions.id')
                            .order('upvotes DESC')
                            .offset((page-1)*page_limit)
                            .limit(page_limit)
                            .order('created_at DESC'), res.size]
                else 
                    return [res.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc), res.size]
                end 
            else
                return [] 
            end
        else
            if filter == 'upvote'
                return [self.all.select('questions.*, COUNT(votes.voteable_id) upvotes')
                .left_outer_joins(:votes)
                .group('questions.id')
                .order('upvotes DESC')
                .offset((page-1)*page_limit)
                .limit(page_limit)
                .order('created_at DESC'), self.all.size]
            else 
                return [self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc), self.all.size]
            end 
        end
    end

end

