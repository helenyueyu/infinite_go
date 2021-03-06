json.key_format! ->(key) { 
    key.to_s.chomp('?').camelize(:lower)
}

json.extract! user, :id, 
                    :username, 
                    :email, 
                    :description,
                    :badges, 
                    :view_count, 
                    :last_seen_at, 
                    :number_of_people_reached,
                    :reputation,
                    :location,  
                    :medals, 
                    :top_three_tags, 
                    :question_count, 
                    :answer_count, 
                    :created_at, 
                    :updated_at

# json.profilePhotoUrl url_for(user.profile_photo)
json.profilePhotoUrl "https://picsum.photos/id/#{user.id}/200"

json.set! 'posts' do 
    json.array! user.questions.each do |question|
        json.extract! question, :id, :title, :vote_count, :created_at, :has_accepted_answer?
        json.post_type 'question' 
    end
    json.array! user.answers.each do |answer|
        json.extract! answer.question, :id, :title, :vote_count, :created_at, :has_accepted_answer? 
        json.post_type 'answer'
    end
end
