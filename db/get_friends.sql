select * from users
where id in (select friendid from friends where userid = $1) and id != $1
limit 10 offset $2;