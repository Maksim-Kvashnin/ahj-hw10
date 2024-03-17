import Popup from './popup.js';
import RecAV from './recAV.js';
import MessageAddGEO from './messageAddGEO.js';

const popup = new Popup();
popup.init();

const recorder = new RecAV(popup);
recorder.init();

const cmessageAddGeo = new MessageAddGEO();
const elPopup = document.querySelector('.popup');
const elPopupInput = document.querySelector('.popup-inp');
const elPopupCancel = document.querySelector('.popup-cancel');
const elPopupOk = document.querySelector('.popup-ok');

// popup cancel
elPopupCancel.addEventListener('click', () => {
  elPopup.classList.add('hidden');
  return false;
});

// popup OK
elPopupOk.addEventListener('click', () => {
  if (elPopupInput.classList.contains('hidden')) {
    elPopup.classList.add('hidden');
  }
});

const elInput = document.querySelector('#el-input');

elInput.addEventListener('keypress', (evt) => {
  if (evt.key === 'Enter') {
    console.log(elInput.value);
    cmessageAddGeo.messageAddGEO(`<p>${elInput.value}</p>`, popup);
  }
});

try {
  const loadStorage = JSON.parse(localStorage.legends);
  for (const item of loadStorage) {
    cmessageAddGeo.loadMessage(item.msg, item.geo, item.data);
  }
} catch (e) {
  console.log('error Localstorage', e);
}
