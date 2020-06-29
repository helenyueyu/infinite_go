json.key_format! camelize: :lower 

json.extract! @comment, 
    :id, 
    :body, 
    :user, 
    :username, 
    :vote_count, 
    :commentable_id, 
    :commentable_type, 
    :created_at, 
    :updated_at

json.current_vote @comment.current_user_vote(current_user)

