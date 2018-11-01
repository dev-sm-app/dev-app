select * from posts
where userid = $1
or userid in (select friendid from friends where userid = $1)
order by id desc