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