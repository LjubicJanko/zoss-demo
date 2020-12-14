package demo.service;


import demo.dto.request.CommentDto;
import demo.dto.request.UserDTO;
import demo.dto.request.UserEditDTO;
import demo.dto.request.UserRegistrationDTO;
import demo.exceptions.*;
import demo.model.AbstractUser;
import demo.model.User;

import java.util.List;

public interface UserService {

    User create(UserRegistrationDTO userRegistrationDTO) throws UsernameAlreadyExist, UsernameNotValid, PasswordNotValid, EmailNotValid, EmailAlreadyExist, AuthorityDoesNotExist;

    AbstractUser findByUsername(String username) throws UserNotFound;

    User editUser(UserEditDTO userEditDTO, String username) throws UserNotFound, EmailNotValid, FirstNameNotValid, LastNameNotValid;

    List<UserDTO> getAll();

    List<CommentDto> getComments(Long id);
}
