package demo.exceptions;

public class PasswordNotValid extends Exception {

    public PasswordNotValid() {
        super("Password not valid");
    }
}
