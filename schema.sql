create table chirps(
id int not null auto_increment primary key,
userid int not  null,
content text not null,
username varchar(50) null,
_created datetime default CURRENT_TIMESTAMP
);
