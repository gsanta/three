FactoryBot.define do
  factory :user do
    email { 'user1@test.com' }
    password { 'Pa$$w0rd' }

    trait :current_user do
      email { "user2@test.com" }
      password { 'Pa$$w0rd' }
    end
  end
end
