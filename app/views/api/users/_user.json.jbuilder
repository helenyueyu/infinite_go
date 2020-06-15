json.key_format! camelize: :lower 

json.extract! user, :id, 
                    :username, 
                    :email, 
                    :number_of_people_reached,
                    :reputation,
                    :location,  
                    :medals, 
                    :top_three_tags, 
                    :questions, 
                    :created_at, 
                    :updated_at 
