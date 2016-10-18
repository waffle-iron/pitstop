package biz.Services.Exception;

/**
 * Created by User on 23.09.2016.
 */
public class TechnicalException extends RuntimeException {

    public TechnicalException(){}

    public TechnicalException(String message){
        super(message);
    }
}
