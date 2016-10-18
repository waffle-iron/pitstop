package biz.dto;

import biz.utils.TimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import java.sql.Time;

/**
 * Created by User on 07.10.2016.
 */
public class CarWashForm extends ShortCarWashInfo {

    private Integer boxCount;

    @JsonDeserialize(using = TimeDeserializer.class)
    private Time firstShift;

    @JsonDeserialize(using = TimeDeserializer.class)
    private Time secondShift;

    public Integer getBoxCount() {
        return boxCount;
    }

    public void setBoxCount(Integer boxCount) {
        this.boxCount = boxCount;
    }

    public Time getFirstShift() {
        return firstShift;
    }

    public void setFirstShift(Time firstShift) {
        this.firstShift = firstShift;
    }

    public Time getSecondShift() {
        return secondShift;
    }

    public void setSecondShift(Time secondShift) {
        this.secondShift = secondShift;
    }

    @Override
    public String toString() {
        return "CarWashForm{" +
                super.toString() +
                "boxCount=" + boxCount +
                ", firstShift=" + firstShift +
                ", secondShift=" + secondShift +
                '}';
    }
}
