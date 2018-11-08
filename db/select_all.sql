select * from users 
where id != $1 
limit $2 offset $3;