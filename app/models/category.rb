class Category < ApplicationRecord
  has_and_belongs_to_many :tasks

  validates :name, presence: true
end
