select u.id, u.firstname, u.user_name, u.picture from users u
join recents r on r.userid = u.id
where r.userid = $1
or r.friendid = $1
order by r.lastmessaged desc