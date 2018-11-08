select * from users where developertype = 'QA Engineer' and id != $3
limit $1 offset $2;