Rails.application.routes.draw do
  scope module: 'api', path: 'api/v1' do
    resources :users, only: %w[show]
    resources :sprite_sheets
  end

  devise_for :users,
    defaults: { format: :json },
    path: '',
    path_names: {
      sign_in: 'api/v1/auth/login',
      sign_out: 'api/v1/auth/logout',
      registration: 'api/v1/auth/signup'
    },
    controllers: {
      sessions: 'api/sessions',
      registrations: 'api/registrations'
    }
end
