select * from users where developertype = 'UX/UI Design'  and id != $3
limit $1 offset $2;