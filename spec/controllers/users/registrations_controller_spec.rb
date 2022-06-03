# frozen_string_literal: true

require 'rails_helper'

describe Users::RegistrationsController, type: :request do
  let(:user) { build :user }
  let(:signup_url) { '/users' }

  context 'When creating a new user' do
    before do
      post signup_url, params: {
        user: {
          email: user.email,
          password: user.password
        }
      }
    end

    it 'returns 200' do
      expect(response.status).to eq(200)
    end

    it 'returns a token' do
      expect(response.headers['Authorization']).to be_present
    end

    it 'returns the user email' do
      parsed_body = JSON.parse(response.body)
      expect(parsed_body['user']['email']).to eq('user1@test.com')
    end
  end

  context 'When an email already exists' do
    let!(:existing_user) { create :user }

    before do
      post signup_url, params: {
        user: {
          email: user.email,
          password: user.password
        }
      }
    end

    it 'returns 422' do
      expect(response.status).to eq(422)
    end
  end
end
