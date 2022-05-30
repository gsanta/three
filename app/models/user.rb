require 'securerandom'

class User < ApplicationRecord
  validates :email, uniqueness: true

  before_validation :generate_uuid

  devise :database_authenticatable,
    :jwt_authenticatable,
    :registerable,
    jwt_revocation_strategy: JwtDenylist

  private
  def generate_uuid
    self.slug = SecureRandom.uuid
  end
end
