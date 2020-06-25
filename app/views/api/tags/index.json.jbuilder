json.key_format! camelize: :lower 

@tags.each do |tag|
    json.set! tag.id do 
        json.extract! tag, :id, 
                        :name, 
                        :description, 
                        :question_count, 
                        :weekly_question_count, 
                        :daily_question_count, 
                        :created_at, 
                        :updated_at 
    end 
end 
