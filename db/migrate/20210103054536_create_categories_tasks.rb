class CreateCategoriesTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :categories_tasks do |t|
      t.integer :category_id
      t.integer :task_id

      t.timestamps
    end
  end
end
