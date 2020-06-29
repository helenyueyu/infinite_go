json.key_format! camelize: :lower 

json.extract! @company, :id, 
                    :name, 
                    :description,
                    :company_size, 
                    :company_type, 
                    :date_founded, 
                    :created_at, 
                    :updated_at