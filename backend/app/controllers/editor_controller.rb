class EditorController < ApplicationController
  def index

    user = {
      isLoggedIn: user_signed_in?,
    }

    if current_user
      user[:email] = current_user.email
    end

    render react: {
      pageProps: {
        hello: "world",
      },
      globalProps: {
        user: user
      }
    }
  end
end
