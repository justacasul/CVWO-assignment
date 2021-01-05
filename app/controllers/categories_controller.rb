class CategoriesController < ApplicationController
  def index
    categories =
      if params[:task_id]
        Category.includes(:tasks).where(tasks: { id: params[:task_id] })
      else
        Category.all
      end
    render json: categories
  end

  def create
    category = Category.create(category_param)
    render json: category
  end

  def update
    category = Category.find(params[:id])
    category.update_attributes(category_param)
    render json: category
  end

  def show
    category = Category.find(params[:id])
    render json: category
  end

  def destroy
    category = Category.find(params[:id])
    if params[:task_id]
      task = Task.find(params[:task_id])
      task.categories.delete(category)
    else
      category.destroy
    end
    head :no_content, status: :ok
  end

  private
  def category_param
    params.require(:category).permit(:name)
  end
end
