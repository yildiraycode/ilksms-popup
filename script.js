document.addEventListener("DOMContentLoaded", () => {
    const popupOverlay = document.getElementById("popupOverlay");
    const closeBtn = document.getElementById("closeBtn");
    const dontShowAgain = document.getElementById("dontShowAgain");
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    //// localStorage'daki "dontShowPopup" anahtarını siler, böylece pop-up her zaman görünür hale gelir (test amaçlı)
    localStorage.removeItem("dontShowPopup");
    // EmailJS başlatma
    emailjs.init("YOUR_USER_ID"); // EmailJS Kullanıcı ID'nizi buraya ekleyin
  
    // Pop-up'ı göster/gizle kontrolü
    if (!localStorage.getItem("dontShowPopup")) {
      popupOverlay.style.display = "flex";
    }
  
    // Kapatma butonu
    closeBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
      if (dontShowAgain.checked) {
        localStorage.setItem("dontShowPopup", "true");
      }
    });
  
    // Pop-up dışına tıklama
    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
        if (dontShowAgain.checked) {
          localStorage.setItem("dontShowPopup", "true");
        }
      }
    });
  
    // Form gönderimi
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const phone = document.getElementById("phone").value;
      const captcha = document.getElementById("captcha").checked;
  
      if (!captcha) {
        formMessage.style.display = "block";
        formMessage.style.color = "red";
        formMessage.textContent = "Lütfen 'Robot değilim' kutusunu işaretleyin.";
        return;
      }
  
      // EmailJS ile form gönderimi
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        name: name,
        phone: phone
      }).then(() => {
        formMessage.style.display = "block";
        formMessage.style.color = "green";
        formMessage.textContent = "Teşekkürler, en kısa sürede size ulaşacağız.";
        contactForm.reset();
      }).catch(() => {
        formMessage.style.display = "block";
        formMessage.style.color = "red";
        formMessage.textContent = "Bir hata oluştu, lütfen tekrar deneyin.";
      });
    });
  });


