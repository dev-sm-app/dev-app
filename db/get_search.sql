select * from users
where users.id != $1
limit $2 offset 0;