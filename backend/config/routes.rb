Rails.application.routes.draw do
  root "editor#index"
  get "/editor", to: "editor#index"

  resources :drawings, only: %i[index show create update destroy]

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  post '/users/sign_in/google', to: 'users/google_auth#authenticate'
end
