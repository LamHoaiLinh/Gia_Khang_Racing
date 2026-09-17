// Gia Khang Racing - Huong dan choi bo sung tren menu chinh.
// Tach rieng khoi logic gameplay de khong thay doi physics/AI/race flow.
(() => {
  const GUIDE_ID = 'gkr-how-to-play-overlay';
  const STYLE_ID = 'gkr-how-to-play-style';

  function ensureStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      #${GUIDE_ID}{position:fixed;inset:0;z-index:100000;background:rgba(3,4,8,.96);overflow:auto;padding:28px 18px 50px;color:#e8e8ee;font-family:inherit}
      #${GUIDE_ID} .gkr-guide{width:min(1080px,94vw);margin:0 auto;background:rgba(12,14,22,.98);border-left:4px solid #e10600;box-shadow:0 18px 60px rgba(0,0,0,.5);padding:22px 28px 34px;line-height:1.65;font-size:16px}
      #${GUIDE_ID} .gkr-guide-top{display:flex;align-items:center;justify-content:space-between;gap:20px;border-bottom:1px solid rgba(255,255,255,.12);padding-bottom:14px;margin-bottom:18px}
      #${GUIDE_ID} h1{margin:0;color:#fff;font-size:30px;font-style:italic} #${GUIDE_ID} h1 span{color:#e10600}
      #${GUIDE_ID} h2{margin:24px 0 10px;color:#fff;font-size:23px} #${GUIDE_ID} p{margin:8px 0 14px}
      #${GUIDE_ID} ul{padding-left:24px;margin:8px 0 18px} #${GUIDE_ID} li{margin:9px 0}
      #${GUIDE_ID} .gkr-summary{padding:13px 16px;margin:16px 0 24px;background:rgba(225,6,0,.14);border:1px solid rgba(225,6,0,.55);font-size:18px;font-weight:800;color:#fff}
      #${GUIDE_ID} .gkr-key{display:inline-block;min-width:34px;padding:2px 7px;border:1px solid rgba(255,255,255,.28);border-radius:4px;background:#20232c;color:#fff;text-align:center;font-weight:800;font-size:13px}
      #${GUIDE_ID} .gkr-close{border:1px solid #e10600;background:#e10600;color:#fff;padding:10px 18px;font:800 14px inherit;cursor:pointer;transform:skew(-6deg)}
      #${GUIDE_ID} .gkr-close:hover{filter:brightness(1.12)}
      @media(max-width:700px){#${GUIDE_ID}{padding:12px 6px 34px}#${GUIDE_ID} .gkr-guide{padding:18px 16px 28px;font-size:15px}#${GUIDE_ID} h1{font-size:24px}}
    `;
    document.head.appendChild(style);
  }

  function closeGuide() {
    document.getElementById(GUIDE_ID)?.remove();
  }

  function openGuide() {
    if (document.getElementById(GUIDE_ID)) return;
    ensureStyle();
    const overlay = document.createElement('div');
    overlay.id = GUIDE_ID;
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Hướng dẫn chơi Gia Khang Racing');
    overlay.innerHTML = `
      <div class="gkr-guide">
        <div class="gkr-guide-top"><h1>HƯỚNG DẪN <span>CHƠI</span></h1><button class="gkr-close" type="button">ĐÓNG ×</button></div>
        <h2>PIN ĐIỆN VÀ ERS</h2>
        <p><strong>Xe bạn có một cục pin điện giống như “bình năng lượng”.</strong><br>
        Khi bạn phanh hoặc nhả ga giảm tốc thì xe có thể <strong>nạp điện lại vào pin</strong>.<br>
        Khi bạn tăng tốc, xe có thể <strong>lấy điện từ pin ra để xe mạnh hơn</strong>.</p>
        <p><strong>ERS chính là cách bạn quyết định: lúc này nên ưu tiên “sạc pin” hay “xài pin”.</strong></p>
        <ul>
          <li><strong>ERS THU HỒI</strong> = <strong>chế độ sạc pin</strong>. Xe chạy yếu hơn một chút nhưng pin nạp lại nhanh hơn. Dùng khi pin gần hết hoặc đang ở đoạn mà bạn chưa cần vượt ai. Hiểu như điện thoại bật “tiết kiệm pin”.</li>
          <li><strong>ERS CÂN BẰNG</strong> = <strong>chạy bình thường</strong>. Xe vừa dùng điện vừa thu hồi điện ở mức vừa phải. Bạn nên để chế độ này phần lớn thời gian khi mới chơi.</li>
          <li><strong>ERS TẤN CÔNG</strong> = <strong>xài pin để xe mạnh hơn</strong>. Xe tăng tốc tốt hơn nhưng pin tụt nhanh. Dùng khi bạn muốn vượt xe trước, thoát cua nhanh hoặc không muốn xe sau vượt mình.</li>
          <li><strong>Giữ SPACE</strong> = <strong>Turbo điện</strong>. Đây là mức tăng tốc mạnh hơn nữa. Bạn giữ SPACE thì xe lấy rất nhiều điện trong pin để tăng tốc mạnh trong vài giây. Pin sẽ tụt rất nhanh.</li>
        </ul>
        <div class="gkr-summary">THU HỒI = sạc pin → CÂN BẰNG = chạy thường → TẤN CÔNG = chạy mạnh → SPACE = tăng tốc cực mạnh.</div>
        <h2>CÁC PHÍM CHÍNH BẠN NÊN NHỚ</h2>
        <ul>
          <li><span class="gkr-key">W</span> hoặc <span class="gkr-key">↑</span>: ga; <span class="gkr-key">S</span> hoặc <span class="gkr-key">↓</span>: phanh/lùi; <span class="gkr-key">A/D</span> hoặc <span class="gkr-key">←/→</span>: đánh lái.</li>
          <li><span class="gkr-key">V</span>: đổi ERS Thu hồi → Cân bằng → Tấn công; <span class="gkr-key">SPACE</span>: Turbo điện / tăng tốc điện mạnh.</li>
          <li><span class="gkr-key">Q / E</span>: xuống số / lên số khi bạn chọn <strong>số sàn</strong>; để hộp số tự động thì không cần dùng.</li>
          <li><span class="gkr-key">P</span>: yêu cầu vào pit; khi vào pit sẽ chọn loại lốp.</li>
          <li><span class="gkr-key">C</span>: đổi 4 camera: bám đuôi → cockpit → T-Cam → đầu xe; <span class="gkr-key">B</span>: đổi trang đồng hồ cockpit.</li>
          <li><span class="gkr-key">N</span>: bật/tắt tên tay đua trên xe AI; <span class="gkr-key">M</span>: tắt/bật âm thanh; <span class="gkr-key">J</span>: xuất Ghost Replay; <span class="gkr-key">ESC</span>: tạm dừng.</li>
          <li><span class="gkr-key">Enter</span>: bắt đầu phiên/chặng khi xe đang chờ xuất phát.</li>
        </ul>
        <button class="gkr-close" type="button">← QUAY LẠI MENU CHÍNH</button>
      </div>`;
    overlay.querySelectorAll('.gkr-close').forEach(btn => btn.addEventListener('click', closeGuide));
    overlay.addEventListener('click', e => { if (e.target === overlay) closeGuide(); });
    document.body.appendChild(overlay);
    overlay.querySelector('.gkr-close')?.focus();
  }

  function installButton() {
    const nav = document.querySelector('#screen-main.active .main-nav') || document.querySelector('#screen-main .main-nav');
    if (!nav || nav.querySelector('[data-gkr-guide]')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-item';
    button.dataset.gkrGuide = '1';
    button.innerHTML = '<span><h3>HƯỚNG DẪN CHƠI</h3><p>ERS, tăng tốc điện, các phím chức năng và cách điều khiển</p></span>';
    button.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); openGuide(); });
    const settings = nav.querySelector('[data-a="settings"]');
    nav.insertBefore(button, settings || null);
  }

  document.addEventListener('keydown', e => {
    if (!document.getElementById(GUIDE_ID)) return;
    if (e.key === 'Escape') closeGuide();
    if (['Escape','ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Enter',' '].includes(e.key)) e.stopImmediatePropagation();
  }, true);

  const start = () => {
    installButton();
    const root = document.getElementById('ui-root') || document.body;
    new MutationObserver(installButton).observe(root, {subtree:true, childList:true});
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();