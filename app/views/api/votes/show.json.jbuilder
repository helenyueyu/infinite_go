json.key_format! camelize: :lower 

json.extract! @vote, :id, :value, :user_id, :voteable_id, :voteable_type, :created_at, :updated_at
