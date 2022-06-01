require 'rails_helper'

# RSpec.describe 'Users', type: :request do
#   describe "GET /users/v1/users/{slug}" do
#     before do
#       get "/users/v1/users/10740f60-df14-4355-a03e-bf48beb78dac"
#     end
#
#     it 'returns 200' do
#       expect(response.status).to eq(200)
#     end
#   end
# end

describe Users::UsersController, type: :request do

  let (:current_user) { create :user, :current_user }
  let (:user) { create :user }

  context 'When fetching the current user' do
    before do
      login_with_api(current_user)
      get "/users/current-user", headers: {
        'Authorization': response.headers['Authorization']
      }
    end

    it 'returns 200' do
      expect(response.status).to eq(200)
    end

    it 'returns the user' do
      parsed_body = JSON.parse(response.body)
      expect(parsed_body["user"]["email"]).to eq("user2@test.com")
      expect(parsed_body["user"]["slug"]).not_to be_nil
    end
  end

  context 'When fetching a user' do
    before do
      login_with_api(current_user)
      get "/users/#{user.slug}", headers: {
        'Authorization': response.headers['Authorization']
      }
    end

    it 'returns 200' do
      expect(response.status).to eq(200)
    end

    it 'returns with the user data' do
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['data']['attributes']['email']).to eq("user1@test.com")
    end
  end

  context 'When a user is missing' do
    before do
      login_with_api(current_user)
      get "/users/1234", headers: {
        'Authorization': response.headers['Authorization']
      }
    end

    it 'returns 404' do
      expect(response.status).to eq(404)
    end
  end

  context 'When the Authorization header is missing' do
    before do
      login_with_api(current_user)
      get "/users/#{user.slug}"
    end

    it 'returns 401' do
      expect(response.status).to eq(401)
    end
  end

end
