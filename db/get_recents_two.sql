select id, firstname, user_name, picture, lastname from users
where id in (select userid from recents 
where friendid = $1
order by lastmessaged
)