Rails.application.routes.draw do
  scope '/' do
    resources :tasks do
      resources :categories, only: %i[index new create destroy update]
    end
    resources :categories do
      resources :tasks, only: %i[index new create destroy]
    end
  end
end
