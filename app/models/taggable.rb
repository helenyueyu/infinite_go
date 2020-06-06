class Taggable < ApplicationRecord
    belongs_to :taggable, polymorphic: true 
    
    belongs_to :tag, 
        class_name: :Tag, 
        foreign_key: :tag_id  

    belongs_to :taggable, polymorphic: true     

    def self.question_count(page_number, page_limit)
        Tag.group(:name)
            .offset((page_number-1)*page_limit)
            .limit(page_limit)
            .order('count_name DESC').count(:name)
    end
end
