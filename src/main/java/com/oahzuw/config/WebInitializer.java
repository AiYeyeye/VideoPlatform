package com.oahzuw.config;


import org.apache.log4j.Logger;
import org.springframework.web.WebApplicationInitializer;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

/**
 * @author 武钊
 */
public class WebInitializer implements WebApplicationInitializer {

    private static Logger logger = Logger.getLogger(WebInitializer.class);

    /**
     * 初始加载
     */
    @Override
    public void onStartup(ServletContext servletContext)
            throws ServletException {
        logger.debug("初始化WEB配置...");
        // 初始化Spring容器
        AnnotationConfigWebApplicationContext application =
                new AnnotationConfigWebApplicationContext();
        application.register(CommonConfiguration.class);
        application.register(MyBatisConfiguration.class);
        application.register(WebConfiguration.class);
        application.setServletContext(servletContext);
        logger.debug("创建Spring容器成功");

        // 编码监听器
        FilterRegistration.Dynamic characterEncodingFilter = servletContext.addFilter("characterEncodingFilter", new CharacterEncodingFilter("UTF-8"));
        characterEncodingFilter.addMappingForUrlPatterns(null, true, "/*");
        logger.debug("添加编码过滤器");

        // 核心过滤器
        javax.servlet.ServletRegistration.Dynamic dispatcherServlet = servletContext.addServlet("dispatcherServlet", new DispatcherServlet(application));
        dispatcherServlet.addMapping("/");
        dispatcherServlet.setLoadOnStartup(1);
        logger.debug("添加前端控制器");

    }

}
