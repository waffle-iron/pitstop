package biz.dao;
import biz.models.CarWash;
import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;
import java.util.Set;

/**
 * Created by User on 02.09.2016.
 */
@Transactional
public interface CarWashDAOInf extends CrudRepository<CarWash, Long> {

    Set<CarWash> findAll();

    CarWash findByName(String name);
}
