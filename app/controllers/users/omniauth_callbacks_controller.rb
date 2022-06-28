class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  def github
    @user = User.from_omniauth(request.env["omniauth.auth"])
    signin_and_redirect @user
  end

  def failure
    render status: 404, plain: failure_message
    # redirect_to root_path
  end
end
