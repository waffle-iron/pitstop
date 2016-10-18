package biz.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * In JSON the time is send in string format but java.sql.Time doesn't have constructor with String therefore this class uses for Deserialization json to Time.
 * The JSON string has to have following format "hh:mm"
 *
 * Created by Bizon4ik on 16.09.2016.
 */
public class TimeDeserializer extends JsonDeserializer<Time> {
    @Override
    public Time deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        ObjectCodec oc = jsonParser.getCodec();
        JsonNode node = oc.readTree(jsonParser);
        Time result = null;
        if (node.textValue() != null){
            result = convert(node.textValue());
        }
        return result;
    }

    private java.sql.Time convert(String value){
        SimpleDateFormat sf = new SimpleDateFormat("hh:mm");
        try {
            Date date = sf.parse(value);
            return new Time(date.getTime());
        } catch (ParseException e) {
            //TODO: logger
            System.out.println("---------------------");
            System.out.println("JSON Deserializer не смог конвертирова дату");
            e.printStackTrace();
            return null;
        }
    }
}
