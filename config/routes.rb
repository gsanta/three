Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: %w[show]
  end

  devise_for :users,
    defaults: { format: :json },
    path: '',
    path_names: {
      sign_in: 'api/login',
      sign_out: 'api/logout',
      registration: 'api/signup'
    },
    controllers: {
      sessions: 'api/sessions',
      registrations: 'api/registrations'
    }

  # get '/member-data', to: 'members#show'
  # scope '/api/v1' do
  #   resources :sprite_sheets
  # end
end
