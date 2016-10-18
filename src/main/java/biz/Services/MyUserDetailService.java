package biz.Services;

import biz.dao.CredentialDAOCrud;
import biz.models.Credential;
import biz.models.Role;
import biz.models.SecurityUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by User on 03.08.2016.
 */
@Service("userDetailsService")
public class MyUserDetailService implements UserDetailsService {

    CredentialDAOCrud credentialDAO;

    @Autowired
    public MyUserDetailService(CredentialDAOCrud credentialDAO){
        this.credentialDAO = credentialDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Credential credential = credentialDAO.findByUserLoginAndEnable(name, true);
        if (credential == null) {
            throw new UsernameNotFoundException("User with name = " + name + " wasn't found");
        }

        System.out.println("The following user was taken: " + credential);
        List<GrantedAuthority> authorities = buildUserAuthority(credential.getPerson().getRole());
        return buildUserForAuthentication(credential, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(Role role) {
        List<GrantedAuthority> result = new ArrayList<GrantedAuthority>();
        result.add(new SimpleGrantedAuthority(role.toString()));
        return result;
    }

    // Converts com.mkyong.users.model.User user to
    // org.springframework.security.core.userdetails.User
    private org.springframework.security.core.userdetails.User buildUserForAuthentication(Credential user, List<GrantedAuthority> authorities) {
        return new SecurityUser(user.getUserLogin(), user.getUserPassword(), user.getEnable(), true, true, true, authorities, user.getPerson());
    }
}
