import axios from 'axios';

const weather_api = process.env.WEATHER_API;
export default async (req, res) => {
    try {
        let city = req.query.city;
        const weather = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${weather_api}&q=${city}&day=10`);
        const data = weather.data;
        return res.status(200).json({ message: "sent successfully",weatherData:data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "there was an error fetching weather data" })
    }
};