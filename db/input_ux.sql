select * from users 
where users.id != $1 and developertype = 'UX/UI Design' and
firstname like $2 or lastname like $2
limit $3 offset $4;