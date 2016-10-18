package biz.models;

import biz.utils.TimeDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Table(name = "carwash")
public class CarWash {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "name", nullable = false, length = 50)
    @NotNull
    private String name;

    @Column(name = "address", nullable = true, length = 200)
    private String address;

    @Column(name = "phone_number", nullable = true, length = 50)
    private String phoneNumber;

    @Column(name = "box_count", nullable = false)
    @NotNull
    private Integer boxCount;

    @JsonDeserialize(using = TimeDeserializer.class)
    @Column(name = "first_shift", nullable = false)
    @NotNull
    private Time firstShift;

    @JsonDeserialize(using = TimeDeserializer.class)
    @Column(name = "second_shift", nullable = false)
    @NotNull
    private Time secondShift;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private Person createdBy;

    @Column(name = "date_of_creation", nullable = false)
    @NotNull
    private Date dateOfCreation;

    @Column(name="enable", nullable = false)
    private Boolean enable;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

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

    public Person getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Person createdBy) {
        this.createdBy = createdBy;
    }

    public Date getDateOfCreation() {
        return dateOfCreation;
    }

    public void setDateOfCreation(Date dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public Boolean getEnable() {
        return enable;
    }

    public void setEnable(Boolean enable) {
        this.enable = enable;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CarWash carWash = (CarWash) o;

        return id != null ? id.equals(carWash.id) : carWash.id == null;

    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    @Override
    public String toString() {
        return "CarWash{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", boxCount=" + boxCount +
                ", firstShift=" + firstShift +
                ", secondShift=" + secondShift +
                ", createdBy=" + createdBy +
                ", dateOfCreation=" + dateOfCreation +
                ", enable=" + enable +
                '}';
    }
}
