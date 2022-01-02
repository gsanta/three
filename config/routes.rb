Rails.application.routes.draw do
  scope '/api/v1' do
    resources :users, param: :_username
    post '/auth/login', to: 'authentication#login'
    resources :tdlists
    resources :sprite_sheet
  end
end
