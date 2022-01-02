class User < ApplicationRecord
  validates :email, uniqueness: true

  devise :database_authenticatable,
    :jwt_authenticatable,
    :registerable,
    jwt_revocation_strategy: JwtDenylist
end
