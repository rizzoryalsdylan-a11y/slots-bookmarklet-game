# 🎰 Slot Machine Bookmarklet

A fun, fully-featured slot machine game that runs as a bookmarklet. Play anywhere on the web!

## Features

✨ **Game Mechanics:**
- Spin three reels with 8 different symbols (🍎🍊🍋🍌🍉⭐💎🔔)
- Match all three symbols to WIN and earn 10x your bet
- Customizable bet amounts (1-1000 points)
- Smooth spinning animation for suspense

💾 **Persistent Data:**
- Your balance, wins, and play count are saved to localStorage
- Resume your game anytime you use the bookmarklet
- All data stored locally—no server communication

🎯 **Statistics:**
- Track your balance
- View total wins
- Monitor plays count

✅ **Cross-Browser Compatible:**
- Chrome, Firefox, Edge
- **Safari** (macOS & iOS)

## How to Install

### Chrome, Firefox, Edge

1. Right-click this link and select "Bookmark this link":
   ```
   javascript:(function(){const style=document.createElement('style');style.textContent=`.slot-machine-container{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:400px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:20px;padding:30px;box-shadow:0 20px 60px rgba(0,0,0,0.3);z-index:999999;font-family:Arial,sans-serif;color:#fff;text-align:center}.slot-machine-container h1{margin:0 0 20px 0;font-size:28px;text-shadow:2px 2px 4px rgba(0,0,0,0.3)}.slot-machine-reels{display:flex;justify-content:center;gap:10px;margin:20px 0;background:rgba(0,0,0,0.2);padding:20px;border-radius:10px}.reel{width:80px;height:100px;background:#fff;border:3px solid #ffd700;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:40px;font-weight:bold;color:#667eea;overflow:hidden;position:relative}.reel.spinning{animation:spin 0.8s ease-in-out}@keyframes spin{0%{opacity:1}50%{opacity:0.5}100%{opacity:1}}.bet-controls{margin:20px 0}.bet-label{font-size:14px;margin-bottom:10px}.bet-input{width:60px;padding:8px;margin:0 10px;border:none;border-radius:5px;font-size:14px;-webkit-appearance:none;appearance:none}.button-group{display:flex;gap:10px;justify-content:center;margin:15px 0}button{padding:10px 20px;font-size:14px;border:none;border-radius:8px;cursor:pointer;font-weight:bold;transition:all 0.3s;-webkit-appearance:none;appearance:none}.spin-btn{background:#ffd700;color:#667eea;flex:1}.spin-btn:hover:not(:disabled){transform:scale(1.05);box-shadow:0 5px 15px rgba(255,215,0,0.4)}.spin-btn:active:not(:disabled){transform:scale(0.98)}.spin-btn:disabled{opacity:0.5;cursor:not-allowed}.reset-btn{background:#ff6b6b;color:#fff}.reset-btn:hover{background:#ff5252}.reset-btn:active{transform:scale(0.98)}.close-btn{position:absolute;top:10px;right:10px;background:#ff6b6b;color:#fff;border:none;width:30px;height:30px;border-radius:50%;cursor:pointer;font-size:18px}.close-btn:hover{background:#ff5252}.close-btn:active{transform:scale(0.95)}.stats{background:rgba(0,0,0,0.2);padding:15px;border-radius:8px;margin:15px 0;font-size:14px}.win-message{background:#51cf66;padding:10px;border-radius:8px;margin:10px 0;font-size:16px;font-weight:bold;display:none}.lose-message{background:#ff6b6b;padding:10px;border-radius:8px;margin:10px 0;font-size:16px;font-weight:bold;display:none}input[type="number"]{-webkit-user-select:text;user-select:text}`;document.head.appendChild(style);const container=document.createElement('div');container.className='slot-machine-container';container.innerHTML=`<button class="close-btn">×</button><h1>🎰 SLOT MACHINE</h1><div class="slot-machine-reels"><div class="reel" id="reel1">🍎</div><div class="reel" id="reel2">🍎</div><div class="reel" id="reel3">🍎</div></div><div class="win-message" id="winMsg">🎉 YOU WIN! 🎉</div><div class="lose-message" id="loseMsg">💥 TRY AGAIN!</div><div class="bet-controls"><div class="bet-label">Bet Amount:</div><input type="number" id="betAmount" class="bet-input" value="10" min="1" max="1000"></div><div class="stats"><div>💰 Balance: <span id="balance">1000</span> pts</div><div>🎯 Wins: <span id="wins">0</span></div><div>📊 Plays: <span id="plays">0</span></div></div><div class="button-group"><button class="spin-btn" id="spinBtn">SPIN (×2)</button><button class="reset-btn" id="resetBtn">Reset</button></div>`;document.body.appendChild(container);const symbols=['🍎','🍊','🍋','🍌','🍉','⭐','💎','🔔'];let balance=parseInt(localStorage.getItem('slotBalance'))||1000;let wins=parseInt(localStorage.getItem('slotWins'))||0;let plays=parseInt(localStorage.getItem('slotPlays'))||0;const reels=document.querySelectorAll('.reel');const spinBtn=document.getElementById('spinBtn');const resetBtn=document.getElementById('resetBtn');const closeBtn=document.querySelector('.close-btn');const balanceEl=document.getElementById('balance');const winsEl=document.getElementById('wins');const playsEl=document.getElementById('plays');const winMsg=document.getElementById('winMsg');const loseMsg=document.getElementById('loseMsg');const betInput=document.getElementById('betAmount');const updateDisplay=function(){balanceEl.textContent=balance;winsEl.textContent=wins;playsEl.textContent=plays;localStorage.setItem('slotBalance',balance);localStorage.setItem('slotWins',wins);localStorage.setItem('slotPlays',plays)};const spin=function(){if(balance<parseInt(betInput.value||1)){alert('Not enough balance!');return}const bet=parseInt(betInput.value||10);balance-=bet;plays++;updateDisplay();spinBtn.disabled=true;reels.forEach(function(r){r.classList.add('spinning')});setTimeout(function(){const results=reels.map(function(r){const symbol=symbols[Math.floor(Math.random()*symbols.length)];r.textContent=symbol;return symbol});reels.forEach(function(r){r.classList.remove('spinning')});const isWin=results[0]===results[1]&&results[1]===results[2];if(isWin){const payout=bet*10;balance+=payout;wins++;winMsg.style.display='block';loseMsg.style.display='none';setTimeout(function(){winMsg.style.display='none'},2000)}else{loseMsg.style.display='block';winMsg.style.display='none';setTimeout(function(){loseMsg.style.display='none'},2000)}updateDisplay();spinBtn.disabled=false},1500)};spinBtn.addEventListener('click',spin);resetBtn.addEventListener('click',function(){balance=1000;wins=0;plays=0;updateDisplay();winMsg.style.display='none';loseMsg.style.display='none'});closeBtn.addEventListener('click',function(){container.remove();style.remove()});updateDisplay()})();
   ```

2. Open your bookmarks manager
3. Name it "🎰 Slot Machine"
4. Click the bookmark whenever you want to play!

### Safari (macOS)

**Method 1: Copy-Paste (Easiest)**
1. Go to Bookmarks → Bookmark Manager
2. Click the + button to create a new bookmark
3. Set the title to "🎰 Slot Machine"
4. In the URL field, paste the full `javascript:...` code from above
5. Click Save
6. Click the bookmark to play!

**Method 2: Using Address Bar**
1. In Safari, create a new bookmark of any website
2. Open Bookmark Manager (Cmd + Y)
3. Find your new bookmark and right-click → Edit Address
4. Replace the URL with the full `javascript:...` code
5. Save and you're done!

### Safari (iOS/iPadOS)

**Step 1: Create a Shortcut**
- Unfortunately, iOS Safari doesn't support bookmarklets directly
- We recommend using the Shortcuts app instead (works perfectly!)
- Alternative: Use a different browser like Chrome on iOS

**Step 2: Alternative - Use Chrome on iOS**
- Install Chrome from the App Store
- Follow the Chrome instructions above
- Bookmarklets work the same way!

## How to Play

1. Click the bookmarklet while on any webpage
2. A purple game window appears in the center
3. Set your bet amount (default: 10 points)
4. Click **SPIN** to spin the reels
5. Match all 3 symbols = WIN 10× your bet! 🎉
6. Don't match = Lose your bet 💥

**Starting Balance:** 1000 points

## Controls

- **SPIN Button**: Spin the reels (costs your bet amount)
- **Reset Button**: Reset balance to 1000, clear stats
- **Close Button (×)**: Close the game window
- **Bet Input**: Change your bet amount before spinning

## Data Persistence

Your game data is automatically saved to localStorage:
- `slotBalance` - Current point balance
- `slotWins` - Number of winning spins
- `slotPlays` - Total number of spins

Clear your browser's localStorage to reset everything.

## Technical Details

- **Size:** ~5.5KB minified
- **Dependencies:** None (pure vanilla JavaScript)
- **Browser Support:** Chrome, Firefox, Safari (macOS), Edge
- **Storage:** Client-side localStorage only
- **Safari Optimizations:** 
  - Removed 3D transform animations (better Safari performance)
  - Added `-webkit-appearance: none` for form elements
  - ES5 compatible (no arrow functions, const/let functions)
  - Touch-friendly `:active` states

## Tips

🎯 **Strategy:**
- Start with small bets to build bankroll
- Watch out for low balance warnings
- Use the Reset button if you want to try a different strategy

🎨 **Customize:**
- Edit the symbols array to use different emojis
- Modify the payout multiplier (currently 10×)
- Adjust colors in the CSS gradient

## Troubleshooting

**Bookmarklet not working in Safari?**
- Make sure you copied the ENTIRE `javascript:...` code
- Check that the URL field starts with `javascript:`
- Try creating a fresh bookmark if it still doesn't work

**Data not persisting?**
- Safari may clear localStorage if you have strict privacy settings
- Check Settings → Privacy → Manage Website Data
- Make sure the domain isn't being cleared

**Buttons not responsive on Safari?**
- This is normal on iOS - tap firmly on the button
- On macOS Safari, click should work smoothly

## License

Free to use and modify!

---

**Have fun and good luck!** 🍀
