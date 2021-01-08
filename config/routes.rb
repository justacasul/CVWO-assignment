Rails.application.routes.draw do
  get 'categories/index'
  get 'categories/create'
  get 'categories/update'
  get 'categories/destroy'
  get 'tasks/index'
  get 'tasks/create'
  get 'tasks/update'
  get 'tasks/destroy'
  scope '/' do
    resources :tasks do
      resources :categories, only: %i[index new create destroy update]
    end
    resources :categories do
      resources :tasks, only: %i[index create destroy update]
    end
  end
end
