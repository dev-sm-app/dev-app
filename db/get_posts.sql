select p.id, p.userid, p.description, p.picture, p.code, p.postdate, p.mode, u.picture as authorpicture, u.firstname, u.lastname, u.developertype  from posts p
join users u on u.id = p.userid
where userid = $1
or userid in (select friendid from friends where userid = $1)
order by id desc