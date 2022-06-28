Rails.application.routes.draw do
  devise_for :users,
    defaults: { format: :json },
    # path: '',
    # path_names: {
    #   sign_in: 'api/v1/auth/login',
    #   sign_out: 'api/v1/auth/logout',
    #   registration: 'api/v1/auth/signup'
    # },
    controllers: {
      sessions: 'users/sessions',
      registrations: 'users/registrations',
      omniauth_callbacks: 'users/omniauth_callbacks'
    }

  get '/users/current-user' => 'users/users#current_user'
  get '/users/:slug' => 'users/users#show'

  resources :editor
end
