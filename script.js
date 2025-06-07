document.addEventListener('DOMContentLoaded', () => {
    console.log("Sahifa yuklandi, fetchPrayerTimes chaqirilmoqda...");
    fetchPrayerTimes();
});

function fetchPrayerTimes() {
    const region = document.getElementById('region').value;
    const today = new Date();
    const month = today.getMonth() + 1; // Oylar 0 dan boshlanadi, shuning uchun +1
    const day = today.getDate();
    const url = `https://islomapi.uz/api/daily?region=${region}&month=${month}&day=${day}`;

    console.log("API so'rovi yuborilmoqda:", url);

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP xatosi: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API javobi:", data);
            if (data.times) {
                const times = data.times;
                document.getElementById('bomdod').textContent = times.tong_saharlik || '--:--';
                document.getElementById('quyosh').textContent = times.quyosh || '--:--';
                document.getElementById('peshin').textContent = times.peshin || '--:--';
                document.getElementById('asr').textContent = times.asr || '--:--';
                document.getElementById('shom').textContent = times.shom_iftor || '--:--';
                document.getElementById('xufton').textContent = times.hufton || '--:--';
                document.getElementById('date').textContent = `Sana: ${data.date.split('T')[0]} | Viloyat: ${region}`;
            } else {
                console.error("API javobida xato: times ob'ekti topilmadi", data);
                alert('Ma\'lumot topilmadi. API javobini tekshiring.');
            }
        })
        .catch(error => {
            console.error('Xatolik yuz berdi:', error);
            alert('Ma\'lumot olishda xatolik: ' + error.message);
        });
}