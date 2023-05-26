class EditorController < ApplicationController
  def index
    render react: {
      pageProps: {
        hello: "world",
      },
      globalProps: {
        user: {
          isLoggedIn: user_signed_in?
        }
      }
    }
  end
end
