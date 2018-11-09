select id, firstname, user_name, picture, lastname from users
where id in (select friendid from recents 
where userid = $1
order by lastmessaged
)