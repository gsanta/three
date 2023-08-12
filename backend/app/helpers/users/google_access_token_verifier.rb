module Users
  class GoogleAccessTokenVerifier

    def verify(access_token)
      begin
        token_info = get_verifier.verify(access_token, aud: ENV['GOOGLE_OAUTH_CLIENT_ID'])
        token_info["email"]
      rescue  Google::Auth::IDTokens::SignatureError,
              Google::Auth::IDTokens::AudienceMismatchError,
              Google::Auth::IDTokens::ExpiredTokenError,
              Google::Auth::IDTokens::AuthorizedPartyMismatchError,
              Google::Auth::IDTokens::IssuerMismatchError
        raise Errors::InvalidCredentials
      end
    end

    private

    def get_verifier
      key_source = Google::Auth::IDTokens::JwkHttpKeySource.new(Google::Auth::IDTokens::OAUTH2_V3_CERTS_URL)
      Google::Auth::IDTokens::Verifier.new(key_source: key_source)
    end
  end
end
