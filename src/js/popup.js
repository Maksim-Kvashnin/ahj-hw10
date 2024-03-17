import validateGEO from './validateGEO.js';

export default class Popup {
  init() {
    this.elPopup = document.createElement('div');
    this.elPopup.className = 'popup hidden';
    this.elPopup.innerHTML = `
    <p class="popup-header"></p>
    <p class="popup-msg"></p>
    <input type"text" class="popup-inp hidden">
    <div class="popup-buttons">
      <div class="popup-cancel button hidden">Отмена</div>
      <div class="popup-ok button">Ok</div>
    </div>
    `;
    document.body.appendChild(this.elPopup);

    this.popupHeader = document.querySelector('.popup-header');
    this.popupMsg = document.querySelector('.popup-msg');
    this.popupInput = document.querySelector('.popup-inp');
    this.btnCancel = document.querySelector('.popup-cancel');
  }

  showPopup(type, header, msg) {
    this.elPopup.classList.remove('hidden');
    this.popupHeader.innerText = header;
    this.popupMsg.innerText = msg;
    if (type === 'get') {
      this.popupInput.classList.remove('hidden');
      this.btnCancel.classList.remove('hidden');
    }
  }

  validate() {
    if (validateGEO(this.popupInput.value)) {
      this.popupInput.style.borderColor = '#000000';
      return true;
    }
    this.popupInput.style.borderColor = '#ff0000';
    return false;
  }
}
