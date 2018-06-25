package com.oahzuw.config;

import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;
import org.apache.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerView;
import org.springframework.web.servlet.view.freemarker.FreeMarkerViewResolver;

import java.nio.charset.Charset;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

/**
 * @author 武钊
 */
@Configuration
@EnableWebMvc
public class WebConfiguration implements WebMvcConfigurer {


    private static Logger logger = Logger.getLogger(WebConfiguration.class);

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        logger.debug("Spring MVC静态资源映射...");

//        registry.addResourceHandler("/images/**").addResourceLocations("/images/");
    }

    /**
     * 内部资源视图解析器
     *
     * @return
     */
    @Bean
    public FreeMarkerViewResolver viewResolver() {
        logger.debug("初始化内部资源视图解析器...");

        FreeMarkerViewResolver resolver = new FreeMarkerViewResolver();

        resolver.setCache(false);
        resolver.setViewClass(FreeMarkerView.class);
        resolver.setSuffix(".ftl");
        resolver.setContentType("text/html;charset=UTF-8");
        return resolver;
    }

    @Bean
    public FreeMarkerConfigurer freeMarkerConfig() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPath("/WEB-INF/templ/");
        configurer.setDefaultEncoding("UTF-8");
        return configurer;
    }


    /**
     * 视图控制器
     */
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        logger.debug("初始化静态视图控制器...");

//        registry.addViewController("/index").setViewName("index");
//        registry.addViewController("/about").setViewName("about");
    }

    /**
     * 格式化器
     */
    @Override
    public void addFormatters(FormatterRegistry registry) {
        logger.debug("初始化Spring MVC日期格式化器...");

        registry.addConverter(new Converter<String, Date>() {

            @Override
            public Date convert(String source) {
                if (source == null || source.trim().equals("")) {
                    return null;
                }
                DateFormat df;
                // yyyy-MM-dd
                if (source.length() == 10) {
                    df = new SimpleDateFormat("yyyy-MM-dd");
                } else if (source.length() == 19) {
                    // yyyy-MM-dd HH:mm:ss
                    df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                } else {
                    throw new RuntimeException("Illegal String for parsing to date!");
                }
                try {
                    Date date = df.parse(source);
                    return date;
                } catch (ParseException e) {
                    e.printStackTrace();
                }
                return null;
            }
        });
    }


    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {

        FastJsonHttpMessageConverter converter = new FastJsonHttpMessageConverter();
        FastJsonConfig fastJsonConfig = new FastJsonConfig();
        // 日期
        fastJsonConfig.setDateFormat("yyyy-MM-dd HH:mm:ss");
        // 编码
        fastJsonConfig.setCharset(Charset.forName("UTF-8"));
        converter.setFastJsonConfig(fastJsonConfig);
        converters.add(converter);
    }

}
