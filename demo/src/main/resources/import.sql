insert into authority (id, deleted, name) values (1, false, "ROLE_REGISTERED");
insert into authority (id, deleted, name) values (2, false, "ROLE_ADMIN");

insert into admins (id, first_name, last_name, password, username) values (1, "Admin", "Admin", "$2y$12$Cg76kI/v91EAqOjRWSrr/utljtY604voeDEJ1ldYq46iWTo7Mo1wO", "admin" );
-- password Admin021!

insert into admin_authority(authority_id, admin_id) values(2,1);

insert into users (id, first_name, last_name, password, username, email) values (0, "UserFirstName", "UserLastName", "$2b$10$MbpAOLT5iU2OTOFMOBO4C.lCLUogU0VY3K.myRwMVuI.Cgi3prINO", "user", "user@gmail.com" );
-- password User123!

insert into user_authority(authority_id, user_id) values (1, 0);
