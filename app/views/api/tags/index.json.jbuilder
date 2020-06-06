json.key_format! camelize: :lower 

json.tags @tags do |tag|
    json.extract! tag, :name, :question_count 
end

