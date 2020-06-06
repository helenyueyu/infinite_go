class Api::MetasController < ApplicationController
    def index
        @question_count = Question.all.size 
    end
end
