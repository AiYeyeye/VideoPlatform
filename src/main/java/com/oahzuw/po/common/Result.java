package com.oahzuw.po.common;

import java.io.Serializable;

/**
 * @author 武钊 (oahzuw@gmail.com)
 * @date 2018/6/26 10:15
 */
public class Result implements Serializable {
    /**
     * 是否成功
     */
    private boolean success;
    /**
     * 响应的提示信息
     */
    private String msg;
    /**
     * 响应的数据
     */
    private Object data;

    public Result(boolean success, String msg, Object data) {
        this.success = success;
        this.msg = msg;
        this.data = data;
    }

    public Result(boolean success) {
        this.success = success;
    }

    public Result(boolean success, String msg) {
        super();
        this.success = success;
        this.msg = msg;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
