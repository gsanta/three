# frozen_string_literal: true

require "rails_helper"

RSpec.describe Users::GoogleAccessTokenVerifier do
  subject { described_class.new.verify access_token }

  let(:access_token) { 'access_token' }
  let(:http_key_source) { instance_spy Google::Auth::IDTokens::JwkHttpKeySource }
  let(:verifier_class) { instance_spy Google::Auth::IDTokens::Verifier }
  let(:verifier) { instance_spy Google::Auth::IDTokens::Verifier }
  let(:cert_url) { Google::Auth::IDTokens::OAUTH2_V3_CERTS_URL }
  let(:key_source) { 'key_source' }
  let(:expected_aud) { ENV['GOOGLE_OAUTH_CLIENT_ID']}
  let(:token_info) { {'email' => email }}
  let(:email) { 'user@test.com' }


  context 'when the verify method is called' do
    before do
      allow(Google::Auth::IDTokens::JwkHttpKeySource).to receive(:new).with(cert_url).and_return(key_source)
      allow(Google::Auth::IDTokens::Verifier).to receive(:new).with(key_source: key_source).and_return(verifier)
      allow(verifier).to receive(:verify).with(access_token, aud: 'client_id').and_return(token_info)
      ENV["GOOGLE_OAUTH_CLIENT_ID"] = "client_id"
    end

    it 'delegates the access_token and client_id to google for verification' do

      subject
      expect(verifier).to have_received(:verify).with(access_token, aud: 'client_id')
    end

    context 'when verification is successful' do
      it 'returns with the user email' do
        expect(subject).to match(email)
      end
    end

    errors = [
      { error: Google::Auth::IDTokens::SignatureError, name: 'SignatureError'},
      { error: Google::Auth::IDTokens::AudienceMismatchError, name: 'AudienceMismatchError' },
      { error: Google::Auth::IDTokens::ExpiredTokenError, name: 'ExpiredTokenError' },
      { error: Google::Auth::IDTokens::AuthorizedPartyMismatchError, name: 'AuthorizedPartyMismatchError' },
      { error: Google::Auth::IDTokens::IssuerMismatchError, name: 'IssuerMismatchError' }
    ]

    errors.each do |element|
      context "when verification fails with #{element[:name]}" do
        before do
          allow(verifier).to receive(:verify).with(access_token, aud: 'client_id').and_raise(element[:error])
        end

        it 'returns with InvalidCredentials' do
          expect{ subject }.to raise_error(Errors::InvalidCredentials)
        end
      end
    end
  end
end
