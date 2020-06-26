json.key_format! camelize: :lower 

json.extract! @comment, 
    :id, 
    :body, 
    :user, 
    :username, 
    :vote_count, 
    :current_vote, 
    :commentable_id, 
    :commentable_type, 
    :created_at, 
    :updated_at
