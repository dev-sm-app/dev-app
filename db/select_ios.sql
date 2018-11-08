select * from users where developertype = 'IOS Development' and id != $3
limit $1 offset $2;