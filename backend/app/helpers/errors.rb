
module Errors
  class InvalidCredentials < StandardError
    def initialize
      super 'Invalid credentials'
    end
  end
end
