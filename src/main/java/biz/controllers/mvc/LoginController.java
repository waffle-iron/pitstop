package biz.controllers.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class LoginController {

    @RequestMapping(value ={"/", "/login"}, method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    @RequestMapping(value ={"/owner"}, method = RequestMethod.GET)
    public String owner() {
        return "owner";
    }

    @RequestMapping(value ={"/admin"}, method = RequestMethod.GET)
    public String admin() {
        return "admin";
    }


}
