package biz.controllers.rest;

import biz.Services.CarWashService;
import biz.Services.Exception.TechnicalException;
import biz.dto.CarWashForm;
import biz.dto.ShortCarWashInfo;
import biz.models.CarWash;
import biz.models.Message;
import com.mysql.jdbc.exceptions.MySQLNonTransientException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.List;

@RestController
public class CarWashController {

    CarWashService carWashService;

    @Autowired
    public CarWashController(CarWashService carWashService){
        this.carWashService = carWashService;
    }

    @RequestMapping(value = "/carwash/all", produces = "application/json;charset=UTF-8", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public List<ShortCarWashInfo> getAllCarWash(){
        return carWashService.getShortCarWashesInfoList();
    }

    @RequestMapping(value = "/carwash/add", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public void addCarWashPOST(){
        System.out.println("inside addCarWash");
    }

    @RequestMapping(value = "/carwash/", method = RequestMethod.PUT, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Message addCarWashPUT(@RequestBody CarWash carWash) throws ParseException {
        try {
            carWashService.saveCarWash(carWash);
            Message m = new Message("Ok");
            return m;
        }catch (TechnicalException e){
            //TODO: log
            return new Message("Fail");
        }
    }

    @RequestMapping(value = "/carwash/isNameUnique", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Boolean isCarWashNameUnique(@RequestParam("name") String name) throws UnsupportedEncodingException {
        return !carWashService.isCarWashNameExist(URLDecoder.decode(name, "UTF-8"));
    }

    @RequestMapping(value = "/carwash/{id}", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public CarWashForm getCarWash(@PathVariable Long id){
        return carWashService.getCarWashForm(id);
    }

    @RequestMapping(value = "/carwash/", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Message updateCarWash(@RequestBody CarWashForm carWashForm){
        carWashService.updateCarWash(carWashForm);
        return new Message("Ok");
    }

    @RequestMapping(value = "/carwash/{id}", method = RequestMethod.DELETE, produces = "application/json;charset=UTF-8")
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Message deleteCarWash(@PathVariable Long id){
        try{
            carWashService.deleteCarWash(id);
            return new Message("Ok");
        }catch (EmptyResultDataAccessException e ){
            //TODO: log it
            System.out.println("CarWash with ID " + id + " is not exist");
            return new Message("Ok");
        }
    }



}
