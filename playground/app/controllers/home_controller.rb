class HomeController < ApplicationController
  def index
    @initial_props = {
      children: 'Some custom data'
    }.to_json
  end
end
