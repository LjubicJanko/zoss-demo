package demo.exceptions;

public class AuthorityDoesNotExist extends Exception {
    public AuthorityDoesNotExist(String s) {
        super("Authority " + s + " doesn't exist");
    }
}
