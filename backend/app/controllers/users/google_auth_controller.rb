# Api Controller to handle our call backs
class Users::GoogleAuthController < ApplicationController

  # rescue_from Google::Auth::IDTokens::SignatureError, Google::Auth::IDTokens::AudienceMismatchError do
  #   respond_unauthorized 'Unauthorized'
  # end
  def authenticate
    access_token = request.headers['Authorization']&.gsub(/bearer /i, '')
    email = verifier.verify access_token
    user = User.return_existing_or_create_for_google(email)

    if user.persisted?
      sign_in user
    end

    render json: {
      user: {
        id: user['id'],
        email: user['email'],
      }
    }
  end

  def verifier
    @verifier ||= Users::GoogleAccessTokenVerifier.new
  end
end
