json.key_format! camelize: :lower 

json.extract! @tag, :id, :name, :user_id, :taggable_id, :taggable_type, :created_at, :updated_at
