json.key_format! camelize: :lower 

json.ignore_nil!

json.extract! @question, 
    :id, 
    :title, 
    :body, 
    :vote_count,  
    :created_at, 
    :updated_at

json.set! 'user' do 
    json.extract! @question.user, :id, 
                                :created_at, 
                                :description, 
                                :email, 
                                :last_seen_at, 
                                :location, 
                                :reputation, 
                                :username, 
                                :medals 
end


json.set! 'tags', {}

json.set! 'tags' do
    json.array! @question.taggables.each do |taggable|
        json.extract! taggable, :id, :tag_id, :taggable_id, :taggable_type 
        json.extract! taggable.tag, :name
    end
end 





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






