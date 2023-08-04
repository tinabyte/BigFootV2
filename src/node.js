class Node {
    constructor(data) {
        // CSV file...
        this.observed = data.observed;
        this.location_details = data.location_details;
        this.county = data.county;
        this.state = data.state;
        this.season = data.season;
        this.title = data.title;
        this.latitude = data.latitude;
        this.longitude = data.longitude;
        this.location = data.location;
        this.date = data.date;
        this.number = data.number;
        this.classification = data.classification;
        this.geohash = data.geohash;
        this.temperature_high = data.temperature_high;
        this.temperature_mid = data.temperature_mid;
        this.temperature_low = data.temperature_low;
        this.dew_point = data.dew_point;
        this.humidity = data.humidity;
        this.cloud_cover = data.cloud_cover;
        this.moon_phase = data.moon_phase;
        this.precip_intensity = data.precip_intensity;
        this.precip_probability = data.precip_probability;
        this.precip_type = data.precip_type;
        this.pressure = data.pressure;
        this.summary = data.summary;
        this.conditions = data.conditions;
        this.uv_index = data.uv_index;
        this.visbility = data.visbility;
        this.wind_bearing = data.wind_bearing;
        this.wind_speed = data.wind_speed;

        this.edges = [];
    }
}

module.exports.Node = Node;
