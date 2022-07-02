
class EditorController < ActionController::Base

  def show
    render :json => {
      userGithubConnectPath: user_github_omniauth_authorize_path,
      token: form_authenticity_token
    }
  end
end
