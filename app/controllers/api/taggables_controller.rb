class Api::TaggablesController < ApplicationController
    def create 
        tag_id = Tag.find_by(name: taggable_params[:name]).id 
        taggable = {
            tag_id: tag_id, 
            taggable_id: taggable_params[:taggable_id], 
            taggable_type: taggable_params[:taggable_type]
        }
        @taggable = Taggable.new(taggable)
        if @taggable.save! 
            render :show 
        else
            render json: @taggable.errors.full_messages, status: 401 
        end             
    end

    def taggable_params
        params.require(:taggable).permit(:name, :taggable_id, :taggable_type)
    end
end
