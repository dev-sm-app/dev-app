insert into users
(user_name, email, auth_id)
values
($1, $2, $3)
RETURNING *;