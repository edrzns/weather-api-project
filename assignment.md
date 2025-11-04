Script that:
1. Calls OpenWeatherMap API for your city
2. Calls WeatherAPI.com for your city  
3. Uses Promise.all() to fetch both simultaneously
4. Logs which responded first
5. Handles if one API fails (try with invalid API key)
6. Displays the temperature from both