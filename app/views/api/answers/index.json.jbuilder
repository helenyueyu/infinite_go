json.key_format! camelize: :lower 

@answers.each do |answer|
    json.set! answer.id do 
        json.extract! answer, :id, 
                                :body, 
                                :user_id, 
                                :question_id, 
                                :accepted, 
                                :vote_count, 
                                :current_vote, 
                                :created_at, 
                                :updated_at
        
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
                            
        end
    end 
end

