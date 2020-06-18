json.key_format! camelize: :lower 

json.extract! @bookmark, :id, 
                    :user_id, 
                    :bookmarkable_id,
                    :bookmarkable_type,  
                    :created_at, 
                    :updated_at
