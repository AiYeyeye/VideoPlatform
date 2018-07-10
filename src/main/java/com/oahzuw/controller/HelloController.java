package com.oahzuw.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @author 武钊 (oahzuw@gmail.com)
 * @date 2018/6/26 0:14
 * 仅测试free marker 是否可用, 后期删除
 */
@Controller
public class HelloController {
    @RequestMapping("")
    public String hello(Model model) {
        model.addAttribute("name", "World!");
        return "test";
    }

    @RequestMapping("")
    public String index() {
        return "index";
    }
}
