package biz.dao;

import biz.models.Credential;
import org.springframework.data.repository.CrudRepository;
import javax.transaction.Transactional;

/**
 * Created by User on 26.08.2016.
 */
@Transactional
public interface CredentialDAOCrud extends CrudRepository<Credential, Long> {

    public Credential findByUserLogin(String userLogin);

    public Credential findByUserLoginAndEnable(String userLogin, Boolean enable);
}
