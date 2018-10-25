update users set 
firstname = $2, 
lastname = $3, 
developertype = $4, 
company = $5
where users.id = $1 returning *;