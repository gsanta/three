# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'works' do
    user = build(:user)

    expect(user.email).to eq 'user1@test.com'
  end
end
