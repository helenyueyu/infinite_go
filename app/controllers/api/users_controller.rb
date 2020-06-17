class Api::UsersController < ApplicationController
    impressionist actions: [:show]

    def index 
        @users = User.all 
    end

    def create 
       @user = User.new(user_params)
       if @user.save 
            login(@user)
            render :show 
       else
            render json: @user.errors.full_messages, status: 401 
       end 
    end

    def search
        @users = User.search(search_params)
    end

    def show 
        @user = User.find(params[:id])
        @user.view_count = @user.view_count  
    end

    private
    def search_params
        params.require(:search).permit(:query)[:query]
    end

    def user_params
        params.require(:user).permit(:password, :email, :username)
    end
end
