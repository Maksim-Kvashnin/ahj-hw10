function callPopup(msg, popup) {
  const title = 'Что-то пошло не так';
  popup.showPopup('get', title, msg);
}

export default function getGEO(popup) {
  console.log('getGeo');
  const popupInput = document.querySelector('.popup-inp');
  const popupCancel = document.querySelector('.popup-cancel');
  const popupOk = document.querySelector('.popup-ok');

  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve(`${latitude}, ${longitude}`);
        },
        (error) => {
          const msg = `К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолакации, либо введите координаты вручную. Введите Широту и долготу через запятую.
          Пример: 55.755826, 37.6173`;
          callPopup(msg, popup);
          popupOk.addEventListener('click', () => {
            console.log('GEO ok', error);
            if (popup.validate()) {
              resolve(popupInput.value);
            }
          });
          popupCancel.addEventListener('click', () => {
            reject('cancel'); // eslint-disable-line prefer-promise-reject-errors
          });
        },
      );
    } else {
      const msg = 'Не поддерживает браузер. Введите широту и долготу через запятую';
      callPopup(msg, popup);

      popupOk.addEventListener('click', () => {
        console.log('GEO ok');
        if (popup.validate()) {
          resolve(popupInput.value);
        }
      });
      popupCancel.addEventListener('click', () => {
        reject('cancel'); // eslint-disable-line prefer-promise-reject-errors
      });
    }
  });
}
