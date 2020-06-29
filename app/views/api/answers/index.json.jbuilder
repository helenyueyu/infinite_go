json.key_format! camelize: :lower 

@answers.each do |answer|
    json.set! answer.id do 
        json.extract! answer, :id, 
                                :body, 
                                :user_id, 
                                :question_id, 
                                :accepted, 
                                :vote_count, 
                                :created_at, 
                                :updated_at
        
        json.current_vote current_user ? answer.current_user_vote(current_user) : 0 

        json.set! 'user' do
            json.extract! answer.user, :id, 
                                        :created_at, 
                                        :description, 
                                        :email, 
                                        :last_seen_at, 
                                        :location, 
                                        :reputation, 
                                        :username, 
                                        :medals
                                   
            json.profilePhotoUrl "https://picsum.photos/id/#{answer.user.id}/200"
        end

        json.set! 'comments', {} 

        json.set! 'comments' do 
            answer.comments.each do |comment|
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
    end
    
end

