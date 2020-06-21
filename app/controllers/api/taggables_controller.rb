class Api::TaggablesController < ApplicationController
    def create
        tag_id = Tag.find_by(name: Tag.clean_name(taggable_params[:name])).id 

        taggable_id = taggable_params[:taggable_id]
        taggable_type = taggable_params[:taggable_type]

        if Taggable.exists?(tag_id, taggable_id, taggable_type)
            @taggable = Taggable.find_by(tag_id: tag_id, taggable_id: taggable_id, taggable_type: taggable_type)
            render :show
        else 
            taggable = {
                tag_id: tag_id, 
                taggable_id: taggable_id, 
                taggable_type: taggable_type, 
                user_id: taggable_params[:user_id]
            }
            @taggable = Taggable.new(taggable)
            if @taggable.save! 
                render :show 
            else
                render json: @taggable.errors.full_messages, status: 401 
            end    
        end         
    end

     def destroy 
        @taggable = Taggable.find(params[:id])
        count = Taggable.where(tag_id: @taggable.tag_id).size
        if @taggable.destroy
            if count === 1
                @tag = Tag.find(@taggable.tag_id)
                if @tag.destroy
                    render :show 
                else
                    render @tag.errors.full_messages 
                end
            else
                render :show 
            end 
        else
            render json: @taggable.errors.full_messages 
        end
    end


    def taggable_params
        params.require(:taggable).permit(:name, :user_id, :taggable_id, :taggable_type)
    end
end
