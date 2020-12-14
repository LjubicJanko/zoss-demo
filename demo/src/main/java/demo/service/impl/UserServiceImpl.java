package demo.service.impl;

import demo.dto.request.CommentDto;
import demo.dto.request.UserDTO;
import demo.dto.request.UserEditDTO;
import demo.dto.request.UserRegistrationDTO;
import demo.exceptions.*;
import demo.model.AbstractUser;
import demo.model.Admin;
import demo.model.Authority;
import demo.model.User;
import demo.repository.AdminRepository;
import demo.repository.AuthorityRepository;
import demo.repository.CommentRepository;
import demo.repository.UserRepository;
import demo.service.UserService;
import demo.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static demo.config.Constants.*;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final AuthorityRepository authorityRepository;
    private final CommentRepository commentRepository;


    @Override
    public User create(UserRegistrationDTO userRegistrationDTO) throws UsernameAlreadyExist, UsernameNotValid, PasswordNotValid, EmailNotValid, EmailAlreadyExist, AuthorityDoesNotExist {
        Optional<User> userFound = userRepository.findOneByUsername(userRegistrationDTO.getUsername());
        Optional<Admin> adminFound = adminRepository.findOneByUsername(userRegistrationDTO.getUsername());

        if (userFound.isPresent() || adminFound.isPresent()) {
            throw new UsernameAlreadyExist();
        }

        userFound = userRepository.findOneByEmail(userRegistrationDTO.getEmail());

        if (userFound.isPresent()) {
            throw new EmailAlreadyExist();
        }

        if (!userRegistrationDTO.getUsername().matches(USERNAME_REGEX)) {
            throw new UsernameNotValid();
        }

        if (!userRegistrationDTO.getPassword().matches(PASSWORD_REGEX)) {
            throw new PasswordNotValid();
        }

        if (!userRegistrationDTO.getEmail().matches(EMAIL_REGEX)) {
            throw new EmailNotValid();
        }

        User newUser = new User(userRegistrationDTO.getUsername(),
                userRegistrationDTO.getPassword(),
                userRegistrationDTO.getFirstName(),
                userRegistrationDTO.getLastName(),
                userRegistrationDTO.getEmail());

        List<Authority> authorities = new ArrayList<Authority>();

        Optional<Authority> authority = authorityRepository.findOneByName("ROLE_REGISTERED");
        if (!authority.isPresent()) {
            throw new AuthorityDoesNotExist("ROLE_REGISTERED");
        }

        userRepository.save(newUser);

        authorities.add(authority.get());
        newUser.setAuthorities(authorities);

        return userRepository.save(newUser);
    }

    @Override
    public AbstractUser findByUsername(String username) throws UserNotFound {
        Optional<User> u = userRepository.findOneByUsername(username);
        if (u.isPresent()) {
            return u.get();
        } else {
            Optional<Admin> a = adminRepository.findOneByUsername(username);
            if (a.isPresent()) {
                return a.get();
            }
            throw new UserNotFound();
        }
    }

    @Override
    public User editUser(UserEditDTO userEditDTO, String username) throws UserNotFound, EmailNotValid, FirstNameNotValid, LastNameNotValid {

        Optional<User> userOptional = userRepository.findOneByUsername(username);

        if (!userOptional.isPresent()) {
            throw new UserNotFound();
        } else {
            User user = userOptional.get();
            if (userEditDTO.getEmail() != null) {
                if (!userEditDTO.getEmail().matches(EMAIL_REGEX)) {
                    throw new EmailNotValid();
                }
                user.setEmail(userEditDTO.getEmail());
            }

            if (userEditDTO.getFirstName() != null) {
                if (userEditDTO.getFirstName().matches(WHITESPACES_REGEX)) {
                    throw new FirstNameNotValid();
                }
                user.setFirstName(userEditDTO.getFirstName());
            }

            if (userEditDTO.getLastName() != null) {
                if (userEditDTO.getLastName().matches(WHITESPACES_REGEX)) {
                    throw new LastNameNotValid();
                }
                user.setLastName(userEditDTO.getLastName());
            }

            userRepository.save(user);
            return user;
        }

    }

    @Override
    public List<UserDTO> getAll() {
        List<UserDTO> users = ObjectMapperUtils.mapAll(userRepository.findAll(), UserDTO.class);
        List<UserDTO> admins = ObjectMapperUtils.mapAll(adminRepository.findAll(), UserDTO.class);

        return Stream.of(users, admins)
                .flatMap(x -> x.stream())
                .collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getComments(Long id) {
        return ObjectMapperUtils.mapAll(commentRepository.findAllByUserId(id), CommentDto.class);
    }


}