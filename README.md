
# Native Thermostat Plus

A native-style Home Assistant thermostat card that lets you override the current temperature sensor. For Mini Splits that use "Follow me". Choose a Room sensor to display as current temperature instead of sensor in highwall head.   

## Features
- Uses your real climate entity
- Lets you show a custom sensor for current temperature (like a remote room sensor)
- Looks like the built-in thermostat
- No Fahrenheit support 😉

## Installation
1. Add this repo as a [custom repository in HACS](https://hacs.xyz/docs/faq/custom_repositories/)
2. Install `Native Thermostat Plus`
3. Add this to your Lovelace:

```yaml
type: custom:custom-thermostat-card
entity: climate.your_climate_entity
current_temperature_entity: sensor.your_temp_sensor
```

## Build Manually
```bash
npm install
npm run build
```
Place the output in `/config/www` and add a resource in Home Assistant:
```yaml
url: /local/custom-thermostat-card.js
type: module
```

Or use HACS with `filename: custom-thermostat-card.js` at the repo root.