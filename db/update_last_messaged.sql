update recents
set lastmessaged = $1
where userid = $2
and friendid = $3