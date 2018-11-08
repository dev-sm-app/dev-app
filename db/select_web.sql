select * from users where developertype = 'Web Development' and id != $3
limit $1 offset $2;