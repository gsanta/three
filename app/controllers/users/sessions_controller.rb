# frozen_string_literal: true

module Users
  # Controller for user login/logout
  class SessionsController < Devise::SessionsController
    respond_to :json

    private

    def respond_with(_resource, _opts = {})
      render json: {
        email: current_user.email
      }, status: :ok
    end
  end
end
