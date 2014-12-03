class User < ActiveRecord::Base
  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :email, uniqueness: true
end