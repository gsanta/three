# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

Rails.application.configure do
  config.x.oauth.jwt_secret = ENV['HMAC_SECRET']
end
