select * from users where developertype = 'Salesforce Development' and id != $3 
limit $1 offset $2;