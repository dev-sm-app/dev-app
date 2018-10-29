select * from users
where user.id != $1
limit $2;