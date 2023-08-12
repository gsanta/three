class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def self.return_existing_or_create_for_google(email)
    where(provider: 'google', email: email).first_or_create do |user|
      user.email = email
      user.provider = 'google'
      user.password = Devise.friendly_token[0, 20]
    end
  end
end
