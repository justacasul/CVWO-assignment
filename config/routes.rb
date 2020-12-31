Rails.application.routes.draw do
  scope '/' do
    resources :tasks
    # resources :categories
  end
end
