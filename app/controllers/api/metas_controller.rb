class Api::MetasController < ApplicationController
    def index
        @tag_count = Tag.all.size 
    end
end
