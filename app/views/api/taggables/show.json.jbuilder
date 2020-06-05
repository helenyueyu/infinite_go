json.key_format! camelize: :lower 

json.extract! @taggable, :id, 
                    :tag_id, 
                    :taggable_id, 
                    :taggable_type, 
                    :created_at, 
                    :updated_at