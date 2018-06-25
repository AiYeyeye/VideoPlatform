package com.oahzuw.config;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import javax.sql.DataSource;

/**
 * 通用配置
 *
 * @author 武钊
 */
@Configuration
@ComponentScan(basePackages = {"com.oahzuw.service", "com.oahzuw.controller"})
@PropertySource("classpath:config.properties")
@EnableTransactionManagement
public class CommonConfiguration {

    private static Logger logger = Logger.getLogger(CommonConfiguration.class);

    @Autowired
    private Environment env;

    /**
     * 数据源
     *
     * @return
     */
    @Bean
    public DataSource dataSource() {

        logger.debug("初始化数据源......");

        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(env.getProperty("mysql.driver"));
        dataSource.setUrl(env.getProperty("mysql.url"));
        dataSource.setUsername(env.getProperty("mysql.username"));
        dataSource.setPassword(env.getProperty("mysql.password"));

        logger.debug("数据源初始化完成.");

        return dataSource;
    }

    /**
     * 数据源事务管理器
     *
     * @param dataSource
     * @return
     */
    @Bean
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {

        logger.debug("初始化事务管理器...");

        DataSourceTransactionManager manager = new DataSourceTransactionManager();
        manager.setDataSource(dataSource);

        logger.debug("事务管理器初始化完成.");

        return manager;
    }

    /**
     * 配置multipart解析器
     *
     * @return
     */
    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(2048000);
        return multipartResolver;
    }
}
