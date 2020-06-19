class ChangeBookmarkableTypeFromIntegerToString < ActiveRecord::Migration[5.2]
  def change
    change_column :bookmarks, :bookmarkable_type, :string
  end
end
