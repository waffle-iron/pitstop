package biz.Services;

import biz.Services.Exception.IncorrectDataException;
import biz.Services.Exception.TechnicalException;
import biz.dao.CarWashDAOInf;
import biz.dto.CarWashForm;
import biz.dto.ShortCarWashInfo;
import biz.models.CarWash;
import biz.models.Person;
import biz.models.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Created by User on 02.09.2016.
 */
@Service("CarWashService")
public class CarWashService {

    CarWashDAOInf carWashDAO;

    ModelMapper modelMapper;

    @Autowired
    public CarWashService(CarWashDAOInf carWashDAO, ModelMapper modelMapper){
        this.carWashDAO = carWashDAO;
        this.modelMapper = modelMapper;
    }

    @Transactional(readOnly = true)
    public Set<CarWash> getAllCarWashes(){
        return carWashDAO.findAll();
    }

    @Transactional(readOnly = true)
    public List<ShortCarWashInfo> getShortCarWashesInfoList(){
        Set<CarWash> all = carWashDAO.findAll();

        return all.stream()
                .map(carWash -> modelMapper.map(carWash, ShortCarWashInfo.class))
                .sorted((name1, name2) -> name1.getName()
                .compareTo(name2.getName()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public CarWashForm getCarWashForm (Long id){
        CarWash carWash = carWashDAO.findOne(id);

        return modelMapper.map(carWash, CarWashForm.class);
    }

    public CarWash getCarWashByName(String name) { return carWashDAO.findByName(name);}

    public Boolean isCarWashNameExist(String name){
        Boolean result = false;
        if (getCarWashByName(name.trim().toLowerCase()) != null){
            result = true;
        }
        return result;
    }

    public CarWash saveCarWash(CarWash carWash) {
        carWash.setEnable(true);
        carWash.setCreatedBy(getAuthorizPerson());
        carWash.setDateOfCreation(new Date(1000L));
        CarWash result = carWashDAO.save(carWash);
        if (result.getId() != null){
            return result;
        }
        //TODO: log for exception
        throw new TechnicalException("After save CarWash don't have id!!! CarWash = " + result);
    }
    
    private Person getAuthorizPerson() {
        //TODO: to make abstract service where this method will be general
        return ((SecurityUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getPerson();
    }

    @Transactional
    public void updateCarWash(CarWashForm carWashForm){
        if(carWashForm.getId() == null) throw new IncorrectDataException("Fail to update carWash, CarWashForm doesn't have id");
        CarWash oldCarWash = carWashDAO.findOne(carWashForm.getId());
        if (oldCarWash == null) throw new IncorrectDataException("Fail to update carWash, id" + carWashForm.getId() + " not exist" );
        updateCarWashEntity(oldCarWash, carWashForm);
    }

    private void updateCarWashEntity(CarWash oldCarWash, CarWashForm carWashForm) {
        CarWash newCarWash = modelMapper.map(carWashForm, CarWash.class);
        oldCarWash.setName(newCarWash.getName());
        oldCarWash.setAddress(newCarWash.getAddress());
        oldCarWash.setPhoneNumber(newCarWash.getPhoneNumber());
        oldCarWash.setBoxCount(newCarWash.getBoxCount());
        oldCarWash.setFirstShift(newCarWash.getFirstShift());
        oldCarWash.setSecondShift(newCarWash.getSecondShift());
    }


    public void deleteCarWash(Long id) {
        carWashDAO.delete(id);
    }
}
