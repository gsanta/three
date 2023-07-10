
RSpec.shared_examples_for 'required parameter' do |param:|
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
