package demo.exceptions;

public class EmailAlreadyExist extends Exception {
    public EmailAlreadyExist() {
        super("Email already exist");
    }
}
