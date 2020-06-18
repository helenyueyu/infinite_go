class ApplicationController < ActionController::Base
    helper_method :current_user, :logged_in? 

    before_action :set_last_seen_at, if: proc { logged_in? }

    # debugger 

    def login(user) 
        session[:session_token] = user.reset_session_token!
        @current_user = user 
    end

    def current_user 
        return nil unless session[:session_token]
        @current_user ||= User.find_by(session_token: session[:session_token])
    end

    def require_login 
        unless @current_user 
            render json: { base: ['invalid credentials'] }, status: 401 
        end
    end

    def logged_in? 
        !!current_user 
    end

    def logout
        current_user.reset_session_token!
        session[:session_token] = nil 
        @current_user = nil
    end

    def set_last_seen_at
        current_user.update_attribute(:last_seen_at, Time.current)
    end
end
