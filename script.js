let alarmTimeout;
const alarmSound = new Audio('alarm.mp3');

function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const seconds = now.getSeconds().toString().padStart(2, '0');
  const clock = document.querySelector('.clock');
  clock.querySelector('.hours').textContent = hours;
  clock.querySelector('.minutes').textContent = minutes;
  clock.querySelector('.seconds').textContent = seconds;
  
  const alarmTime = document.getElementById('alarmTime').value;
  if (alarmTime) {
    const [alarmHours, alarmMinutes] = alarmTime.split(':');
    const alarm = new Date();
    alarm.setHours(alarmHours);
    alarm.setMinutes(alarmMinutes);
    alarm.setSeconds(0);
    if (now >= alarm) {
      alarmSound.play();
      document.getElementById('alarmTime').value = '';
    }
    else {
      const timeUntilAlarm = (alarm - now) / 1000;
      const timeUntilAlarmInMinutes = Math.floor(timeUntilAlarm / 60);
      const timeUntilAlarmInSeconds = Math.floor(timeUntilAlarm % 60);
      const timeUntilAlarmString = timeUntilAlarmInMinutes.toString().padStart(2, '0') + ':' + timeUntilAlarmInSeconds.toString().padStart(2, '0');
      document.getElementById('timeUntilAlarm').textContent = timeUntilAlarmString;
      if (!alarmTimeout) {
        alarmTimeout = setTimeout(() => {
          alarmSound.play();
          document.getElementById('alarmTime').value = '';
          document.getElementById('timeUntilAlarm').textContent = '';
          alarmTimeout = null;
        }, timeUntilAlarm * 1000);
      }
    }
  }
}

function clearAlarm() {
  clearTimeout(alarmTimeout);
  alarmTimeout = null;
  document.getElementById('alarmTime').value = '';
  document.getElementById('timeUntilAlarm').textContent = '';
}

document.getElementById('setAlarm').addEventListener('click', updateTime);
document.getElementById('clearAlarm').addEventListener('click', clearAlarm);

setInterval(updateTime, 1000);
