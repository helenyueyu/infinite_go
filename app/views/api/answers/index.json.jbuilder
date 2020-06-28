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
        
        json.current_vote answer.current_user_vote(current_user)

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
    end 
end

