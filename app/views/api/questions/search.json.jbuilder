json.key_format! ->(key) { 
    key.to_s.chomp('?').camelize(:lower)
}

@questions.each do |question, idx|
    json.set! question.id do 
        json.extract! question, :id, 
                                :title, 
                                :body, 
                                :has_accepted_answer?, 
                                :vote_count, 
                                :answer_count,
                                :view_count, 
                                :created_at, 
                                :updated_at
        
        json.question_count @question_count

        json.set! 'user' do 
            json.extract! question.user, :id, 
                                        :created_at, 
                                        :description, 
                                        :last_seen_at, 
                                        :location, 
                                        :reputation, 
                                        :username, 
                                        :medals
            json.profilePhotoUrl "https://picsum.photos/id/#{question.user.id}/200"
        end

        json.set! 'tags', {} 

        json.set! 'tags' do 
            json.array! question.tags, 
                        :id, 
                        :name, 
                        :description, 
                        :created_at
        end
    end 
end