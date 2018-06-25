package com.oahzuw.utils;

import tk.mybatis.mapper.common.Mapper;
import tk.mybatis.mapper.common.MySqlMapper;

/**
 * @author 武钊
 */
public interface MapperUtils<T> extends Mapper<T>, MySqlMapper<T> {

}
