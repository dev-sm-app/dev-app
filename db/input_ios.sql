select * from users 
where users.id != $1 and developertype = 'IOS Development' and firstname
like $2 or lastname like $2
limit $3 offset $4;