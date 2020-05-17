json.key_format! camelize: :lower 

json.extract! @question, 
    :id, 
    :title, 
    :body, 
    :vote_count, 
    :user, 
    :vote_count, 
    :created_at, 
    :updated_at
