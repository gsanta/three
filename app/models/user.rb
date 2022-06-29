# frozen_string_literal: true

require 'securerandom'

# User model
class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  validates :email, uniqueness: true

  before_validation :generate_uuid

  devise :database_authenticatable,
         :jwt_authenticatable,
         :registerable,
         :omniauthable, omniauth_providers: %i[github],
         jwt_revocation_strategy: JwtDenylist

  private

  def generate_uuid
    self.slug = SecureRandom.uuid
  end

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
