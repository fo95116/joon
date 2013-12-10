Joon::Application.routes.draw do
  # resources :sessions, :constraints => { :protocol => "https" }

  root to: 'home#index'
  # root to: 'home#index'

  match "/auth/:provider/callback" => "sessions#create"
  match "/signout" => "sessions#destroy", :as => :signout


end
