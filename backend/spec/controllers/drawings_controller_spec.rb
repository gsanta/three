require "rails_helper"
require_relative 'authenticated_and_authorized_action'

RSpec.describe DrawingsController, type: :controller do
  let(:user) { create :user }

  shared_examples_for 'required parameter' do |param:|
    context "when #{param} param is missing" do
      let(:param_name) { param.is_a?(Hash) ? param.values.first : param }

      before do
        if param.is_a?(Hash)
          params[param.keys.first].delete param_name
        else
          params.delete param_name
        end
      end

      it 'responds with 400 Bad Request' do
        subject

        expect(response).to have_http_status :bad_request
      end
    end
  end

  describe "#index" do
    subject(:get_drawings) { get :index }

    it_behaves_like "an authenticated and authorized action for get"
  end

  describe "#create" do
    subject(:create_drawing) { get :create, params: params, as: :json }

    let(:title) { "Test drawing" }
    let(:content) { '{ "drawing": "content" }' }
    let(:params) { { drawing: { title: title, content: content } } }

    it_behaves_like "an authenticated and authorized action for post"

    context "when creating a new drawing" do
      before do
        sign_in user
      end

      it_behaves_like 'required parameter', param: { drawing: :title }

      it "should return 200:OK" do
        subject
        expect(response).to have_http_status(:success)
      end
    end

  end
end
