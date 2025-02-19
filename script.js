// Giriş ekranı 3 saniye sonra kaybolacak ve ana içerik görünecek
setTimeout(() => {
    document.getElementById('intro-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'flex';
}, 3000);

// Kullanıcı ismini girdikten sonra sohbeti başlatacak
function startChat() {
    const username = document.getElementById('username').value;

    if (username.trim() !== '') {
        localStorage.setItem('username', username);
        // İsim girildikten sonra kanallar ve sidebar görünsün
        document.getElementById('name-input').style.display = 'none';
        loadChannels();  // Kanalları yükler
    } else {
        alert("Lütfen isminizi girin.");
    }
}

// Kanalları yükleme
function loadChannels() {
    const username = localStorage.getItem('username');
    
    document.getElementById('sidebar').style.display = 'block';  // Sidebar'ı göster
    showChannel('main-menu'); // İlk kanal olarak ana menüyü aç
}

// Kanal içeriklerini gösterecek
function showChannel(channel) {
    // İlk önce tüm kanalları gizle
    const channels = document.querySelectorAll('.channel');
    channels.forEach(ch => ch.style.display = 'none');
    
    // Seçilen kanalı göster
    const activeChannel = document.getElementById(channel);
    if (activeChannel) {
        activeChannel.style.display = 'block';
    }
    
    // Kanal içeriği
    const content = document.getElementById('channel-content');
    content.innerHTML = `
        <div class="channel" id="main-menu">
            <h2>Programmer By: BLODWHITE</h2>
            <p>Hoş geldin, ${localStorage.getItem('username')}</p>
        </div>
        <div class="channel" id="chat-channel">
            <h2>Chat Kanalı</h2>
            <div class="chat-box">
                <div id="chat"></div>
                <input type="text" placeholder="Mesaj yazın..." id="message-input">
                <button onclick="sendMessage()">Gönder</button>
            </div>
        </div>
        <div class="channel" id="anonymous-channel">
            <h2>Anonim Kanal</h2>
            <p>Burada anonim olarak sohbet edebilirsiniz. İsminiz görünmeyecek.</p>
        </div>
    `;
}

// Mesaj gönderme fonksiyonu
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (message) {
        const chatBox = document.getElementById('chat');
        const username = localStorage.getItem('username');
        chatBox.innerHTML += <p><strong>${username}:</strong> ${message}</p>;
        messageInput.value = ''; // Mesaj kutusunu temizle
    }
}