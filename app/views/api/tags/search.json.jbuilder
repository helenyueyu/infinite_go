json.key_format! camelize: :lower 

json.tags @tags do |tag|
    json.extract! tag, :id, :name, :description, :question_count, :created_at  
end

