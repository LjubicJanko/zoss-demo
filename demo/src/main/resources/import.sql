insert into authority (id, deleted, name) values (1, false, "ROLE_REGISTERED");
insert into authority (id, deleted, name) values (2, false, "ROLE_ADMIN");

insert into admins (id, first_name, last_name, password, username) values (1, "John", "Doe", "$2y$12$Cg76kI/v91EAqOjRWSrr/utljtY604voeDEJ1ldYq46iWTo7Mo1wO", "admin.john" );
-- password Admin021!

insert into admin_authority(authority_id, admin_id) values(2,1);

insert into users (id, first_name, last_name, password, username, email) values (0, "Jane", "Doe", "$2b$10$MbpAOLT5iU2OTOFMOBO4C.lCLUogU0VY3K.myRwMVuI.Cgi3prINO", "user.jane", "user@gmail.com" );
-- password User123!
insert into users (id, first_name, last_name, password, username, email) values (2, "Baby", "Doe", "$2b$10$MbpAOLT5iU2OTOFMOBO4C.lCLUogU0VY3K.myRwMVuI.Cgi3prINO", "user.baby", "baby.doe@gmail.com" );
-- password User123!

insert into user_authority(authority_id, user_id) values (1, 0);
insert into user_authority(authority_id, user_id) values (1, 2);



insert into comments (id, deleted, content, user_id) values (1, false, "Jane: I love this feature.", 0);
insert into comments (id, deleted, content, user_id) values (2, false, "Jane: Here I can see only mine comments, and that is great!", 0);
insert into comments (id, deleted, content, user_id) values (3, false, "Jane: This is dummy comment.", 0);


insert into comments (id, deleted, content, user_id) values (4, false, "Baby: Lorem ipsum.", 2);
insert into comments (id, deleted, content, user_id) values (5, false, "Baby: What is this used for?", 2);