# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
# Prevent database truncation if the environment is production
abort("The Rails environment is running in production mode!") if Rails.env.production?
require 'rspec/rails'
require 'devise'
require_relative 'support/controller_macros'

begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end
RSpec.configure do |config|
  config.fixture_path = "#{::Rails.root}/spec/fixtures"


  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!

  # ---------------------------------------------
  # add from here
  config.expect_with :rspec do |c|
    c.syntax = :expect
  end

  config.include Devise::Test::ControllerHelpers, :type => :controller
  config.include FactoryBot::Syntax::Methods
  config.extend ControllerMacros, :type => :controller

  config.use_transactional_fixtures = true
  config.around(:each, use_transactional_fixtures: false) do |example|
    self.use_transactional_tests = false
    example.run
    self.use_transactional_tests = true

    DatabaseCleaner.clean_with(:truncation)
  end
end
