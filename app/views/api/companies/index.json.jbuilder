json.key_format! camelize: :lower 

@companies.each do |company| 
    json.set company.id do
        json.extract! company, :id, 
                        :name, 
                        :description,
                        :company_size, 
                        :company_type, 
                        :date_founded, 
                        :created_at, 
                        :updated_at
    end 
end 




