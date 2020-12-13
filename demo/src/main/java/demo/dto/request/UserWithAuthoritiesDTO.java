package demo.dto.request;

import demo.model.Authority;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class UserWithAuthoritiesDTO {

    private Long id;
    private String username;
    private String firstName;
    private String lastName;
    private String email;
    private List<Authority> authorities;

    public UserWithAuthoritiesDTO(Long id, String username, String password, String firstName, String lastName, String email,
                   List<Authority> authorities) {
        this.id = id;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.authorities = authorities;
    }
}