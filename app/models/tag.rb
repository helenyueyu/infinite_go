class Tag < ApplicationRecord
    validates :name, presence: true 
    validates :name, uniqueness: true   
    
    validates_length_of :name, maximum: 35
    validate :clean_name? 

    def self.search(query)
        Tag.where('name LIKE ?', "%#{query}%")
    end

    def clean_name?
        alpha = 'abcdefghijklmnopqrstuvwxyz' 
        digits = '0123456789'
        special_chars = '+#-.'
        self.name.chars.each do |c|
            if !(alpha + digits + special_chars).include?(c) 
                errors.add(:name, "Tag name includes invalid character")
            end
        end  
    end

    def self.clean_name(name)
        if name.include?(' ')
            return name.gsub(' ', '-').downcase
        else
            return name.downcase
        end
    end

    attr_reader :question_count 
    
    has_many :taggables, 
        class_name: :Taggable, 
        foreign_key: :tag_id, 
        dependent: :destroy 

    has_many :watched_tags, 
        class_name: :WatchedTag, 
        foreign_key: :tag_id, 
        dependent: :destroy 

    has_many :tagged_questions, 
        through: :taggables, 
        source: :taggable, 
        source_type: :Question, 
        dependent: :destroy 


    def weekly_question_count
        self.tagged_questions.where('questions.created_at BETWEEN ? AND ?', 1.week.ago, Time.now).size 
    end

    def daily_question_count
        self.tagged_questions.where('questions.created_at BETWEEN ? AND ?', 1.day.ago.beginning_of_day, Time.now).size 
    end

    def question_count
        self.tagged_questions.size 
    end

    def self.exists?(name)
        tag = where('name LIKE ?', "#{name}")
        tag.size == 1 
    end

    def self.paginate(page, page_limit, filter)
        page = page.to_i 
        page_limit = page_limit.to_i 
        if filter == 'name' 
            return self.all.offset((page-1)*page_limit).limit(page_limit).order(name: :asc)
        elsif filter == 'new'
            return self.all.offset((page-1)*page_limit).limit(page_limit).order(created_at: :desc)
        else 
            return self.select('tags.*, COUNT(taggables.tag_id) tag_freq')
            .joins(:taggables)
            .group('tags.id')
            .order('tag_freq DESC')
            .offset((page-1)*page_limit)
            .limit(page_limit)
            .order(created_at: :desc)
        end         
    end
end

