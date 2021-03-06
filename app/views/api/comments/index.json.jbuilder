json.key_format! camelize: :lower 

@comments.each do |comment|
    json.set! comment.id do 
        json.extract! comment, :id, 
                                :body, 
                                :user, 
                                :username, 
                                :vote_count, 
                                :commentable_id, 
                                :commentable_type, 
                                :created_at, 
                                :updated_at
                                
        json.current_vote current_user ? comment.current_user_vote(current_user) : 0 
    end 
end
