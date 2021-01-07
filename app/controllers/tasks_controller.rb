class TasksController < ApplicationController
  def index
    if params[:category_id]
      tasks = Task.includes(:categories).where(categories: {id: params[:category_id]})
      tasks.order("due ASC")
    else
      tasks = Task.order("due ASC")
    end
    render json: tasks
  end

  def create
    task = Task.create(task_param)
    render json: task
  end

  def update
    task = Task.find(params[:id])
    if params[:category_id]
      category = Category.find(params[:category_id])
      category.tasks << task
      head :no_content, status: :ok
    else
      task.update_attributes(task_param)
      render json: task
    end
  end

  def destroy
    task = Task.find(params[:id])
    if params[:category_id]
      category = Category.find(params[:category_id])
      category.tasks.delete(task)
    else
      task.destroy
    end
    head :no_content, status: :ok
  end

  def show
    task = Task.find(params[:id])
    render json: task
  end

  private
    def task_param
      params.require(:task).permit(:name, :detail, :due)
    end
end
