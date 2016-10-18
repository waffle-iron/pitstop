package biz.Services.Exception;

/**
 * Created by User on 08.10.2016.
 */
public class IncorrectDataException extends RuntimeException {

    public IncorrectDataException(){}

    public IncorrectDataException(String message){
        super(message);
    }
}
