package biz.learing;


import org.springframework.data.repository.CrudRepository;

import javax.transaction.Transactional;

/**
 * Created by User on 01.08.2016.
 */
@Transactional
public interface UserDAO extends CrudRepository<User, Long> {

    public User findByUserLogin(String userLogin);

}
