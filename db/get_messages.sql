select id, type, messagepicture, message, authorpicture, userid, friendid from messages
where userid = $1
or friendid = $1
order by id