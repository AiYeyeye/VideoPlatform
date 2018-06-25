package com.oahzuw.service;

import java.io.Serializable;
import java.util.List;

/**
 * 通用接口
 *
 * @author 武钊
 */
public interface BaseService<T> {

    T selectByPrimaryKey(Serializable key);

    /**
     * PostgrsSQL仅主键有值时使用
     *
     * @param entity
     * @return
     */
    int insert(T entity);

    /**
     * PostgrsSQL仅主键有值时使用
     *
     * @param entity
     * @return
     */
    int insertSelective(T entity);

    int deleteByPrimaryKey(Serializable key);

    int updateByPrimaryKey(T entity);

    int updateByPrimaryKeySelective(T entity);

    List<T> selectByExample(Object example);

    int selectCountByExample(Object example);

    List<T> selectAll();
}
