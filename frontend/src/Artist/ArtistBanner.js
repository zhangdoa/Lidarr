import PropTypes from 'prop-types';
import React from 'react';
import ArtistImage from './ArtistImage';

const bannerPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAAC5AgMAAADG9/24AAAADFBMVEUyMjI7Ozs1NTU4ODjgOsZvAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QkRBgAc5PUQ8QAAB7tJREFUeNrtnb1rHEsMwMdjArtrUrpf3uMg2cOl+5QpXWRvjQkXlyHVK8MVYXFl3F+/GAzrNfdSuXkQnH9ie/Oqw32aFM6bkTQfd85rHrwi0qjJJql+pxlJo9FISv0XqX8mKkmSJEmSJEmSJEmSJEmSJEmS5NeVYrh7HDqJ5DeY23kQB64/u7zW91amzgXqvRqjfGYvarnfxqncuaQlf72Zxv4gSOluudOfjRy1Hzh1L+nPj+KU3jh0MWr3Sp87dDFq98An/msmg3zPW/aFR6/vRaBPglML6Mci0H0g92MYfrjvRgJ5TrDvhuFyGIZv9NdTOev93dDry1Z59mM56/2hU8WZcefFjZgVT/Z90SlEV9VKio3HeKYZLLSGII6WPP+oBv3ZwkL3iE4JG/ZRjUYb16mAripUO/c4Hl3bd/juCF19FuHeJn6nK90VBh0s3SjBvcFW/wTrvfBa118EbHY8qmMOtmgdupoKOLTvAmOH1k059LKAX+Qra/TncExH4hcBXV3Zf/+Dv5Vb43cfod/wt3PLsN5VF6HDiudt56IbB23Ql5/oZ8A7CfZWbgF61sap62XdlOZTZ2rF3c7ltNW1+f7LuDez/uc6uDfO8dwkbPXcKF8vPS9sds527pC2utH0uCb0Jmz2t8wNvN3q2jj4ntDJna94m3g4sb7HH8Gue0RH4Je8z61g4GGr79Wz1qHjbi94m/jcH1IOccsj+lt/sOFr4m0EPz+3XyNueURvSmfn+Ebx1rctMvOxU8foqOwVa+9mfdvHDH+DdYQOxAesvZslvc/wo4vQZy6eY+vdrCVrut/AyTW9CWvO3E1ra4L6i5Fxoka7MDan45vTOmx2MPGc0QH52Tb6kTPxXNGtW5/Tnl+oGP2N/dstY8eeO2M+bqM3zvVxRT+gS8Vdl5/z6CaCzfx/c41o3pP2+030UzrAHDNGv8d4FvMVAf1I4c07V/QlnNsyG9TN23ID/ZjObnO+6CZmydS+y8oG9Dfk2Gd80WcW3Rv44e5bZOLtD8EUHbRq0V0F/DAMn8fQ2UUv2UayEMxplaFvM0G7QR/ufqBcmH/gG85Z9BM8rMO5bdiUDu4ceaLvUjqWfJveQm8hpvnKFv1jOLxUTtkoBWf0nIK5Cd6wO207dAznTlmjH+K630KvuKPbOHYffJsOexykx0iWJ7pNRf+ttEXvW1U49F7ZbJ26RHSe6ehn5NRGMPBVQAfP12EQf8QZPTMxXac30M1RxtaWXLBFn3j0eRsHNIBuCycLtqfWCQZrBcZ0W+gVhXts0RtEXyit4zDOoE/N/5yNzNF3oVB0A93I6ise7bijr1XwbYiurySg7xjfpp+g375mjj5D9HYD3fr6YvkKcxU80Q8duvVt2+gjob/ljX7yFH1a80dvDfpia8GXqp3Wr1XJXevljvFt2QZ6a6tJ2Gvd2Pa8Xuu2iNB7o++r+lUJlQas93oOl04be73Ut7y1Ts4tn/0EfaxZOzcKaXIsqNiI4QtE5x7N7Z08RZ9CKpb38cWs9V26b4sDWURnr3W9foq+gpM8a3S4V+rhKUCcqrBXTufMUxU2QWUTkFtZGls3pjgnqJ4FdB1lZAd8/qMEZGRtAlJvJqONb2syzuj2CuK+1YU5reg2CzGNyqq6fpOpku8VRI7lchX+7SIy8NdQSaKn3K8bsWJOlZGBX2Ed0bUIdBXftJpzG1h2vjetWFqgHXrhczTWtx2h8llXVTytI4FHnaes0bGMqNhC1+jUXmFMx7iCaq6qy4HqxR7dFfMUtc34LQCVDPppcM13Kie5RmTGJYNUKBraDL57xEKalS0UzTgXiiqn1X3fRxR0bBf6TLEvD4aKkslTdO5F4fQUIHseo5ugfrShewbWjvsriHxT65WAByAHVCT7u0fvoKDC+rZClZyf/eSAngUTj1pfCXjshU/8smDiPTr7J374sDPDfI1Hd4cX1g874TmvRc+30U8V9+e88Ig7U6V26Ofk21rzg1ScH3Hj033bTXIZab2iGG6PdWOaQzLx7cShQ0FFfdxqlfFu2DAhxw4vf5zWV3hYZ96m47l7u0+DMAgdu1Dxbs4St+Rx6MbAwzIveLfk8Y2Y9J5HP1tij3DmjZii9lujQy9GXO/M22/5pmvUVdWiV3RkYd50zbfaI7Vb9GmDD0C4t9qLGiy+JPTVKT4A4d5gMY866N4i+p9KuUM767aavpkqLnmDDl10S8W/mSq20O3I3n8x6AXufP4tdKlxcpkZ4HN43FZ0mT3GCmicTO2ysW2uVXmFWp/yb5cdN0kHrb/ADwFN0uPW+ICOt+0SWuPjkW2tPTr+CjcSphjiGIzWodPQGwljMGj4Se/Q0bfJGH4Sj7zx6DJG3tCgo4HQoYiukDHoKB5vZdCtb9MrIUM7DyK169Zu+mEUMtQsjLJrtT7vWl2IGWXnBxjaFwFnraQBhmFs5dDqi66SNLYyGlY6XMgaVip4RG00mHh2LWwwcRhHPVsJG0cdhpDProQNIQ+j52e30kbPa19B5T64H9Wfqn0mTelB7Y04pWMFfCQf5JDTjYOTuSClu5QUSa9EyU0gf5BF7iaP2zxdq6TJjUydgxTD3aPvm5wkSZIkSZIkSZIkSZIkSZIk+Z9kv/534U2+Uyf0XwP9H83PZBlAqkdjAAAAAElFTkSuQmCC';

function ArtistBanner(props) {
  return (
    <ArtistImage
      {...props}
      coverType="banner"
      placeholder={bannerPlaceholder}
    />
  );
}

ArtistBanner.propTypes = {
  ...ArtistImage.propTypes,
  coverType: PropTypes.string,
  placeholder: PropTypes.string,
  overflow: PropTypes.bool,
  size: PropTypes.number.isRequired
};

ArtistBanner.defaultProps = {
  size: 70
};

export default ArtistBanner;
