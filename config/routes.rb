Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root to: 'static_pages#root'

    namespace :api, defaults: {format: :json} do 
      get 'questions(search/:search)', to: 'questions#search', search: /.*/
      get 'questions/random', :to => 'questions#random'
      get 'users/search', :to => 'users#search'
      get 'tags/search', :to => 'tags#search'

      resources :users, only: [:index, :create, :show]
      resource :session, only: [:create, :destroy]

      resources :questions, only: [:index, :create, :show, :update, :destroy] do 
        resources :answers, only: [:index]
        resources :comments, only: [:index]
      end

      resources :answers, only: [:create, :update, :destroy]
      resources :votes, only: [:create]
      resources :comments, only: [:create, :destroy]
      
      resources :taggables, only: [:create, :destroy]

      resources :tags, only: [:create, :destroy, :show, :index]
      resources :metas, only: [:index]
    end
    
end
