Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root to: 'static_pages#root'

    namespace :api, defaults: {format: :json} do 
      get 'questions(search/:search)', to: 'questions#search', search: /.*/
      get 'questions/random', :to => 'questions#random'
      
      get 'users/search', :to => 'users#search'
      get 'tags/search', :to => 'tags#search'

      get 'tags/popular', :to => 'taggables#popular_tags'
      get 'tags(paginate/:paginate)', to: 'tags#index'
      get 'users(paginate/:paginate)', to: 'users#index'

      post 'tags/update_tag_description', :to => 'tags#add_description'

      resources :users, only: [:index, :create, :update, :show]
      resource :session, only: [:create, :destroy]

      resources :questions, only: [:index, :create, :show, :update, :destroy] do 
        resources :answers, only: [:index]
        resources :comments, only: [:index]
      end

      resources :answers, only: [:create, :update, :destroy, :show]
      resources :votes, only: [:create]
      resources :comments, only: [:create, :update, :destroy]
      
      resources :tags, only: [:create, :destroy, :show, :index]
      resources :taggables, only: [:create, :destroy]

      resources :badges, only: [:index, :create, :destroy]

      resources :bookmarks, only: [:index, :create, :destroy]

      resources :watched_tags, only: [:index, :create, :destroy]
      resources :ignored_tags, only: [:index, :create, :destroy]
      
      resources :companies, only: [:index, :create]
      
      resources :metas, only: [:index]
    end
    
end
