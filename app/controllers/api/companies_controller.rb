class Api::CompaniesController < ApplicationController
    def create 
        @company = Company.new(company_params)
        @company.user_id = current_user.id 
        @company.industries = params[:company][:industries]
        
        if @company.save 
            render :show 
        else 
            render json: @company.errors.full_messages, status: 404 
        end 
    end

    private 
    def company_params 
        params.require(:company).permit(:name, :description, :company_size, :company_type, :date_founded, :industries)
    end
end
