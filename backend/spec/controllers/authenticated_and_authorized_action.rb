
RSpec.shared_examples_for 'an authenticated and authorized action for page' do

  context 'when the user is not signed in' do
    it 'redirects to the sign in page' do
      subject
      expect(response).to redirect_to new_user_session_path
    end
  end

  context "when the user is signed in" do
    it "should return 200:OK" do
      sign_in user
      subject
      expect(response).to have_http_status(:success)
    end
  end
end

RSpec.shared_examples_for 'an authenticated and authorized action for api' do

  context 'when the user is not signed in' do
    it 'should return 401:unauthorized' do
      subject
      expect(response).to have_http_status :unauthorized
    end
  end

  context "when the user is signed in" do
    it "should return 200:OK" do
      sign_in user
      subject
      expect(response).to have_http_status(:success)
    end
  end
end
