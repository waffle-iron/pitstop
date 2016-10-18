package biz.models;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class SecurityUser extends  org.springframework.security.core.userdetails.User{

    private Person person;


    public SecurityUser(String username, String password, boolean enabled, boolean accountNonExpired, boolean credentialsNonExpired, boolean accountNonLocked, Collection<? extends GrantedAuthority> authorities, Person person) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities);
        this.person = person;
    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    @Override
    public String toString() {
        String s = super.toString();
        return s + "SecurityUser{" +
                "person=" + person +
                '}';
    }
}