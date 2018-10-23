insert into users
(user_name, email, auth_id, picture)
values
($1, $2, $3, $4)
RETURNING *;