class CreateTagDescriptions < ActiveRecord::Migration[5.2]
  def change
    create_table :tag_descriptions do |t|

      t.timestamps
    end
  end
end
