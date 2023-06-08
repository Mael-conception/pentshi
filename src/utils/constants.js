
//URL
// export const WEB_URL = "https://demo.irphoenixtravel.com";
export const WEB_URL = "http://dashboard.safaari-plus.com";
export const BASE_URL = `${WEB_URL}/api`;
export const CINET_API = 'https://api-checkout.cinetpay.com/v2/payment';

//API End Points
export const REGISTER = `${BASE_URL}/register`;
export const LOGIN = `${BASE_URL}/login`;
export const CONFIRM = `${BASE_URL}/confirm`;
export const RESEND_OTP = `${BASE_URL}/resend`;

// trips
export const TRIPS = `${BASE_URL}/trips`;

// agencies
export const AGENCIES = `${BASE_URL}/agencies`;
export const SEARCH = `${BASE_URL}/search`;

export const INIT_RESERVATION = `${BASE_URL}/me/reservations/store`;
export const RESERVATIONS = `${BASE_URL}/me/reservations`;

export const DESTROY_ACCOUNT = `${BASE_URL}/me/delete`;
export const UPDATE_AVATAR = `${BASE_URL}/me/update-avatar`;
export const UPDATE_PASSWORD = `${BASE_URL}/me/update-password`;
export const UPDATE_PROFILE = `${BASE_URL}/me/update`;


export const slides = [
    {
        key: 1,
        title: 'Planifiez votre voyage',
        subtitle: 'Obtenez différentes variétés de voyage de nos partenaires de confiance dans toute la province',
        image: require('../../assets/icon/destination.png'),
    },
    {
        key: 2,
        title: 'Réservez votre voyage',
        subtitle: 'Après avoir planifié votre voyage, réservez votre voyage avec le portfeuille mobile money de votre choix',
        image: require('../../assets/icon/mobile_pay.png'),
    },
    {
        key: 3,
        title: 'Profitez du voyage',
        subtitle: 'Vivez le rêve. profitez pleinement de votre vie. Ne regardez pas le passé.',
        image: require('../../assets/icon/travel_mode.png'),
    }
];