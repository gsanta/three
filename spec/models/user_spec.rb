require 'rails_helper'

RSpec.describe User, type: :model do
  it 'works' do
    user = create(:user)

    expect(user.email).to eq 'user3@test.com'
  end
end