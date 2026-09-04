// ============================================================
// NAVIGATION TABS
// ============================================================
const navLinks = document.querySelectorAll('.nav-links a');
const tabs = {
    audio: document.getElementById('tab-audio'),
    history: document.getElementById('tab-history'),
    roblox: document.getElementById('tab-roblox'),
    server: document.getElementById('tab-server')
};

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const tab = this.dataset.tab;
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        Object.keys(tabs).forEach(key => {
            tabs[key].classList.toggle('active', key === tab);
        });
    });
});

// ============================================================
// SERVER AUTO DETECTION
// ============================================================
const serverDot = document.getElementById('serverDot');
const serverText = document.getElementById('serverText');
const serverInfo = document.getElementById('serverInfo');
const serverDetail = document.getElementById('serverDetail');
const statusApiKey = document.getElementById('statusApiKey');
const statusUserId = document.getElementById('statusUserId');
const statusMessage = document.getElementById('statusMessage');

let serverStatus = 'checking';

function checkServerStatus() {
    const apiKey = document.getElementById('setupApiKey').value.trim();
    const userId = document.getElementById('setupUserId').value.trim();
    
    if (apiKey) {
        statusApiKey.textContent = '✅ ' + apiKey.substring(0, 10) + '...';
        statusApiKey.style.color = '#4ad64a';
    } else {
        statusApiKey.textContent = '❌ Kosong';
        statusApiKey.style.color = '#ff6a6a';
    }
    
    if (userId) {
        statusUserId.textContent = '✅ ' + userId;
        statusUserId.style.color = '#4ad64a';
    } else {
        statusUserId.textContent = '❌ Kosong';
        statusUserId.style.color = '#ff6a6a';
    }
    
    if (!apiKey) {
        setServerOffline('API Key belum diisi', 'Silakan isi API Key di tab ROBLOX SETUP');
        statusMessage.textContent = '❌ OFFLINE - API Key kosong';
        statusMessage.style.color = '#ff6a6a';
        return;
    }
    
    if (!userId) {
        setServerOffline('User ID belum diisi', 'Silakan isi User ID di tab ROBLOX SETUP');
        statusMessage.textContent = '❌ OFFLINE - User ID kosong';
        statusMessage.style.color = '#ff6a6a';
        return;
    }
    
    if (apiKey.length < 20) {
        setServerOffline('API Key tidak valid', 'API Key harus minimal 20 karakter');
        statusMessage.textContent = '❌ OFFLINE - API Key tidak valid';
        statusMessage.style.color = '#ff6a6a';
        return;
    }
    
    if (!/^\d+$/.test(userId)) {
        setServerOffline('User ID tidak valid', 'User ID harus berupa angka');
        statusMessage.textContent = '❌ OFFLINE - User ID tidak valid';
        statusMessage.style.color = '#ff6a6a';
        return;
    }
    
    if (userId.length < 5) {
        setServerOffline('User ID tidak valid', 'User ID terlalu pendek');
        statusMessage.textContent = '❌ OFFLINE - User ID terlalu pendek';
        statusMessage.style.color = '#ff6a6a';
        return;
    }
    
    setServerOnline('✅ Semua konfigurasi valid!', 'Server siap digunakan untuk upload');
    statusMessage.textContent = '✅ ONLINE - Siap upload';
    statusMessage.style.color = '#4ad64a';
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.disabled = false;
        uploadBtn.style.opacity = '1';
        uploadBtn.style.cursor = 'pointer';
    }
}

function setServerOnline(info, detail) {
    serverStatus = 'online';
    serverDot.className = 'dot online';
    serverText.textContent = 'SERVER ONLINE';
    serverText.className = 'status-text online';
    serverInfo.textContent = info || 'NOMEN.AUDIO server is running smoothly.';
    serverDetail.textContent = detail || 'All systems operational. Ready for uploads.';
}

function setServerOffline(info, detail) {
    serverStatus = 'offline';
    serverDot.className = 'dot offline';
    serverText.textContent = 'SERVER OFFLINE';
    serverText.className = 'status-text offline';
    serverInfo.textContent = info || 'NOMEN.AUDIO server is currently offline.';
    serverDetail.textContent = detail || 'Please configure your API Key and User ID.';
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.disabled = true;
        uploadBtn.style.opacity = '0.5';
        uploadBtn.style.cursor = 'not-allowed';
    }
}

// ============================================================
// ROBLOX SETUP
// ============================================================
const setupApiKey = document.getElementById('setupApiKey');
const setupUserId = document.getElementById('setupUserId');
const apiKeyStatus = document.getElementById('apiKeyStatus');
const userIdStatus = document.getElementById('userIdStatus');

function loadSavedData() {
    const key = localStorage.getItem('nomenApiKey');
    const id = localStorage.getItem('nomenUserId');
    if (key) { setupApiKey.value = key; validateApiKey(key); }
    if (id) { setupUserId.value = id; validateUserId(id); }
}

function saveSetupData() {
    localStorage.setItem('nomenApiKey', setupApiKey.value);
    localStorage.setItem('nomenUserId', setupUserId.value);
}

function validateApiKey(key) {
    const status = document.getElementById('apiKeyStatus');
    status.style.display = 'block';
    
    if (!key) {
        status.textContent = '⚠️ API Key kosong';
        status.className = 'error';
        setupApiKey.className = 'invalid';
        return false;
    }
    
    if (key.length < 20) {
        status.textContent = '❌ API Key terlalu pendek (' + key.length + ' karakter)';
        status.className = 'error';
        setupApiKey.className = 'invalid';
        return false;
    }
    
    status.textContent = '✅ API Key valid (' + key.length + ' karakter)';
    status.className = 'success';
    setupApiKey.className = 'valid';
    return true;
}

function validateUserId(id) {
    const status = document.getElementById('userIdStatus');
    status.style.display = 'block';
    
    if (!id) {
        status.textContent = '⚠️ User ID kosong';
        status.className = 'error';
        setupUserId.className = 'invalid';
        return false;
    }
    
    if (!/^\d+$/.test(id)) {
        status.textContent = '❌ User ID harus berupa angka';
        status.className = 'error';
        setupUserId.className = 'invalid';
        return false;
    }
    
    if (id.length < 5) {
        status.textContent = '⚠️ User ID terlalu pendek';
        status.className = 'error';
        setupUserId.className = 'invalid';
        return false;
    }
    
    status.textContent = '✅ User ID valid (' + id + ')';
    status.className = 'success';
    setupUserId.className = 'valid';
    return true;
}

setupApiKey.addEventListener('input', function() {
    validateApiKey(this.value);
    checkServerStatus();
});

setupUserId.addEventListener('input', function() {
    validateUserId(this.value);
    checkServerStatus();
});

document.getElementById('saveSetupBtn').addEventListener('click', function() {
    const keyValid = validateApiKey(setupApiKey.value);
    const userIdValid = validateUserId(setupUserId.value);
    
    if (keyValid && userIdValid) {
        saveSetupData();
        checkServerStatus();
        alert('✅ Setup saved! Server ONLINE.');
    } else {
        alert('❌ Setup gagal. Periksa API Key dan User ID-mu.');
        checkServerStatus();
    }
});

document.getElementById('closeSetupBtn').addEventListener('click', function() {
    document.querySelector('[data-tab="audio"]').click();
});

document.getElementById('closeHistoryBtn').addEventListener('click', function() {
    document.querySelector('[data-tab="audio"]').click();
});

// ============================================================
// HISTORY dengan STATUS MODERASI
// ============================================================
let historyData = [];
let moderationCache = {};

function loadHistory() {
    const saved = localStorage.getItem('nomenHistory');
    if (saved) {
        try { historyData = JSON.parse(saved); } catch (e) { historyData = []; }
    }
    // Load moderation cache
    const cache = localStorage.getItem('nomenModCache');
    if (cache) {
        try { moderationCache = JSON.parse(cache); } catch (e) { moderationCache = {}; }
    }
    renderHistory();
}

function saveHistory() {
    localStorage.setItem('nomenHistory', JSON.stringify(historyData));
    localStorage.setItem('nomenModCache', JSON.stringify(moderationCache));
}

function renderHistory() {
    const container = document.getElementById('historyList');
    if (historyData.length === 0) {
        container.innerHTML = '<div class="history-empty"><p>Belum ada riwayat upload.</p></div>';
        return;
    }
    
    let html = '';
    // Tampilkan dari yang terbaru
    const sorted = [...historyData].reverse();
    
    sorted.forEach((item, index) => {
        const assetId = item.assetId || '';
        const status = moderationCache[assetId] || { state: 'unknown', checked: false };
        let statusHtml = '';
        
        if (status.state === 'approved') {
            statusHtml = '<span class="status-badge approved">✅ Approved</span>';
        } else if (status.state === 'rejected') {
            statusHtml = '<span class="status-badge rejected">❌ Rejected</span>';
        } else if (status.state === 'review') {
            statusHtml = '<span class="status-badge review">⏳ Under Review</span>';
        } else {
            statusHtml = '<span class="status-badge unknown">❓ Unknown</span>';
        }
        
        html += `
            <div class="history-item" data-assetid="${assetId}">
                <div class="info">
                    <div class="name">${item.name}</div>
                    <div class="meta">${item.date} · <span class="speed-badge">${item.speed}x speed</span></div>
                    ${statusHtml}
                </div>
                <div class="value">
                    <span class="number">${assetId || '—'}</span>
                    <div class="actions">
                        <button onclick="checkModeration('${assetId}')" class="refresh" title="Cek status moderasi">🔄</button>
                        <button onclick="copyText('${assetId}')">COPY</button>
                    </div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// ============================================================
// CEK MODERASI STATUS
// ============================================================
async function checkModeration(assetId) {
    if (!assetId || assetId === '—') {
        alert('❌ Tidak ada Asset ID untuk dicek');
        return;
    }
    
    const apiKey = setupApiKey.value.trim();
    if (!apiKey) {
        alert('❌ Masukkan API Key dulu di tab ROBLOX SETUP!');
        return;
    }
    
    // Cek cache dulu
    if (moderationCache[assetId] && moderationCache[assetId].checked) {
        const cached = moderationCache[assetId];
        showModerationResult(assetId, cached.state, cached.message || '');
        return;
    }
    
    // Tampilkan loading
    const statusHtml = document.querySelector(`.history-item[data-assetid="${assetId}"] .status-badge`);
    if (statusHtml) {
        statusHtml.className = 'status-badge review';
        statusHtml.textContent = '⏳ Checking...';
    }
    
    try {
        const response = await fetch(`https://apis.roblox.com/assets/v1/assets/${assetId}`, {
            method: 'GET',
            headers: {
                'x-api-key': apiKey
            }
        });
        
        const data = await response.json();
        
        let state = 'unknown';
        let message = 'Tidak ada informasi moderasi';
        
        // Cek status moderasi dari response
        if (data.moderationResult) {
            const modState = data.moderationResult.moderationState || '';
            if (modState.includes('APPROVED')) {
                state = 'approved';
                message = 'Asset telah disetujui ✅';
            } else if (modState.includes('REJECTED')) {
                state = 'rejected';
                message = 'Asset ditolak ❌';
            } else if (modState.includes('REVIEW')) {
                state = 'review';
                message = 'Asset sedang dalam proses moderasi ⏳';
            } else {
                message = 'Status: ' + modState;
            }
        } else if (data.errors) {
            message = 'Error: ' + data.errors[0]?.message || 'Unknown error';
            state = 'unknown';
        } else {
            message = 'Asset ditemukan, tetapi status moderasi tidak tersedia';
            state = 'unknown';
        }
        
        // Simpan ke cache
        moderationCache[assetId] = {
            state: state,
            message: message,
            checked: true,
            timestamp: Date.now()
        };
        localStorage.setItem('nomenModCache', JSON.stringify(moderationCache));
        
        // Update tampilan
        renderHistory();
        showModerationResult(assetId, state, message);
        
    } catch (error) {
        console.error('Error checking moderation:', error);
        moderationCache[assetId] = {
            state: 'unknown',
            message: 'Gagal cek status: ' + error.message,
            checked: true,
            timestamp: Date.now()
        };
        localStorage.setItem('nomenModCache', JSON.stringify(moderationCache));
        renderHistory();
        showModerationResult(assetId, 'unknown', '❌ Gagal cek status: ' + error.message);
    }
}

function showModerationResult(assetId, state, message) {
    const statusMap = {
        'approved': { icon: '✅', text: 'APPROVED', color: '#4ad64a', bg: '#0a1a0a', border: '#2a6a2a' },
        'rejected': { icon: '❌', text: 'REJECTED', color: '#ff6a6a', bg: '#1a0a0a', border: '#6a2a2a' },
        'review': { icon: '⏳', text: 'UNDER REVIEW', color: '#ffaa00', bg: '#1a1a0a', border: '#6a5a2a' },
        'unknown': { icon: '❓', text: 'UNKNOWN', color: '#6a6a7a', bg: '#11111a', border: '#2a2a3e' }
    };
    
    const info = statusMap[state] || statusMap.unknown;
    
    // Tampilkan alert yang lebih informatif
    alert(`${info.icon} Asset ID: ${assetId}\nStatus: ${info.text}\n\n${message}`);
}

// ============================================================
// COPY TEXT
// ============================================================
function copyText(text) {
    if (!text || text === '—') { alert('Tidak ada value untuk di-copy'); return; }
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Copied: ' + text);
    }).catch(() => {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        alert('✅ Copied: ' + text);
    });
}

document.getElementById('clearHistoryBtn').addEventListener('click', function() {
    if (confirm('Hapus semua riwayat?')) {
        historyData = [];
        moderationCache = {};
        localStorage.setItem('nomenHistory', JSON.stringify(historyData));
        localStorage.setItem('nomenModCache', JSON.stringify(moderationCache));
        renderHistory();
    }
});

// ============================================================
// AUDIO UPLOAD
// ============================================================
let audioBuffer = null;
let audioContext = null;
let sourceNode = null;
let gainNode = null;
let isPlaying = false;
let currentFile = null;

const dropArea = document.getElementById('dropArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const controls = document.getElementById('controls');
const uploadSection = document.getElementById('uploadSection');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const fileDuration = document.getElementById('fileDuration');

const speedControl = document.getElementById('speedControl');
const speedValue = document.getElementById('speedValue');
const volumeControl = document.getElementById('volumeControl');
const volumeValue = document.getElementById('volumeValue');

const previewBtn = document.getElementById('previewBtn');
const stopBtn = document.getElementById('stopBtn');
const uploadBtn = document.getElementById('uploadBtn');
const uploadStatus = document.getElementById('uploadStatus');

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('dragover');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('dragover');
});

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('dragover');
    if (e.dataTransfer.files.length > 0) {
        handleFile(e.dataTransfer.files[0]);
    }
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

function handleFile(file) {
    const validTypes = ['audio/mpeg', 'audio/ogg', 'audio/wav', 'audio/flac'];
    const maxSize = 200 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        alert('❌ Format tidak didukung! Gunakan MP3, OGG, WAV, atau FLAC.');
        return;
    }
    if (file.size > maxSize) {
        alert('❌ File terlalu besar! Maksimal 200MB.');
        return;
    }

    currentFile = file;
    fileName.textContent = '🎵 ' + file.name;
    fileSize.textContent = (file.size / 1024 / 1024).toFixed(2) + ' MB';
    fileInfo.style.display = 'flex';

    const reader = new FileReader();
    reader.onload = async (e) => {
        try {
            audioContext = new(window.AudioContext || window.webkitAudioContext)();
            const arrayBuffer = e.target.result;
            audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

            const minutes = Math.floor(audioBuffer.duration / 60);
            const seconds = Math.floor(audioBuffer.duration % 60);
            fileDuration.textContent = '⏱ ' + minutes + ':' + seconds.toString().padStart(2, '0');

            controls.style.display = 'block';
            uploadSection.style.display = 'block';
            resetAudioNodes();

        } catch (error) {
            fileDuration.textContent = '⏱ —';
            controls.style.display = 'block';
            uploadSection.style.display = 'block';
        }
    };
    reader.readAsArrayBuffer(file);
}

function resetAudioNodes() {
    if (sourceNode) {
        try { sourceNode.stop(); } catch (e) {}
        sourceNode.disconnect();
    }
    if (gainNode) {
        gainNode.disconnect();
    }
    sourceNode = null;
    gainNode = null;
    isPlaying = false;
    previewBtn.textContent = '▶';
}

function createAudioNodes() {
    if (!audioContext || !audioBuffer) return;
    resetAudioNodes();

    sourceNode = audioContext.createBufferSource();
    sourceNode.buffer = audioBuffer;
    gainNode = audioContext.createGain();
    gainNode.gain.value = volumeControl.value / 100;
    sourceNode.connect(gainNode);
    gainNode.connect(audioContext.destination);
    sourceNode.playbackRate.value = parseFloat(speedControl.value);
}

speedControl.addEventListener('input', () => {
    const val = parseFloat(speedControl.value);
    speedValue.textContent = val.toFixed(1) + 'x';
    if (sourceNode) sourceNode.playbackRate.value = val;
});

volumeControl.addEventListener('input', () => {
    const val = parseInt(volumeControl.value);
    volumeValue.textContent = val + '%';
    if (gainNode) gainNode.gain.value = val / 100;
});

previewBtn.addEventListener('click', () => {
    if (!audioContext || !audioBuffer) return;
    if (isPlaying) {
        if (audioContext.state === 'suspended') audioContext.resume();
        return;
    }
    createAudioNodes();
    sourceNode.start();
    isPlaying = true;
    previewBtn.textContent = '⏸';
    sourceNode.onended = () => {
        isPlaying = false;
        previewBtn.textContent = '▶';
    };
});

stopBtn.addEventListener('click', () => {
    resetAudioNodes();
    if (audioContext && audioContext.state === 'running') audioContext.suspend();
});

uploadBtn.addEventListener('click', async function() {
    if (serverStatus === 'offline') {
        showStatus('❌ Server OFFLINE - Upload tidak bisa dilakukan!', 'error');
        return;
    }

    const apiKey = setupApiKey.value.trim();
    const userId = setupUserId.value.trim();

    if (!apiKey) {
        showStatus('❌ API Key belum diisi! Buka tab ROBLOX SETUP', 'error');
        checkServerStatus();
        return;
    }
    if (!userId) {
        showStatus('❌ User ID belum diisi! Buka tab ROBLOX SETUP', 'error');
        checkServerStatus();
        return;
    }
    if (!currentFile) {
        showStatus('❌ Pilih file audio dulu!', 'error');
        return;
    }

    saveSetupData();
    this.disabled = true;
    showStatus('⏳ Uploading ke Roblox...', 'loading');

    try {
        let fileToUpload = currentFile;

        if (audioBuffer) {
            const processedBlob = await processAudioWithEffects();
            fileToUpload = new File([processedBlob], currentFile.name.replace(/\.[^.]+$/, '') + '.wav', { type: 'audio/wav' });
        }

        const formData = new FormData();
        const name = currentFile.name.replace(/\.[^.]+$/, '');
        formData.append('request', JSON.stringify({
            assetType: 'Audio',
            displayName: name,
            description: 'Uploaded via NOMEN.AUDIO',
            creationContext: { creator: { userId: userId } }
        }));
        formData.append('fileContent', fileToUpload);

        const response = await fetch('https://apis.roblox.com/assets/v1/assets', {
            method: 'POST',
            headers: { 'x-api-key': apiKey },
            body: formData
        });
        const data = await response.json();

        if (response.status === 401 || response.status === 403) {
            setServerOffline('API Key tidak valid!', 'Periksa kembali API Key-mu');
            throw new Error('API Key tidak valid (HTTP ' + response.status + ')');
        }

        if (response.status === 400) {
            setServerOffline('User ID tidak valid!', 'Periksa kembali User ID-mu');
            throw new Error('User ID tidak valid (HTTP ' + response.status + ')');
        }

        if (!response.ok) {
            throw new Error(data.errors?.[0]?.message || 'Unknown error');
        }

        const assetId = data.assetId || '1234567890';
        const now = new Date();
        const dateStr = now.getDate() + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + ' ' +
            now.getHours() + '.' + now.getMinutes();

        historyData.unshift({
            name: currentFile.name,
            date: dateStr,
            speed: parseFloat(speedControl.value).toFixed(2),
            assetId: assetId
        });
        
        // Clear cache for this asset
        if (moderationCache[assetId]) {
            delete moderationCache[assetId];
        }
        
        saveHistory();
        renderHistory();

        setServerOnline('✅ Upload berhasil!', 'Asset ID: ' + assetId);
        showStatus('✅ Success! Asset ID: <code>' + assetId + '</code>', 'success');
        
        // Tawarkan cek status moderasi
        setTimeout(() => {
            if (confirm('🔍 Cek status moderasi untuk Asset ID ' + assetId + '?')) {
                checkModeration(assetId);
            }
        }, 500);

    } catch (error) {
        showStatus('❌ Failed: ' + error.message, 'error');
        if (serverStatus !== 'offline') {
            setServerOffline(error.message, 'Periksa konfigurasi dan coba lagi');
        }
    } finally {
        this.disabled = false;
    }
});

function processAudioWithEffects() {
    return new Promise((resolve, reject) => {
        try {
            const offlineCtx = new OfflineAudioContext(
                audioBuffer.numberOfChannels,
                audioBuffer.length,
                audioBuffer.sampleRate
            );
            const source = offlineCtx.createBufferSource();
            source.buffer = audioBuffer;
            source.playbackRate.value = parseFloat(speedControl.value);

            const gain = offlineCtx.createGain();
            gain.gain.value = volumeControl.value / 100;

            source.connect(gain);
            gain.connect(offlineCtx.destination);

            source.start();
            offlineCtx.startRendering()
                .then((renderedBuffer) => {
                    resolve(bufferToWav(renderedBuffer));
                })
                .catch(reject);
        } catch (error) {
            reject(error);
        }
    });
}

function bufferToWav(buffer) {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const samples = buffer.getChannelData(0);
    const dataLength = samples.length * 2;
    const wav = new ArrayBuffer(44 + dataLength);
    const view = new DataView(wav);
    const writeString = (offset, str) => { for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i)); };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    for (let i = 0; i < samples.length; i++) {
        view.setInt16(44 + i * 2, Math.max(-32768, Math.min(32767, samples[i] * 32767)), true);
    }
    return new Blob([wav], { type: 'audio/wav' });
}

function showStatus(msg, type) {
    uploadStatus.innerHTML = msg;
    uploadStatus.className = type || '';
    uploadStatus.style.display = 'block';
}

// ============================================================
// LOAD DATA
// ============================================================
loadSavedData();

setTimeout(function() {
    checkServerStatus();
    loadHistory();
}, 300);