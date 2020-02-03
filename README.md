# chat-space DB設計
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false, unique: true|
### Association
- has_many :messages
- has_many :groups_users
- has_many :groups, through: groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
### Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string
|users_id|string|null: false, foreign_key: true|
|groups_id|string|null: false, foreign_key: true|
### Association
- belong to :user
- belong to :group

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|users_id|string|null: false, foreign_key: true|
|groups_id|string|null: false, foreign_key: true|
### Association
- belong to :user
- belong to :group