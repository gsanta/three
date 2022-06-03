# frozen_string_literal: true

module Users
  # UsersController
  class UsersController < BaseController
    before_action :authenticate_user!
    before_action :find_user, only: %w[show]

    def show
      render_jsonapi_response(@user)
    end

    def current_user
      user = user_from_token
      render json: {
        message: 'If you see this, you are in',
        user: user
      }
    end

    private

    def user_from_token
      jwt_payload =
        JWT.decode(request.headers['Authorization'].split(' ')[1],
                   ENV['DEVISE_JWT_SECRET_KEY']).first
      user_id = jwt_payload['sub']
      User.find(user_id.to_s)
    end

    def find_user
      @user = User.where(slug: params[:slug]).first
    end
  end
end
