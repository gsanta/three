Rails.application.routes.draw do
  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks',
    registrations: 'users/registrations',
    sessions: 'users/sessions'
  }
  # devise_for :users
  # devise_for :users,
  #   defaults: { format: :json },
  #   # path: '',
  #   # path_names: {
  #   #   sign_in: 'api/v1/auth/login',
  #   #   sign_out: 'api/v1/auth/logout',
  #   #   registration: 'api/v1/auth/signup'
  #   # },
  #   controllers: {
  #     sessions: 'users/sessions',
  #     registrations: 'users/registrations',
  #     omniauth_callbacks: 'users/omniauth_callbacks'
  #   }

  get '/users/current-user' => 'users/users#get_current_user'
  get '/users/:slug' => 'users/users#show'

  get '/editor/show' => 'editor#show'
end
