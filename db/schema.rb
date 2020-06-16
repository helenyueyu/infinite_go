# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_16_004124) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "answers", force: :cascade do |t|
    t.text "body", null: false
    t.integer "user_id", null: false
    t.integer "question_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "accepted", null: false
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "badges", force: :cascade do |t|
    t.string "name", null: false
    t.string "medal_type", null: false
    t.string "description", null: false
    t.index ["name"], name: "index_badges_on_name", unique: true
  end

  create_table "comments", force: :cascade do |t|
    t.text "body", null: false
    t.integer "user_id", null: false
    t.integer "commentable_id", null: false
    t.string "commentable_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "name", null: false
    t.text "description", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "impressions", force: :cascade do |t|
    t.string "impressionable_type"
    t.integer "impressionable_id"
    t.integer "user_id"
    t.string "controller_name"
    t.string "action_name"
    t.string "view_name"
    t.string "request_hash"
    t.string "ip_address"
    t.string "session_hash"
    t.text "message"
    t.text "referrer"
    t.text "params"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["controller_name", "action_name", "ip_address"], name: "controlleraction_ip_index"
    t.index ["controller_name", "action_name", "request_hash"], name: "controlleraction_request_index"
    t.index ["controller_name", "action_name", "session_hash"], name: "controlleraction_session_index"
    t.index ["impressionable_type", "impressionable_id", "ip_address"], name: "poly_ip_index"
    t.index ["impressionable_type", "impressionable_id", "params"], name: "poly_params_request_index"
    t.index ["impressionable_type", "impressionable_id", "request_hash"], name: "poly_request_index"
    t.index ["impressionable_type", "impressionable_id", "session_hash"], name: "poly_session_index"
    t.index ["impressionable_type", "message", "impressionable_id"], name: "impressionable_type_message_index"
    t.index ["user_id"], name: "index_impressions_on_user_id"
  end

  create_table "jobs", force: :cascade do |t|
    t.string "title", null: false
    t.string "location", null: false
    t.text "description", null: false
    t.string "experience_level", default: [], null: false, array: true
    t.string "industry", default: [], null: false, array: true
    t.string "job_type", null: false
    t.string "company_size", null: false
    t.string "company_type", null: false
    t.integer "company_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_jobs_on_company_id"
    t.index ["user_id"], name: "index_jobs_on_user_id"
  end

  create_table "questions", force: :cascade do |t|
    t.string "title", null: false
    t.text "body", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_questions_on_user_id"
  end

  create_table "taggables", force: :cascade do |t|
    t.integer "taggable_id", null: false
    t.string "taggable_type", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "tag_id", null: false
    t.integer "user_id", null: false
    t.index ["tag_id", "taggable_id", "taggable_type"], name: "index_taggables_on_tag_id_and_taggable_id_and_taggable_type", unique: true
    t.index ["tag_id"], name: "index_taggables_on_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", limit: 35, null: false
    t.integer "user_id", null: false
    t.index ["name"], name: "index_tags_on_name", unique: true
  end

  create_table "user_badges", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "badge_id", null: false
    t.index ["user_id", "badge_id"], name: "index_user_badges_on_user_id_and_badge_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "reputation", null: false
    t.string "location"
    t.datetime "last_seen_at"
    t.string "description", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.integer "value"
    t.integer "user_id", null: false
    t.integer "voteable_id"
    t.string "voteable_type"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "voteable_type", "voteable_id"], name: "index_votes_on_user_id_and_voteable_type_and_voteable_id", unique: true
  end

end
