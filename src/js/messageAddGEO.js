/* eslint-disable class-methods-use-this */
import getGEO from './getGEO.js';

const displayLegends = document.querySelector('.display-legends');
const elInput = document.querySelector('#el-input');
let GEOteg = null;
const historyMsg = [];

export default class MsgAddGeo {
  async messageAddGEO(msgObj, popup) {
    this.elPopup = document.querySelector('.popup');
    this.elPopupInput = document.querySelector('.popup-inp');
    this.elPopupCancel = document.querySelector('.popup-cancel');
    if (!GEOteg) {
      try {
        GEOteg = await getGEO(popup);
        console.log('function mGEosss');
        this.addMessage(msgObj, GEOteg);

        this.elPopup.classList.add('hidden');
        this.elPopupInput.classList.add('hidden');
        this.elPopupCancel.classList.add('hidden');
      } catch (e) {
        console.log('error', e);
      }
    } else {
      this.addMessage(msgObj, GEOteg);
    }
  }

  addMessage(msgObj, itemGeo) {
    const itemDate = this.printData(new Date());
    const elItem = document.createElement('div');
    elItem.className = 'item-msg';
    elItem.innerHTML = `
    <div class="l-block">
    ${msgObj}
    <div class="geo-tef">${itemGeo}</div>
    </div>
    <div class="r-block">${itemDate}</div>
    `;
    displayLegends.prepend(elItem);
    elInput.value = '';

    historyMsg.push({ msg: msgObj, geo: itemGeo, data: itemDate });
    localStorage.setItem('legends', JSON.stringify(historyMsg));
  }

  convertDate(value) {
    const rValue = value < 10 ? `0${value}` : value;
    return rValue;
  }

  printData(valueDate) {
    const itemDate = new Date(valueDate);
    const date = this.convertDate(itemDate.getDate());
    const month = this.convertDate(itemDate.getMonth() + 1);
    const year = this.convertDate(itemDate.getFullYear());
    const hours = this.convertDate(itemDate.getHours());
    const minut = this.convertDate(itemDate.getMinutes());
    const itemCreated = `${date}.${month}.${year} ${hours}:${minut}`;
    return itemCreated;
  }

  loadMessage(msg, geo, data) {
    const elItem = document.createElement('div');
    elItem.className = 'item-msg';
    elItem.innerHTML = `
    <div class="l-block">
    ${msg}
    <div class="geo-tef">${geo}</div>
    </div>
    <div class="r-block">${data}</div>
    `;
    displayLegends.prepend(elItem);
    elInput.value = '';

    historyMsg.push({ msg, geo, data });
  }
}
