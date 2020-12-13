package demo.exceptions;

public class UsernameNotValid extends Exception {
    public UsernameNotValid() {
        super("Username not valid");
    }
}
