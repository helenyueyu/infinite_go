json.key_format! camelize: :lower 

json.ignore_nil!

json.extract! @question, 
    :id, 
    :title, 
    :body, 
    :vote_count, 
    :user,   
    :vote_count, 
    :created_at, 
    :updated_at

json.set! 'comments', {} 

json.set! 'comments' do 
    @question.comments.each do |comment|
        json.set! comment.id do 
            json.extract! comment, 
                :id, 
                :commentable_id, 
                :commentable_type, 
                :body, 
                :username,
                :created_at, 
                :updated_at
        end
    end
end 





