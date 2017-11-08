package lyf.test.entity;

import java.util.Date;

public class traffic_negotiate_point {
    private Integer id;

    private String uuid;

    private Date builttime;

    private String name;

    private String address;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid == null ? null : uuid.trim();
    }

    public Date getBuilttime() {
        return builttime;
    }

    public void setBuilttime(Date builttime) {
        this.builttime = builttime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address == null ? null : address.trim();
    }
}