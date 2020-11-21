import browserStorage from './browserStorage';

class Util {
    isUserLogged() {
        const isLogged = browserStorage.getLocalStorage('sc_data');

        return isLogged || false;
    }

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        // eslint-disable-next-line max-len
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c;

        return d;
    }

    getDistanceOfCountries(allCountries, reqCountryData) {
        const { countryOne, countryTwo } = reqCountryData;

        const latLandDataObject = [];

        allCountries.map(async country => {
            const { alpha3Code, latlng } = country;

            if (countryOne === alpha3Code || countryTwo === alpha3Code) {
                latLandDataObject.push(latlng);
            }
        });

        if (latLandDataObject.length !== 2) {
            return '';
        }
        const distance = this.getDistanceFromLatLonInKm(
            latLandDataObject[0][0],
            latLandDataObject[0][1],
            latLandDataObject[1][0],
            latLandDataObject[1][1],
        );

        return distance;
    }

    getClosestCountry(allCountries, countryName) {
        let closestCountry = '';
        let closestDistance = '';
        let countryBorder = '';
        let selectedCountryLatLng = '';

        allCountries.map(async country => {
            const { alpha3Code, borders, latlng } = country;

            if (countryName === alpha3Code) {
                countryBorder = borders;
                selectedCountryLatLng = latlng;
            }
        });

        allCountries.map(async country => {
            const { alpha3Code, latlng, name } = country;
            if (countryBorder && !countryBorder.includes(alpha3Code) && alpha3Code !== countryName) {
                const distance = this.getDistanceFromLatLonInKm(selectedCountryLatLng[0], selectedCountryLatLng[1], latlng[0], latlng[1]);
                if (closestDistance === '' || distance < Number(closestDistance)) {
                    closestDistance = distance;
                    closestCountry = name;
                }
            }
        });
        return closestCountry;
    }

    getTimezoneCountries(allCountries, timezoneData) {
        const { timezoneOne, timezoneTwo } = timezoneData;

        const splittedTimezoneOne = timezoneOne.split(':');
        const splittedTimezoneTwo = timezoneTwo.split(':');
        const floatTimezoneOne = `${splittedTimezoneOne[0]}.${splittedTimezoneOne[1]}`;
        const floatTimezoneTwo = `${splittedTimezoneTwo[0]}.${splittedTimezoneTwo[1]}`;

        const minTimeZone = Math.min(parseFloat(floatTimezoneOne), parseFloat(floatTimezoneTwo));
        const maxTimeZone = Math.max(parseFloat(floatTimezoneOne), parseFloat(floatTimezoneTwo));

        const countriesInZones = [];
        allCountries.map(async country => {
            const { timezones, name } = country;
            timezones.map(async timezone => {
                const checkCountryTimezone = timezone.split('UTC');
                const splittedCheckTimezone = checkCountryTimezone[1].split(':');
                const floatCheckTimezone = parseFloat(`${splittedCheckTimezone[0]}.${splittedCheckTimezone[1]}`);

                if (floatCheckTimezone >= minTimeZone && floatCheckTimezone <= maxTimeZone && !countriesInZones.includes(name)) {
                    countriesInZones.push(`${name} ##`);
                }
            });
        });
        return countriesInZones;
    }

    searchCountries(allCountries, searchTerm) {
        const searchCountries = [];

        allCountries.map(async country => {
            const { name } = country;

            if (name.toLowerCase().includes(searchTerm.toLowerCase())) {
                searchCountries.push(`${name} ##`);
            }
        });
        return searchCountries;
    }
}

export default new Util();
