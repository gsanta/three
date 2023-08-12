FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test-#{n}@user.com" }
    password {"qwerty"}

    trait :provider_google do
      provider { 'google' }
    end
  end
end
