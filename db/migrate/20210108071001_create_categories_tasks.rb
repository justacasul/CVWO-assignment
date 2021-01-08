class CreateCategoriesTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :categories_tasks do |t|
      t.references :category, null: false, foreign_key: true
      t.references :task, null: false, foreign_key: true

      t.timestamps
    end
  end
end
