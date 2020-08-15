class HomeController < ApplicationController
  def index
    @initial_props = {
      children: 'Using a ViewComponent!'
    }
  end
end
