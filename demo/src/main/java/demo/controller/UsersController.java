package demo.controller;

import demo.dto.request.AddCommentDto;
import demo.dto.request.UserDTO;
import demo.dto.request.UserEditDTO;
import demo.dto.request.UserWithAuthoritiesDTO;
import demo.exceptions.EmailNotValid;
import demo.exceptions.FirstNameNotValid;
import demo.exceptions.LastNameNotValid;
import demo.exceptions.UserNotFound;
import demo.model.AbstractUser;
import demo.model.User;
import demo.security.auth.TokenBasedAuthentication;
import demo.service.UserService;
import demo.util.ObjectMapperUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UsersController {

    private final UserService userService;


    @GetMapping("/me")
    public ResponseEntity user(Principal user) {
        try {
            AbstractUser u = userService.findByUsername(user.getName());
            return new ResponseEntity<UserWithAuthoritiesDTO>(ObjectMapperUtils.map(u, UserWithAuthoritiesDTO.class), HttpStatus.OK);
        } catch (UserNotFound unf) {
            unf.printStackTrace();
            return new ResponseEntity<String>(unf.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/edit-profile")
    @PreAuthorize("hasRole('REGISTERED')")
    public ResponseEntity edit(Principal user, @RequestBody UserEditDTO userEditDTO) {
        try {
            User editedUser = userService.editUser(userEditDTO, user.getName());
            return new ResponseEntity<UserDTO>(ObjectMapperUtils.map(editedUser, UserDTO.class), HttpStatus.OK);
        } catch (UserNotFound | EmailNotValid | FirstNameNotValid | LastNameNotValid ex) {
            ex.printStackTrace();
            return new ResponseEntity<String>(ex.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/all")
//    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> getAll() {
        return new ResponseEntity<List<UserDTO>>(userService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/comments/{id}")
    public ResponseEntity<?> getComments(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getComments(id), HttpStatus.OK);
    }

    @GetMapping("/comments")
    public ResponseEntity getCommentsSecure() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Long id = ((User) ((TokenBasedAuthentication) auth).getPrinciple()).getId();

        return new ResponseEntity(userService.getComments(id), HttpStatus.OK);
    }

    @PostMapping("/comment")
    public ResponseEntity addNewComment(@RequestBody AddCommentDto addCommentDto) {
        return new ResponseEntity(userService.addNewComment(addCommentDto.getUserId(), addCommentDto.getContent()), HttpStatus.OK);
    }
}