package com.oahzuw.config;

import com.github.pagehelper.PageInterceptor;
import com.oahzuw.utils.MapperUtils;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import tk.mybatis.spring.mapper.MapperScannerConfigurer;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * @author 武钊
 */
@Configuration
public class MyBatisConfiguration {

    private static Logger logger = Logger.getLogger(MyBatisConfiguration.class);


    /**
     * MyBatis SessionFactory
     *
     * @return
     * @throws Exception
     */
    @Bean
    public SqlSessionFactory sqlSessionFactory(DataSource dataSource) throws Exception {

        logger.debug("初始化SqlSessionFactory...");

        SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
        bean.setDataSource(dataSource);

        // 设置分页插件
        PageInterceptor pageInterceptor = new PageInterceptor();
        Properties props = new Properties();
        props.setProperty("helperDialect", "mysql");
        pageInterceptor.setProperties(props);
        bean.setPlugins(new Interceptor[]{pageInterceptor});

        logger.debug("初始化SqlSessionFactory完成.");

        return bean.getObject();
    }

    /**
     * Mapper扫描器
     *
     * @return
     */
    @Bean
    public MapperScannerConfigurer mapperScannerConfigurer() {

        logger.debug("初始化Mapper扫描器...");

        MapperScannerConfigurer configurer = new MapperScannerConfigurer();
        configurer.setBasePackage("com.oahzuw.mapper");
        configurer.setMarkerInterface(MapperUtils.class);


        logger.debug("Mapper扫描器初始化完成.");

        return configurer;
    }

}
