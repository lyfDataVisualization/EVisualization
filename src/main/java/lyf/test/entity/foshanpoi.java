package lyf.test.entity;

public class foshanpoi {
    private Integer id;

    private String poiName;

    private String poiAddress;

    private String poiCategory;

    private Float poiLon;

    private Float poiLat;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPoiName() {
        return poiName;
    }

    public void setPoiName(String poiName) {
        this.poiName = poiName == null ? null : poiName.trim();
    }

    public String getPoiAddress() {
        return poiAddress;
    }

    public void setPoiAddress(String poiAddress) {
        this.poiAddress = poiAddress == null ? null : poiAddress.trim();
    }

    public String getPoiCategory() {
        return poiCategory;
    }

    public void setPoiCategory(String poiCategory) {
        this.poiCategory = poiCategory == null ? null : poiCategory.trim();
    }

    public Float getPoiLon() {
        return poiLon;
    }

    public void setPoiLon(Float poiLon) {
        this.poiLon = poiLon;
    }

    public Float getPoiLat() {
        return poiLat;
    }

    public void setPoiLat(Float poiLat) {
        this.poiLat = poiLat;
    }
}