FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "test-#{n}@user.com" }
    password {"qwerty"}
  end
end
