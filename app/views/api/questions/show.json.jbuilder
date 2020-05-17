json.key_format! camelize: :lower 

json.extract! @question, 
    :id, 
    :title, 
    :body, 
    :vote_count, 
    :user, 
    :get_votes, 
    :created_at, 
    :updated_at
