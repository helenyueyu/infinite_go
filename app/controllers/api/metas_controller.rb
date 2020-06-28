class Api::MetasController < ApplicationController
    def index
        @tag_count = Tag.all.size
        @user_count = User.all.size 
    end
end
