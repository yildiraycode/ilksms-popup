# İlksms Pop-up Uygulaması

## Proje Özeti

Bu proje, ilksms web sitesi için etkileşimli bir pop-up tasarımı ve prototipini geliştirmek amacıyla oluşturulmuştur. Pop-up, kullanıcıya 6 ürün kartı sunar ve bir "Beni Arayın" formu içerir. Kullanıcılar formu doldurarak iletişim bilgilerini paylaşabilir ve bu bilgiler belirlenen bir e-posta adresine gönderilir. Proje, temel web teknolojileri (HTML, CSS, JavaScript) kullanılarak geliştirilmiş, EmailJS ile form gönderimi sağlanmış ve kullanıcı doğrulaması için basit bir checkbox kullanılmıştır.

## Projenin Amacı

- Sayfaya giren kullanıcılara otomatik bir pop-up göstermek.
- 6 ürün kartını (eOkul Randevu, iKelebek Sistemi, vb.) bir grid düzeninde sergilemek.
- Kullanıcıların iletişim bilgilerini toplamak için bir form sunmak.
- Form verilerini belirlenen bir e-posta adresine göndermek.
- "Bir daha gösterme" seçeneği ile kullanıcı deneyimini kişiselleştirmek.

## Kullanılan Teknolojiler

- **HTML**: Pop-up ve form yapısını oluşturmak için.
- **CSS**: Responsive tasarım ve modern bir görünüm sağlamak için.
- **JavaScript**: Pop-up kontrolü, form gönderimi ve yerel depolama (localStorage) yönetimi için.
- **Font Awesome**: Ürün kartlarında ikonlar için.
- **EmailJS**: Form verilerini e-posta olarak göndermek için (backend olmadan).
- **Checkbox**: Kullanıcı doğrulaması için (reCAPTCHA yerine tercih edildi).
- **VS Code**: Kod yazımı ve test için (Live Server eklentisi ile yerel sunucu sağlandı).

## Proje Yapısı

Proje, aşağıdaki dosyalardan oluşur:

```
index.html     → Pop-up ve form yapısını içerir  
styles.css     → Pop-up, ürün kartları ve formun stilini tanımlar  
script.js      → Pop-up kontrolü, form gönderimi ve yerel depolama işlevselliğini sağlar  
README.md      → Projenin kurulum ve kullanım talimatlarını içerir
```

## İşlevsellik ve İşleyiş

### 1. Pop-up'ın Otomatik Açılması

Sayfaya girildiğinde pop-up otomatik olarak açılır.  
Eğer kullanıcı daha önce **"Bir daha gösterme"** kutusunu işaretlediyse, pop-up açılmaz.  
Bu işlevsellik, `localStorage` kullanılarak sağlanır.

```javascript
if (!localStorage.getItem("dontShowPopup")) {
  popupOverlay.style.display = "flex";
}
```

---

### 2. Ürün Kartları

Pop-up içinde 6 ürün kartı (eOkul Randevu, iKelebek Sistemi, iKilit Akıllı Tahta, iDers Programı, eOkul Yoklama, Okulum Mobil) bulunur.  
Her kart, bir ikon, başlık ve açıklama içerir.  
Kartlar 3x2 grid düzeninde sergilenir ve responsive olarak mobilde tek sütuna dönüşür.

HTML:
```html
<a href="#eokul-randevu" class="product-card">
  <i class="fas fa-calendar-alt"></i>
  <h3>eOkul Randevu</h3>
  <p>Öğretmen Veli randevu sistemi</p>
</a>
```

CSS:
```css
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}
```

---

### 3. "Beni Arayın" Formu

Form, aşağıdaki alanları içerir:

- Ad Soyad (zorunlu)
- Telefon Numarası (zorunlu)
- "Robot değilim" Checkbox (doğrulama)

Checkbox kontrolü:
```javascript
if (!captcha) {
  formMessage.textContent = "Lütfen 'Robot değilim' kutusunu işaretleyin.";
  return;
}
```

---

### 4. EmailJS ile Form Gönderimi

Form verileri EmailJS kullanılarak belirlenen e-posta adresine gönderilir.  
Güvenlik nedeniyle gerçek kimlikler paylaşılmamıştır.

```javascript
emailjs.init("YOUR_USER_ID");
emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
  name: name,
  phone: phone
});
```

Başarılı gönderim:
```javascript
formMessage.textContent = "Teşekkürler, en kısa sürede size ulaşacağız.";
```

Hatalı gönderim:
```javascript
formMessage.textContent = "Bir hata oluştu, lütfen tekrar deneyin.";
```

---

### 5. "Bir Daha Gösterme" Özelliği

Kullanıcı, "Bir daha gösterme" kutusunu işaretlediyse pop-up bir daha açılmaz:

```javascript
if (dontShowAgain.checked) {
  localStorage.setItem("dontShowPopup", "true");
}
```

---

### 6. Pop-up Kapatma

İki şekilde kapatılabilir:
- Sağ üstteki kapatma butonuna tıklayarak.
- Pop-up dışındaki alana (overlay'e) tıklayarak.

---

### 7. Responsive Tasarım

Mobil cihazlarda ürün kartları tek sütuna dönüşür:

```css
@media (max-width: 600px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
```

---

## Neler Yapıldı?

### Proje Kurulumu

- VS Code'da `ilksms-popup` adlı klasör oluşturuldu.
- `index.html`, `styles.css`, `script.js` dosyaları yazıldı.
- Live Server eklentisi ile test ortamı sağlandı.

### HTML Yapısı

- Pop-up, ürün kartları ve form `index.html` dosyasında oluşturuldu.
- Font Awesome CDN eklendi.

### CSS ile Tasarım

- Pop-up'a modern bir görünüm verildi.
- Ürün kartları için 3x2 grid düzeni kuruldu.
- Medya sorguları ile responsive yapı sağlandı.

### JavaScript ile İşlevsellik

- Pop-up'ın otomatik açılması ve kapatılması kodlandı.
- localStorage ile "Bir daha gösterme" özelliği sağlandı.
- EmailJS entegre edildi.
- Checkbox ile kullanıcı doğrulaması yapıldı.

### EmailJS Entegrasyonu

- EmailJS hesabı oluşturuldu, şablon yapılandırıldı:

```plaintext
To: [Belirlenen e-posta adresi]
Subject: Yeni Form Gönderimi
Body:
Ad Soyad: {{name}}
Telefon: {{phone}}
```

- Gerekli kimlik bilgileri kod içinde belirtildi, ancak paylaşılmadı.

### Test ve Hata Ayıklama

- Tüm özellikler test edildi.
- Konsol hataları giderildi.
- Mobil görünüm test edildi.

---

## İşleyiş

1. Kullanıcı sayfaya girer.
2. Pop-up otomatik açılır (eğer "Bir daha gösterme" işaretlenmemişse).
3. Kullanıcı 6 ürün kartını görür.
4. "Beni Arayın" formunu doldurur ve checkbox’ı işaretler.
5. Form gönderilir, EmailJS aracılığıyla e-posta iletilir.
6. Kullanıcıya başarı veya hata mesajı gösterilir.
7. Pop-up kapatılabilir ve “Bir daha gösterme” seçeneğiyle tekrar açılması engellenebilir.

---

## Sonuç

- Proje, ilksms web sitesi için etkileşimli ve kullanıcı dostu bir pop-up prototipi sunar.
- EmailJS sayesinde backend gerektirmeden form verileri iletilir.
- reCAPTCHA yerine basit bir checkbox doğrulama yöntemi tercih edilmiştir.
- Responsive yapı ile mobil uyumluluk sağlanmıştır.

---

## Kurulum ve Çalıştırma

1. Proje klasörünü (ilksms-popup) VS Code'da açın.  
2. `index.html` dosyasını Live Server ile çalıştırın.  
3. `script.js` içinde EmailJS kimliklerini (`YOUR_USER_ID`, `YOUR_SERVICE_ID`, `YOUR_TEMPLATE_ID`) güncelleyin.  
4. Tarayıcıda pop-up ve form işlevlerini test edin.
