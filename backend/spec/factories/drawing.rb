# frozen_string_literal: true

FactoryBot.define do
  factory :drawing, class: Drawing do
    sequence(:title) { |n| "Title-#{n}" }
    content { '{ "drawing": "content" }' }

    association :user
  end
end
