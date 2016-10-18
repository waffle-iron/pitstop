package biz.models;

/**
 * Created by User on 26.09.2016.
 */
public class Message {
    private String message;

    public Message(String message){
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Message responce = (Message) o;

        return message != null ? message.equals(responce.message) : responce.message == null;

    }

    @Override
    public int hashCode() {
        return message != null ? message.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "Responce{" +
                "message='" + message + '\'' +
                '}';
    }
}
