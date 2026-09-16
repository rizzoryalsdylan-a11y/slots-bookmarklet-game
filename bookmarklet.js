javascript:(function(){const style=document.createElement('style');style.textContent=`
.slot-machine-container{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:20px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,0.3);z-index:999999;font-family:Arial,sans-serif;color:#fff;text-align:center}
.slot-machine-container h1{margin:0 0 20px 0;font-size:28px;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}
.slot-machine-reels{display:flex;justify-content:center;gap:10px;margin:20px 0;background:rgba(0,0,0,0.2);padding:20px;border-radius:10px}
.reel{width:80px;height:100px;background:#fff;border:3px solid #ffd700;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold;color:#667eea;overflow:hidden;position:relative}
.reel.spinning{animation:spin 0.1s linear infinite}
@keyframes spin{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}
.bet-controls{margin:20px 0}
.bet-label{font-size:14px;margin-bottom:10px}
.bet-input{width:60px;padding:8px;margin:0 10px;border:none;border-radius:5px;font-size:14px}
.button-group{display:flex;gap:10px;justify-content:center;margin:15px 0}
button{padding:10px 20px;font-size:14px;border:none;border-radius:8px;cursor:pointer;font-weight:bold;transition:all 0.3s}
.spin-btn{background:#ffd700;color:#667eea;flex:1}
.spin-btn:hover:not(:disabled){transform:scale(1.05);box-shadow:0 5px 15px rgba(255,215,0,0.4)}
.spin-btn:disabled{opacity:0.5;cursor:not-allowed}
.reset-btn{background:#ff6b6b;color:#fff}
.reset-btn:hover{background:#ff5252}
.close-btn{position:absolute;top:10px;right:10px;background:#ff6b6b;color:#fff;border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px}
.close-btn:hover{background:#ff5252}
.stats{background:rgba(0,0,0,0.2);padding:15px;border-radius:8px;margin:15px 0;font-size:14px}
.win-message{background:#51cf66;padding:10px;border-radius:8px;margin:10px 0;font-size:16px;font-weight:bold;display:none}
.lose-message{background:#ff6b6b;padding:10px;border-radius:8px;margin:10px 0;font-size:16px;font-weight:bold;display:none}
`;document.head.appendChild(style);const container=document.createElement('div');container.className='slot-machine-container';container.innerHTML=`
<button class="close-btn">×</button>
<h1>🎰 SLOT MACHINE</h1>
<div class="slot-machine-reels">
  <div class="reel" id="reel1">🍎</div>
  <div class="reel" id="reel2">🍎</div>
  <div class="reel" id="reel3">🍎</div>
</div>
<div class="win-message" id="winMsg">🎉 YOU WIN! 🎉</div>
<div class="lose-message" id="loseMsg">💥 TRY AGAIN!</div>
<div class="bet-controls">
  <div class="bet-label">Bet Amount:</div>
  <input type="number" id="betAmount" class="bet-input" value="10" min="1" max="1000">
</div>
<div class="stats">
  <div>💰 Balance: <span id="balance">1000</span> pts</div>
  <div>🎯 Wins: <span id="wins">0</span></div>
  <div>📊 Plays: <span id="plays">0</span></div>
</div>
<div class="button-group">
  <button class="spin-btn" id="spinBtn">SPIN (×2)</button>
  <button class="reset-btn" id="resetBtn">Reset</button>
</div>
`;document.body.appendChild(container);const symbols=['🍎','🍊','🍋','🍌','🍉','⭐','💎','🔔'];let balance=parseInt(localStorage.getItem('slotBalance'))||1000;let wins=parseInt(localStorage.getItem('slotWins'))||0;let plays=parseInt(localStorage.getItem('slotPlays'))||0;const reels=document.querySelectorAll('.reel');const spinBtn=document.getElementById('spinBtn');const resetBtn=document.getElementById('resetBtn');const closeBtn=document.querySelector('.close-btn');const balanceEl=document.getElementById('balance');const winsEl=document.getElementById('wins');const playsEl=document.getElementById('plays');const winMsg=document.getElementById('winMsg');const loseMsg=document.getElementById('loseMsg');const betInput=document.getElementById('betAmount');const updateDisplay=()=>{balanceEl.textContent=balance;winsEl.textContent=wins;playsEl.textContent=plays;localStorage.setItem('slotBalance',balance);localStorage.setItem('slotWins',wins);localStorage.setItem('slotPlays',plays)};const spin=()=>{if(balance<parseInt(betInput.value||1)){alert('Not enough balance!');return}const bet=parseInt(betInput.value||10);balance-=bet;plays++;updateDisplay();reels.forEach(r=>r.classList.add('spinning'));setTimeout(()=>{const results=reels.map(r=>{const symbol=symbols[Math.floor(Math.random()*symbols.length)];r.textContent=symbol;return symbol});reels.forEach(r=>r.classList.remove('spinning'));const isWin=results[0]===results[1]&&results[1]===results[2];if(isWin){const payout=bet*10;balance+=payout;wins++;winMsg.style.display='block';loseMsg.style.display='none';setTimeout(()=>winMsg.style.display='none',2000)}else{loseMsg.style.display='block';winMsg.style.display='none';setTimeout(()=>loseMsg.style.display='none',2000)}updateDisplay()},1500)};spinBtn.addEventListener('click',spin);resetBtn.addEventListener('click',()=>{balance=1000;wins=0;plays=0;updateDisplay();winMsg.style.display='none';loseMsg.style.display='none'});closeBtn.addEventListener('click',()=>{container.remove();style.remove()})})();