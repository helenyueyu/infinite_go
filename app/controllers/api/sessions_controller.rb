class Api::SessionsController < ApplicationController
    def create 
        @user = User.find_by_credentials(
            params[:user][:email], 
            params[:user][:password]
        )
        
        if @user 
            login(@user)
            render 'api/users/show'
        else
            render json: ['Invalid username or password'], status: 401 
        end
    end

    def destroy 
        if current_user 
            logout 
            render json: {} 
        else
            render json: ['User not found'], status: 404 
        end
    end
end


