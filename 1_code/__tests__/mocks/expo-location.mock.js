jest.mock('expo-location', () => {
    return {
        getCurrentPositionAsync: async function(loc) {
            return {
                coords: {
                    latitude: 40.828237,
                    longitude: -74.596885
                }
            };
        }
    }
});