class Task < ApplicationRecord
  has_and_belongs_to_many :categories

  validates :name, presence: true, length: { minimum: 1 }
end
