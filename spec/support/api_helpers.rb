module ApiHelpers

  def json
    JSON.parse(response.body)
  end

  def login_with_api(user)
    post '/api/v1/auth/login', params: {
      user: {
        email: user.email,
        password: user.password
      }
    }
  end

end
