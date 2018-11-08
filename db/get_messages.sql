select id, type, messagepicture, message, authorpicture, userid, friendid, messagedate from messages
where userid = $1
or friendid = $1
order by id