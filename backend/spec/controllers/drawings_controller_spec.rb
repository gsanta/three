require "rails_helper"
require_relative 'authenticated_and_authorized_action'
require_relative './helpers/examples_for_required_params'

RSpec.describe DrawingsController, type: :controller do
  let(:user) { create :user }

  let(:response_body) { JSON.parse response.body }
  let(:title) { 'Title-1' }
  let(:content) { '{ "drawing": "content" }' }

  describe "#index" do
    subject(:get_drawings) { get :index, as: :json }

    it_behaves_like "an authenticated and authorized action for api"

    context "when getting the drawings" do
      before do
        sign_in user
      end

      it "returns the drawings of the logged in user" do
        create :drawing, title: title, content: content, user: user

        subject

        expect(response_body).to match_array hash_including 'title' => title,
                                                            'content' => content
      end
    end
  end

  describe "#show" do
    subject(:get_drawing) { get :show, params: { id: drawing.id }, as: :json }

    let (:drawing) { create :drawing, title: title, content: content, user: user }

    it_behaves_like "an authenticated and authorized action for api"

    context "when the user is signed in" do
      before do
        sign_in user
      end

      context "when getting a drawing" do
        it "returns the drawing" do

          subject

          expect(response_body).to eq 'id' => drawing.id,
                                      'title' => title,
                                      'content' => content
        end
      end

      context "when the drawing does not exist" do
        subject(:get_drawing) { get :show, params: { id: drawing.id + 1 }, as: :json }

        it "responds with 404 Not Found" do
          subject

          expect(response).to have_http_status :not_found
        end
      end
    end
  end

  describe "#create" do
    subject(:create_drawing) { get :create, params: params, as: :json }

    let(:title) { "Test drawing" }
    let(:params) { { title: title, content: content } }

    it_behaves_like "an authenticated and authorized action for api"

    context "when creating a new drawing" do
      before do
        sign_in user
      end

      it_behaves_like 'required parameter', param: :title

      it "should return 200:OK" do
        subject
        expect(response).to have_http_status(:success)
      end

      it "creates a drawing" do
        expect { subject }.to change(Drawing, :count).by 1
        expect(Drawing.last).to have_attributes user_id: user.id,
                                                title: title,
                                                content: content
      end
    end
  end

  describe "#update" do
    subject(:update_drawing) { patch :update, params: params, as: :json }

    let(:params) do
      {
        id: drawing.id,
        content: '{ "drawing": "new-content" }'
      }
    end
    let!(:drawing) { create :drawing, title: title, content: content, user: user }

    it_behaves_like "an authenticated and authorized action for api"

    context 'when patching the content' do
      it "updates the content of the model" do
        sign_in user
        expect { update_drawing }.to change { drawing.reload.content }.to params[:content]
      end
    end

    context 'when patching the title' do
      let(:params) do
        {
          id: drawing.id,
          title: new_title
        }
      end
      let(:new_title) { 'New Title' }

      it 'updates the title of the model' do
        sign_in user
        expect { update_drawing }.to change { drawing.reload.title }.to params[:title]
      end
    end
  end

  describe "#destroy" do
    subject(:delete_drawing) { delete :destroy, params: { id: drawing.id }, as: :json }

    let!(:drawing) { create :drawing, title: title, content: content, user: user }

    it_behaves_like "an authenticated and authorized action for api"

    context "when deleting a drawing" do
      before do
        sign_in user
      end

      it "deletes the drawing" do

        expect { delete_drawing }.to change(Drawing, :count).by -1
        expect(response).to have_http_status :ok
      end
    end
  end
end
