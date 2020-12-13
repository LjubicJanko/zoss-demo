package demo.exceptions;

public class UsernameAlreadyExist extends Exception{

    public UsernameAlreadyExist() {
        super("Username already exist");
    }
}
