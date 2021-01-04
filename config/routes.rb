Rails.application.routes.draw do
  scope '/' do
    resources :tasks do
      resources :categories, shallow: true
    end
    resources :categories do
      resources :tasks, shallow: true
    end
  end
end
