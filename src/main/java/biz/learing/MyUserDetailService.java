package biz.learing;

import biz.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by User on 03.08.2016.
 */
@Service("userDetailsService")
public class MyUserDetailService implements UserDetailsService {

    UserDAO userDAO;

    @Autowired
    public MyUserDetailService(UserDAO userDAO){
        this.userDAO = userDAO;
    }

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
//        if (SecurityContextHolder.getContext().getAuthentication() != null) {
//            org.springframework.security.core.userdetails.User userLogged = (org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//            System.out.println("currentUser = " + userLogged);
//        }

        User user = userDAO.findByUserLogin(name);
        System.out.println("The following user was taken: " + user);
        List<GrantedAuthority> authorities = buildUserAuthority(user.getRole());
        return buildUserForAuthentication(user, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(Role role) {
        List<GrantedAuthority> result = new ArrayList<GrantedAuthority>();
        result.add(new SimpleGrantedAuthority(role.toString()));
        return result;
    }

    // Converts com.mkyong.users.model.User user to
    // org.springframework.security.core.userdetails.User
    private org.springframework.security.core.userdetails.User buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
        return new org.springframework.security.core.userdetails.User(user.getUserLogin(), user.getUserPassword(), user.getEnable(), true, true, true, authorities);
    }
}
