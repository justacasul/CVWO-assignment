class CreateTasks < ActiveRecord::Migration[6.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.text :detail
      t.datetime :due

      t.timestamps
    end
  end
end
