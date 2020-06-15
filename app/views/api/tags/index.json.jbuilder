json.key_format! camelize: :lower 

json.tags @tags do |tag|
    json.extract! tag, :name, 
                    :description, 
                    :question_count, 
                    :weekly_question_count, 
                    :daily_question_count, 
                    :created_at, 
                    :updated_at 
end

