json.key_format! camelize: :lower 

json.extract! user, :id, 
                    :username, 
                    :email, 
                    :view_count, 
                    :last_seen_at, 
                    :number_of_people_reached,
                    :reputation,
                    :location,  
                    :medals, 
                    :top_three_tags, 
                    :question_count, 
                    :answer_count, 
                    :questions, 
                    :created_at, 
                    :updated_at 
