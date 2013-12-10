Joon::Application.routes.draw do
  resources :sessions, :constraints => { :protocol => "https" }

  root to: 'sessions#index'
  # root to: 'home#index'


end
