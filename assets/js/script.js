//copy text func
async function copyToClipboard(text) {
  if (!text) return false;

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);

      if (!successful) throw new Error("کپی ناموفق بود");
      return true;
    }
  } catch (error) {
    console.error("خطا در کپی:", error);
    return false;
  }
}

// tab management func
document.addEventListener("DOMContentLoaded", () => {
  // main tabs
  document.querySelectorAll(".tab-button").forEach((button) => {
    button.addEventListener("click", () => {
      const targetId = button.dataset.tab;
      document
        .querySelectorAll(".tab-button")
        .forEach((btn) => btn.classList.remove("active"));
      document
        .querySelectorAll(".tab-content")
        .forEach((content) => content.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

  // tab 2
  document.querySelectorAll(".system2-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.system2Tab;
      document
        .querySelectorAll(".system2-tab")
        .forEach((t) => t.classList.remove("active"));
      document
        .querySelectorAll(".system2-tab-content")
        .forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(targetId).classList.add("active");
    });
  });

  initSystem1();
  initSystem2();
  initPWA();
});

// word enc func
function initSystem1() {
  const PERSIAN_WORDS = [
    "آب",
    "آبش",
    "آذر",
    "آرام",
    "آسمان",
    "آفتاب",
    "آقا",
    "آهن",
    "آینه",
    "ابر",
    "اتاق",
    "اجاق",
    "اخر",
    "ادب",
    "اذان",
    "از",
    "است",
    "اسلام",
    "اشک",
    "اصلی",
    "اطاق",
    "اعتماد",
    "اغوش",
    "الف",
    "الفت",
    "ام",
    "امید",
    "امر",
    "انار",
    "اند",
    "اندر",
    "انجیر",
    "انقلاب",
    "اول",
    "اهل",
    "او",
    "ای",
    "این",
    "اینجا",
    "باد",
    "بار",
    "باران",
    "باره",
    "باز",
    "بازار",
    "بازو",
    "باغ",
    "بال",
    "بالا",
    "بانو",
    "باور",
    "با",
    "بخش",
    "بد",
    "بر",
    "برگ",
    "برق",
    "بره",
    "بزرگ",
    "بس",
    "بستر",
    "بشر",
    "بغض",
    "بند",
    "به",
    "باند",
    "بید",
    "پخش",
    "بین",
    "پا",
    "پاک",
    "پان",
    "پدر",
    "پر",
    "پرده",
    "پزشک",
    "پشت",
    "پل",
    "پنج",
    "پوست",
    "پیر",
    "پیمان",
    "تاب",
    "تاج",
    "تا",
    "تخت",
    "تر",
    "تراش",
    "تسبیح",
    "تشنگی",
    "تغییر",
    "تلخ",
    "تن",
    "تند",
    "ته",
    "توجه",
    "تو",
    "توی",
    "تپش",
    "ثابت",
    "ثمر",
    "جای",
    "جان",
    "جبر",
    "جد",
    "جدا",
    "جذر",
    "جسم",
    "جل",
    "جلو",
    "جمع",
    "جنگ",
    "جو",
    "جور",
    "جوش",
    "جیب",
    "چابک",
    "چاپ",
    "چار",
    "چاه",
    "چای",
    "چپ",
    "چشم",
    "چقدر",
    "چند",
    "چهره",
    "چوب",
    "چون",
    "چهار",
    "حال",
    "حرف",
    "حرم",
    "حس",
    "حشره",
    "حق",
    "حکم",
    "حلال",
    "حلقه",
    "حوض",
    "حکایت",
    "خاک",
    "خانه",
    "خدا",
    "خر",
    "خراب",
    "خرد",
    "خرم",
    "خروس",
    "خوش",
    "خون",
    "خیمه",
    "داد",
    "دار",
    "داری",
    "دست",
    "دل",
    "دم",
    "دنیا",
    "ده",
    "صد",
    "دو",
    "دور",
    "دوست",
    "دولت",
    "دی",
    "دیوار",
    "دین",
    "ذات",
    "ذره",
    "ذکر",
    "راز",
    "راست",
    "راه",
    "رب",
    "رتبه",
    "رج",
    "رخ",
    "رد",
    "رنگ",
    "رو",
    "روب",
    "روح",
    "روز",
    "روشن",
    "روی",
    "ریش",
    "ریشه",
    "زاد",
    "زار",
    "زبان",
    "زخم",
    "زد",
    "زر",
    "زمان",
    "زمین",
    "زن",
    "زه",
    "زیاد",
    "زیر",
    "ساز",
    "سال",
    "سبز",
    "ستار",
    "سر",
    "سرد",
    "سرو",
    "سقف",
    "سم",
    "سنگ",
    "سه",
    "سوز",
    "سوی",
    "سینه",
    "سیاه",
    "شب",
    "شر",
    "شعر",
    "شغل",
    "شمش",
    "شمع",
    "شن",
    "شهر",
    "شو",
    "شود",
    "شیر",
    "صاف",
    "صبح",
    "صدا",
    "صر",
    "صفت",
    "صوفی",
    "صیاد",
    "ضد",
    "طبع",
    "طرف",
    "طلا",
    "طمع",
    "طناب",
    "ظلم",
    "عاشق",
    "عاقل",
    "عاقبت",
    "عبرت",
    "عشق",
    "عصر",
    "عقل",
    "علم",
    "عمر",
    "عن",
    "عین",
    "غذا",
    "غرب",
    "غرق",
    "غم",
    "غیر",
    "فار",
    "فارغ",
    "فاصله",
    "فتح",
    "فرد",
    "فرز",
    "فرو",
    "فصل",
    "فکر",
    "فهم",
    "قدر",
    "قدم",
    "قرن",
    "قسم",
    "قشنگ",
    "قلب",
    "قلم",
    "قن",
    "قهر",
    "قوی",
    "قیمت",
    "کار",
    "کاش",
    "کام",
    "کتاب",
    "کج",
    "کرد",
    "کرم",
    "کسب",
    "کش",
    "کف",
    "کلام",
    "کلید",
    "کم",
    "کن",
    "کند",
    "کوه",
    "کجا",
    "کوش",
    "کی",
    "کیک",
    "گاز",
    "گاو",
    "گاه",
    "گر",
    "گرفت",
    "گرم",
    "گفت",
    "گل",
    "گمراه",
    "گنج",
    "گهر",
    "گو",
    "گوش",
    "گوشه",
    "گیاه",
    "لبه",
    "لحن",
    "لرز",
    "لطف",
    "لعل",
    "لب",
    "لحظه",
    "لذت",
    "لشکر",
    "لطفا",
    "لکه",
    "لول",
    "لیز",
    "ماه",
    "مادر",
    "مان",
    "ماه",
    "مایه",
    "مت",
    "مثل",
    "مج",
    "مجد",
    "محبت",
    "محراب",
    "مرد",
    "مرز",
    "مرگ",
    "مزد",
    "مست",
    "مشق",
    "مشکل",
    "مصر",
    "مطرب",
    "معنی",
    "مفت",
    "مق",
    "مقدس",
    "ملک",
    "من",
    "مهم",
    "مهربان",
    "مو",
    "مور",
    "موم",
    "مهر",
    "می",
    "میز",
    "میل",
    "ناز",
    "نام",
    "نان",
    "نبرد",
    "نبوغ",
    "نت",
    "نجات",
    "نخ",
    "ند",
    "نرد",
    "نرم",
    "نزار",
    "نسبت",
    "نشست",
    "نظر",
    "نعمت",
    "نفر",
    "نفس",
    "نقد",
    "نقش",
    "نکته",
    "نم",
    "نما",
    "نمره",
    "نمی",
    "نور",
    "نوک",
    "نوع",
    "نهاد",
    "نهر",
    "نه",
    "نوا",
    "نور",
    "نوید",
    "نی",
    "نیاز",
    "نیرو",
    "نیل",
    "هوا",
    "هوش",
    "هنگام",
    "هیچ",
    "وام",
    "واقع",
    "وجد",
    "ورد",
    "ورم",
    "وزن",
    "وسط",
    "وفا",
    "وقت",
    "ول",
    "ولی",
    "ویران",
    "ویژه",
    "یاد",
    "یار",
    "یافت",
    "یاغی",
    "یاقوت",
    "یال",
    "یان",
    "یخ",
    "ید",
    "یارم",
    "یاس",
    "یافت",
    "یال",
  ];

  // normalize func
  function normalizeText(text) {
    if (!text || typeof text !== "string") return "";

    return text
      .normalize("NFD")
      .replace(/[\u064A\u0649\u06CC]/g, "ی")
      .replace(/[\u0643\u06A9]/g, "ک")
      .normalize("NFC")
      .replace(/\u200C+/g, "\u200C")
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .trim();
  }

  // persian enc
  class FarsiEncoder {
    constructor() {
      this.words = PERSIAN_WORDS.slice(0, 256).map((w) => normalizeText(w));
      this.wordMap = new Map();
      this.byteMap = new Map();

      this.words.forEach((word, index) => {
        this.wordMap.set(word, index);
        this.byteMap.set(index, word);
      });
    }

    async deriveKey(passphrase) {
      const normalizedPass = normalizeText(passphrase);
      const encoder = new TextEncoder();
      const passData = encoder.encode(normalizedPass);
      const salt = encoder.encode("farsi-encoder-secure");

      const keyMaterial = await crypto.subtle.importKey(
        "raw",
        passData,
        "PBKDF2",
        false,
        ["deriveKey"]
      );

      return await crypto.subtle.deriveKey(
        {
          name: "PBKDF2",
          salt: salt,
          iterations: 145000,
          hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
      );
    }

    async encrypt(plaintext, passphrase) {
      if (!plaintext || !passphrase) {
        throw new Error("متن و کلید باید وارد شوند");
      }

      const key = await this.deriveKey(passphrase);
      const encoder = new TextEncoder();
      const data = encoder.encode(plaintext);
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encryptedData = await crypto.subtle.encrypt(
        {
          name: "AES-GCM",
          iv: iv,
          tagLength: 128,
        },
        key,
        data
      );

      const combined = new Uint8Array(iv.length + encryptedData.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(encryptedData), iv.length);

      const words = [];
      for (let i = 0; i < combined.length; i++) {
        const word = this.byteMap.get(combined[i]);
        if (!word) throw new Error(`خطا در تبدیل بایت به کلمه`);
        words.push(word);
      }

      return words.join(" ");
    }

    async decrypt(ciphertext, passphrase) {
      if (!ciphertext || !passphrase) {
        throw new Error("متن رمز شده و کلید باید وارد شوند");
      }

      const words = ciphertext
        .split(/\s+/)
        .map((w) => normalizeText(w))
        .filter((w) => w);

      if (words.length < 13) {
        throw new Error("متن رمز شده بسیار کوتاه است");
      }

      const bytes = new Uint8Array(words.length);
      for (let i = 0; i < words.length; i++) {
        const byte = this.wordMap.get(words[i]);
        if (byte === undefined) {
          throw new Error(`کلمه نامعتبر "${words[i]}" در موقعیت ${i + 1}`);
        }
        bytes[i] = byte;
      }

      const iv = bytes.slice(0, 12);
      const encryptedData = bytes.slice(12);

      if (encryptedData.length < 16) {
        throw new Error("داده رمز شده نامعتبر است");
      }

      const key = await this.deriveKey(passphrase);

      const decryptedData = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: iv,
          tagLength: 128,
        },
        key,
        encryptedData
      );

      const decoder = new TextDecoder("utf-8");
      return decoder.decode(decryptedData);
    }

    async testEncryption(passphrase) {
      const testText = "تست ۱۲۳ ABC 🇮🇷";
      try {
        const encrypted = await this.encrypt(testText, passphrase);
        const decrypted = await this.decrypt(encrypted, passphrase);
        return decrypted === testText;
      } catch {
        return false;
      }
    }
  }

  // enc 1 management
  class System1UI {
    constructor() {
      this.encoder = new FarsiEncoder();
      this.initElements();
      this.init();
    }

    initElements() {
      this.elements = {
        passphrase: document.getElementById("passphrase"),
        plaintext: document.getElementById("plaintext"),
        ciphertext: document.getElementById("ciphertext"),
        encryptedOutput: document.getElementById("encrypted-output"),
        decryptedOutput: document.getElementById("decrypted-output"),
        generateKey: document.getElementById("generate-key"),
        copyKey: document.getElementById("copy-key"),
        testKey: document.getElementById("test-key"),
        encryptBtn: document.getElementById("encrypt-btn"),
        decryptBtn: document.getElementById("decrypt-btn"),
        copyEncrypted: document.getElementById("copy-encrypted"),
        copyDecrypted: document.getElementById("copy-decrypted"),
        clearEncrypt: document.getElementById("clear-encrypt"),
        clearDecrypt: document.getElementById("clear-decrypt"),
        keyStatus: document.getElementById("key-status"),
        encryptStatus: document.getElementById("encrypt-status"),
        decryptStatus: document.getElementById("decrypt-status"),
        strengthBar: document.getElementById("strength-bar"),
        strengthText: document.getElementById("strength-text"),
      };
    }

    init() {
      this.setupEventListeners();
      this.updateUI();
    }

    setupEventListeners() {
      // key management
      this.elements.generateKey.addEventListener("click", () =>
        this.generateKey()
      );
      this.elements.copyKey.addEventListener("click", () =>
        this.copyKeyHandler()
      );
      this.elements.testKey.addEventListener("click", () =>
        this.testCurrentKey()
      );
      this.elements.passphrase.addEventListener("input", () => {
        this.updatePasswordStrength();
        this.updateUI();
      });

      // enc
      this.elements.encryptBtn.addEventListener("click", () =>
        this.performEncryption()
      );
      this.elements.copyEncrypted.addEventListener("click", () =>
        this.copyEncryptedHandler()
      );
      this.elements.clearEncrypt.addEventListener("click", () => {
        this.elements.plaintext.value = "";
        this.elements.encryptedOutput.textContent = "";
        this.elements.copyEncrypted.disabled = true;
        this.showStatus(this.elements.encryptStatus, "متن پاک شد", "info");
      });

      // dec
      this.elements.decryptBtn.addEventListener("click", () =>
        this.performDecryption()
      );
      this.elements.copyDecrypted.addEventListener("click", () =>
        this.copyDecryptedHandler()
      );
      this.elements.clearDecrypt.addEventListener("click", () => {
        this.elements.ciphertext.value = "";
        this.elements.decryptedOutput.textContent = "";
        this.elements.copyDecrypted.disabled = true;
        this.showStatus(this.elements.decryptStatus, "متن پاک شد", "info");
      });

      // UI update
      this.elements.plaintext.addEventListener("input", () => this.updateUI());
      this.elements.ciphertext.addEventListener("input", () => this.updateUI());
    }

    updatePasswordStrength() {
      const pass = this.elements.passphrase.value;
      let strength = 0;

      if (pass.length >= 8) strength += 25;
      if (pass.length >= 12) strength += 25;
      if (/[\u0600-\u06FF]/.test(pass)) strength += 25;
      if (/\s/.test(pass)) strength += 25;

      this.elements.strengthBar.className = "strength-bar";
      this.elements.strengthBar.style.width = `${strength}%`;

      let text = "";
      if (strength < 25) {
        text = "خیلی ضعیف";
        this.elements.strengthBar.classList.add("strength-weak");
      } else if (strength < 50) {
        text = "ضعیف";
        this.elements.strengthBar.classList.add("strength-fair");
      } else if (strength < 75) {
        text = "متوسط";
        this.elements.strengthBar.classList.add("strength-good");
      } else {
        text = "قوی";
        this.elements.strengthBar.classList.add("strength-strong");
      }

      this.elements.strengthText.textContent = `قدرت کلید: ${text}`;
    }

    updateUI() {
      const hasKey = this.elements.passphrase.value.trim().length > 0;
      const hasPlaintext = this.elements.plaintext.value.trim().length > 0;
      const hasCiphertext = this.elements.ciphertext.value.trim().length > 0;
      const hasEncryptedOutput =
        this.elements.encryptedOutput.textContent.trim().length > 0;
      const hasDecryptedOutput =
        this.elements.decryptedOutput.textContent.trim().length > 0;

      this.elements.copyKey.disabled = !hasKey;
      this.elements.encryptBtn.disabled = !(hasKey && hasPlaintext);
      this.elements.copyEncrypted.disabled = !hasEncryptedOutput;
      this.elements.decryptBtn.disabled = !(hasKey && hasCiphertext);
      this.elements.copyDecrypted.disabled = !hasDecryptedOutput;
    }

    async generateKey() {
      try {
        const randomWords = [];
        for (let i = 0; i < 8; i++) {
          const randomIndex = Math.floor(
            Math.random() * this.encoder.words.length
          );
          randomWords.push(this.encoder.words[randomIndex]);
        }
        const newKey = randomWords.join(" ");
        this.elements.passphrase.value = newKey;

        this.showStatus(
          this.elements.keyStatus,
          "✅ کلید جدید تولید شد",
          "success"
        );
        this.updatePasswordStrength();
        this.updateUI();
      } catch (error) {
        this.showStatus(
          this.elements.keyStatus,
          `❌ خطا در تولید کلید`,
          "error"
        );
      }
    }

    async testCurrentKey() {
      const passphrase = this.elements.passphrase.value.trim();
      if (!passphrase) {
        this.showStatus(
          this.elements.keyStatus,
          "⚠️ لطفا ابتدا یک کلید وارد کنید",
          "error"
        );
        return;
      }

      this.showStatus(this.elements.keyStatus, "🔍 در حال تست کلید...", "info");

      try {
        const result = await this.encoder.testEncryption(passphrase);
        if (result) {
          this.showStatus(
            this.elements.keyStatus,
            "✅ کلید به درستی کار می‌کند",
            "success"
          );
        } else {
          this.showStatus(this.elements.keyStatus, "❌ مشکل در کلید", "error");
        }
      } catch {
        this.showStatus(this.elements.keyStatus, "❌ خطا در تست", "error");
      }
    }

    async performEncryption() {
      const plaintext = this.elements.plaintext.value;
      const passphrase = this.elements.passphrase.value.trim();

      if (!plaintext || !passphrase) {
        this.showStatus(
          this.elements.encryptStatus,
          "⚠️ لطفا متن و کلید را وارد کنید",
          "error"
        );
        return;
      }

      this.showStatus(
        this.elements.encryptStatus,
        "🔒 در حال رمزنگاری...",
        "info"
      );
      this.elements.encryptBtn.disabled = true;

      try {
        const encrypted = await this.encoder.encrypt(plaintext, passphrase);
        this.elements.encryptedOutput.textContent = encrypted;
        const wordCount = encrypted.split(" ").length;
        this.showStatus(
          this.elements.encryptStatus,
          `✅ رمزنگاری موفق (${wordCount} کلمه)`,
          "success"
        );
        this.updateUI();
      } catch (error) {
        this.showStatus(
          this.elements.encryptStatus,
          "❌ خطا در رمزنگاری",
          "error"
        );
      } finally {
        this.elements.encryptBtn.disabled = false;
      }
    }

    async performDecryption() {
      const ciphertext = this.elements.ciphertext.value;
      const passphrase = this.elements.passphrase.value.trim();

      if (!ciphertext || !passphrase) {
        this.showStatus(
          this.elements.decryptStatus,
          "⚠️ لطفا متن رمز شده و کلید را وارد کنید",
          "error"
        );
        return;
      }

      this.showStatus(
        this.elements.decryptStatus,
        "🔓 در حال رمزگشایی...",
        "info"
      );
      this.elements.decryptBtn.disabled = true;

      try {
        const decrypted = await this.encoder.decrypt(ciphertext, passphrase);
        this.elements.decryptedOutput.textContent = decrypted;
        this.showStatus(
          this.elements.decryptStatus,
          "✅ رمزگشایی موفق",
          "success"
        );
        this.updateUI();
      } catch (error) {
        this.showStatus(
          this.elements.decryptStatus,
          "❌ خطا در رمزگشایی",
          "error"
        );
        this.elements.decryptedOutput.textContent = "";
      } finally {
        this.elements.decryptBtn.disabled = false;
      }
    }

    async copyKeyHandler() {
      const key = this.elements.passphrase.value.trim();
      if (!key) return;

      const success = await copyToClipboard(key);
      if (success) {
        this.showStatus(
          this.elements.keyStatus,
          "✅ کلید در حافظه کپی شد",
          "success"
        );
        this.elements.copyKey.textContent = "کپی شد!";
        setTimeout(
          () => (this.elements.copyKey.textContent = "کپی کلید"),
          2000
        );
      } else {
        this.showStatus(
          this.elements.keyStatus,
          "❌ خطا در کپی کردن کلید",
          "error"
        );
      }
    }

    async copyEncryptedHandler() {
      const text = this.elements.encryptedOutput.textContent.trim();
      if (!text) return;

      const success = await copyToClipboard(text);
      if (success) {
        this.showStatus(
          this.elements.encryptStatus,
          "✅ متن رمز شده کپی شد",
          "success"
        );
        this.elements.copyEncrypted.textContent = "کپی شد!";
        setTimeout(
          () => (this.elements.copyEncrypted.textContent = "کپی متن رمز"),
          2000
        );
      } else {
        this.showStatus(
          this.elements.encryptStatus,
          "❌ خطا در کپی کردن متن رمز",
          "error"
        );
      }
    }

    async copyDecryptedHandler() {
      const text = this.elements.decryptedOutput.textContent.trim();
      if (!text) return;

      const success = await copyToClipboard(text);
      if (success) {
        this.showStatus(
          this.elements.decryptStatus,
          "✅ متن اصلی کپی شد",
          "success"
        );
        this.elements.copyDecrypted.textContent = "کپی شد!";
        setTimeout(
          () => (this.elements.copyDecrypted.textContent = "کپی متن اصلی"),
          2000
        );
      } else {
        this.showStatus(
          this.elements.decryptStatus,
          "❌ خطا در کپی کردن متن اصلی",
          "error"
        );
      }
    }

    showStatus(element, message, type = "info") {
      element.textContent = message;
      element.className = "status " + type;
      element.style.display = "block";

      // close
      element.onclick = () => (element.style.display = "none");

      setTimeout(() => {
        element.style.display = "none";
      }, 5000);
    }
  }

  new System1UI();
}

// letters enc
function initSystem2() {
  const PERSIAN_CHARS = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیآ";
  const BASE64_CHARS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  const PERSIAN_MAP_CHARS = "ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهیآأإئؤءةۀ";

  const base64ToPersian = {};
  const persianToBase64 = {};

  for (let i = 0; i < 64; i++) {
    base64ToPersian[BASE64_CHARS[i]] = PERSIAN_MAP_CHARS[i];
    persianToBase64[PERSIAN_MAP_CHARS[i]] = BASE64_CHARS[i];
  }
  base64ToPersian["="] = "=";
  persianToBase64["="] = "=";

  // convert
  const convertToPersian = (str) =>
    str
      .split("")
      .map((c) => base64ToPersian[c] || c)
      .join("");
  const convertFromPersian = (str) =>
    str
      .split("")
      .map((c) => persianToBase64[c] || c)
      .join("");

  // consts
  const elements = {
    keyInput: document.getElementById("system2-key-input"),
    genKeyBtn: document.getElementById("system2-gen-key"),
    keyCopyBtn: document.getElementById("system2-key-copy"),
    encodeInput: document.getElementById("system2-encode-input"),
    encodeOutput: document.getElementById("system2-encode-output"),
    encodeCopyBtn: document.getElementById("system2-encode-copy"),
    encodeBtn: document.getElementById("system2-encode-btn"),
    decodeInput: document.getElementById("system2-decode-input"),
    decodeOutput: document.getElementById("system2-decode-output"),
    decodeCopyBtn: document.getElementById("system2-decode-copy"),
    decodeBtn: document.getElementById("system2-decode-btn"),
    keyStatus: document.getElementById("system2-key-status"),
    encodeStatus: document.getElementById("system2-encode-status"),
    decodeStatus: document.getElementById("system2-decode-status"),
    keyDisplay: document.getElementById("system2-key-display"),

    stegoImageInput: document.getElementById("stego-image-input"),
    stegoUploadArea: document.getElementById("stego-upload-area"),
    browseStegoBtn: document.getElementById("browse-stego-btn"),
    hideInImageBtn: document.getElementById("hide-in-image-btn"),
    downloadStegoBtn: document.getElementById("download-stego-btn"),
    clearStegoBtn: document.getElementById("clear-stego-btn"),
    stegoStatus: document.getElementById("stego-status"),
    stegoSourceCanvas: document.getElementById("stego-source-canvas"),
    stegoOutputCanvas: document.getElementById("stego-output-canvas"),

    extractImageInput: document.getElementById("extract-image-input"),
    extractUploadArea: document.getElementById("extract-upload-area"),
    browseExtractBtn: document.getElementById("browse-extract-btn"),
    extractFromImageBtn: document.getElementById("extract-from-image-btn"),
    extractCanvas: document.getElementById("extract-canvas"),
    extractedInfoOutput: document.getElementById("extracted-info-output"),
    autoDecryptBtn: document.getElementById("auto-decrypt-btn"),
    copyExtractedBtn: document.getElementById("copy-extracted-btn"),
    extractStatus: document.getElementById("extract-status"),
  };

  let currentStegoImage = null;
  let currentExtractImage = null;
  let hiddenKey = "";
  let hiddenText = "";
  let lastEncryptedText = "";

  // main func
  const encryptData = (showMessage = true) => {
    const plainText = elements.encodeInput.value.trim();
    const key = elements.keyInput.value.trim();

    if (!plainText || !key) {
      elements.encodeOutput.textContent = "";
      elements.encodeCopyBtn.disabled = true;
      updateStegoButtonState();
      if (showMessage)
        showStatus(
          elements.encodeStatus,
          "⚠️ لطفا متن و کلید را وارد کنید",
          "error"
        );
      return;
    }

    const currentInput = plainText + key;
    if (lastEncryptedText === currentInput && !showMessage) return;

    try {
      const encrypted = CryptoJS.AES.encrypt(plainText, key).toString();
      const persianEncrypted = convertToPersian(encrypted);
      elements.encodeOutput.textContent = persianEncrypted;
      elements.encodeCopyBtn.disabled = false;
      lastEncryptedText = currentInput;

      if (showMessage)
        showStatus(elements.encodeStatus, "✅ رمزنگاری موفق", "success");
      updateStegoButtonState();
    } catch {
      elements.encodeOutput.textContent = "خطا در رمزنگاری";
      elements.encodeCopyBtn.disabled = true;
      updateStegoButtonState();
      if (showMessage)
        showStatus(elements.encodeStatus, "❌ خطا در رمزنگاری", "error");
    }
  };

  const decryptData = (showMessage = true) => {
    const encryptedText = elements.decodeInput.value.trim();
    const key = elements.keyInput.value.trim();

    if (!encryptedText || !key) {
      elements.decodeOutput.textContent = "";
      elements.decodeCopyBtn.disabled = true;
      return;
    }

    try {
      const base64Text = convertFromPersian(encryptedText);
      const decryptedBytes = CryptoJS.AES.decrypt(base64Text, key);
      const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);

      if (decryptedText) {
        elements.decodeOutput.textContent = decryptedText;
        elements.decodeCopyBtn.disabled = false;
        if (showMessage)
          showStatus(elements.decodeStatus, "✅ رمزگشایی موفق", "success");
      } else {
        elements.decodeOutput.textContent = "کلید اشتباه!";
        elements.decodeCopyBtn.disabled = true;
        if (showMessage)
          showStatus(elements.decodeStatus, "❌ کلید اشتباه است", "error");
      }
    } catch {
      elements.decodeOutput.textContent = "کلید اشتباه یا داده خراب!";
      elements.decodeCopyBtn.disabled = true;
      if (showMessage)
        showStatus(elements.decodeStatus, "❌ خطا در رمزگشایی", "error");
    }
  };

  // generate key
  elements.genKeyBtn.addEventListener("click", () => {
    let key = "";
    const randomBytes = CryptoJS.lib.WordArray.random(32);

    for (let i = 0; i < 32; i++) {
      const byte = (randomBytes.words[i >> 2] >>> (24 - (i % 4) * 8)) & 0xff;
      key += PERSIAN_CHARS[byte % PERSIAN_CHARS.length];
    }

    elements.keyInput.value = key;
    elements.keyDisplay.textContent = key;

    showStatus(elements.keyStatus, "✅ کلید تولید شد", "success");
    updateKeyCopyState();
    encryptData(false);
    updateStegoButtonState();
  });

  // update stage
  const updateKeyCopyState = () => {
    const hasKey = elements.keyInput.value.trim().length > 0;
    elements.keyCopyBtn.disabled = !hasKey;
    elements.keyDisplay.textContent = hasKey ? elements.keyInput.value : "";
  };

  const updateStegoButtonState = () => {
    const hasKey = elements.keyInput.value.trim().length > 0;
    const hasEncryptedText =
      elements.encodeOutput.textContent.trim().length > 0;
    const hasImage = currentStegoImage !== null;

    elements.hideInImageBtn.disabled = !(
      hasKey &&
      hasEncryptedText &&
      hasImage
    );
    elements.downloadStegoBtn.disabled = !hasImage;
  };

  // click events
  elements.keyCopyBtn.addEventListener("click", async () => {
    const key = elements.keyInput.value.trim();
    if (!key) return;

    const success = await copyToClipboard(key);
    if (success) {
      showStatus(elements.keyStatus, "✅ کلید کپی شد", "success");
      elements.keyCopyBtn.textContent = "کپی شد!";
      setTimeout(() => (elements.keyCopyBtn.textContent = "کپی کلید"), 2000);
    } else {
      showStatus(elements.keyStatus, "❌ خطا در کپی کردن کلید", "error");
    }
  });

  elements.encodeBtn.addEventListener("click", () => encryptData(true));
  elements.decodeBtn.addEventListener("click", () => decryptData(true));

  // enc and dec / live
  let liveEncryptTimeout, liveDecryptTimeout;

  elements.keyInput.addEventListener("input", () => {
    updateKeyCopyState();
    clearTimeout(liveEncryptTimeout);
    liveEncryptTimeout = setTimeout(() => encryptData(false), 300);
    clearTimeout(liveDecryptTimeout);
    liveDecryptTimeout = setTimeout(() => decryptData(false), 300);
    updateStegoButtonState();
  });

  elements.encodeInput.addEventListener("input", () => {
    clearTimeout(liveEncryptTimeout);
    liveEncryptTimeout = setTimeout(() => encryptData(false), 300);
  });

  elements.decodeInput.addEventListener("input", () => {
    clearTimeout(liveDecryptTimeout);
    liveDecryptTimeout = setTimeout(() => decryptData(false), 300);
  });

  //copy text
  elements.encodeCopyBtn.addEventListener("click", async () => {
    const text = elements.encodeOutput.textContent;
    if (!text) return;

    const success = await copyToClipboard(text);
    if (success) {
      showStatus(elements.encodeStatus, "✅ متن رمز شده کپی شد", "success");
      elements.encodeCopyBtn.textContent = "کپی شد!";
      setTimeout(() => (elements.encodeCopyBtn.textContent = "کپی رمز"), 2000);
    } else {
      showStatus(elements.encodeStatus, "❌ خطا در کپی کردن متن رمز", "error");
    }
  });

  elements.decodeCopyBtn.addEventListener("click", async () => {
    const text = elements.decodeOutput.textContent;
    if (!text || text.includes("اشتباه") || text.includes("خراب")) return;

    const success = await copyToClipboard(text);
    if (success) {
      showStatus(elements.decodeStatus, "✅ متن اصلی کپی شد", "success");
      elements.decodeCopyBtn.textContent = "کپی شد!";
      setTimeout(
        () => (elements.decodeCopyBtn.textContent = "کپی متن اصلی"),
        2000
      );
    } else {
      showStatus(elements.decodeStatus, "❌ خطا در کپی کردن متن اصلی", "error");
    }
  });

  //show status func
  function showStatus(element, message, type = "info") {
    element.textContent = message;
    element.className = "status " + type;
    element.style.display = "block";

    //close
    element.onclick = () => (element.style.display = "none");

    setTimeout(() => {
      element.style.display = "none";
    }, 5000);
  }

  //steganography
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  function hideMessageInImage(imageData, message) {
    const imgData = imageData.data;
    const msgBytes = encoder.encode(message);
    const msgLength = msgBytes.length;

    const totalBytes = new Uint8Array(4 + msgLength);
    totalBytes[0] = (msgLength >> 24) & 0xff;
    totalBytes[1] = (msgLength >> 16) & 0xff;
    totalBytes[2] = (msgLength >> 8) & 0xff;
    totalBytes[3] = msgLength & 0xff;
    totalBytes.set(msgBytes, 4);

    let bitIndex = 0;
    const totalBits = totalBytes.length * 8;

    if (totalBits > imgData.length / 4) {
      showStatus(elements.stegoStatus, "❌ پیام خیلی طولانی است!", "error");
      return imageData;
    }

    for (let i = 3; i < imgData.length && bitIndex < totalBits; i += 4) {
      const byteIndex = Math.floor(bitIndex / 8);
      const bitPos = 7 - (bitIndex % 8);
      const bit = (totalBytes[byteIndex] >> bitPos) & 1;

      imgData[i] = bit ? imgData[i] | 1 : imgData[i] & 0xfe;
      bitIndex++;
    }

    return imageData;
  }

  function extractMessageFromImage(imageData) {
    const imgData = imageData.data;
    let bitString = "";
    let bitCount = 0;

    for (let i = 3; i < imgData.length && bitCount < 32; i += 4) {
      bitString += imgData[i] & 1;
      bitCount++;
    }

    if (bitCount < 32) return "";
    const msgLength = parseInt(bitString, 2);
    const requiredBits = 32 + msgLength * 8;

    bitString = "";
    bitCount = 0;
    for (let i = 3; i < imgData.length && bitCount < requiredBits; i += 4) {
      bitString += imgData[i] & 1;
      bitCount++;
    }

    if (bitCount < requiredBits) return "";

    const msgBits = bitString.substr(32, msgLength * 8);
    const msgBytes = new Uint8Array(msgLength);
    for (let j = 0; j < msgLength; j++) {
      msgBytes[j] = parseInt(msgBits.substr(j * 8, 8), 2);
    }

    return decoder.decode(msgBytes);
  }

  function parseHiddenMessage(message) {
    const keyMatch = message.match(/k:([^:]+):t:(.+)/);
    return keyMatch ? { key: keyMatch[1], encryptedText: keyMatch[2] } : null;
  }

  //img upload
  function setupImageUpload(uploadArea, fileInput, canvas, onLoad) {
    uploadArea.addEventListener("click", () => fileInput.click());

    uploadArea.addEventListener("dragover", (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = "#8e44ad";
      uploadArea.style.background = "rgba(155, 89, 182, 0.2)";
    });

    uploadArea.addEventListener("dragleave", () => {
      uploadArea.style.borderColor = "#9b59b6";
      uploadArea.style.background = "rgba(155, 89, 182, 0.05)";
    });

    uploadArea.addEventListener("drop", (e) => {
      e.preventDefault();
      uploadArea.style.borderColor = "#9b59b6";
      uploadArea.style.background = "rgba(155, 89, 182, 0.05)";

      if (e.dataTransfer.files.length) {
        fileInput.files = e.dataTransfer.files;
        handleImageUpload(fileInput.files[0], canvas, onLoad);
      }
    });

    fileInput.addEventListener("change", (e) => {
      if (e.target.files[0]) {
        handleImageUpload(e.target.files[0], canvas, onLoad);
      }
    });
  }

  function handleImageUpload(file, canvas, onLoad) {
    if (!file.type.match("image.*")) {
      showStatus(
        elements.stegoStatus,
        "❌ لطفا یک فایل تصویر انتخاب کنید",
        "error"
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        onLoad(img);
      };
      img.onerror = () =>
        showStatus(elements.stegoStatus, "❌ خطا در بارگذاری تصویر", "error");
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  //setup Image Upload
  setupImageUpload(
    elements.stegoUploadArea,
    elements.stegoImageInput,
    elements.stegoSourceCanvas,
    (img) => {
      currentStegoImage = { image: img, width: img.width, height: img.height };
      showStatus(
        elements.stegoStatus,
        "✅ تصویر با موفقیت آپلود شد",
        "success"
      );
      updateStegoButtonState();
    }
  );

  setupImageUpload(
    elements.extractUploadArea,
    elements.extractImageInput,
    elements.extractCanvas,
    (img) => {
      currentExtractImage = {
        image: img,
        width: img.width,
        height: img.height,
      };
      showStatus(
        elements.extractStatus,
        "✅ تصویر با موفقیت آپلود شد",
        "success"
      );
      elements.extractFromImageBtn.disabled = false;
    }
  );

  // steganography keys
  elements.browseStegoBtn.addEventListener("click", () =>
    elements.stegoImageInput.click()
  );
  elements.browseExtractBtn.addEventListener("click", () =>
    elements.extractImageInput.click()
  );

  elements.hideInImageBtn.addEventListener("click", () => {
    const key = elements.keyInput.value.trim();
    const encryptedText = elements.encodeOutput.textContent.trim();

    if (!key || !encryptedText || !currentStegoImage) {
      showStatus(
        elements.stegoStatus,
        "❌ کلید، متن رمز شده یا تصویر موجود نیست",
        "error"
      );
      return;
    }

    const message = `k:${key}:t:${encryptedText}`;
    const canvas = elements.stegoSourceCanvas;
    const ctx = canvas.getContext("2d");
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    imageData = hideMessageInImage(imageData, message);

    const outputCanvas = elements.stegoOutputCanvas;
    const outputCtx = outputCanvas.getContext("2d");
    outputCanvas.width = canvas.width;
    outputCanvas.height = canvas.height;
    outputCtx.putImageData(imageData, 0, 0);
    outputCanvas.style.display = "block";

    showStatus(
      elements.stegoStatus,
      "✅ اطلاعات با موفقیت در تصویر پنهان شدند",
      "success"
    );
    elements.downloadStegoBtn.disabled = false;
  });

  elements.downloadStegoBtn.addEventListener("click", () => {
    const outputCanvas = elements.stegoOutputCanvas;
    if (outputCanvas.width === 0) {
      showStatus(
        elements.stegoStatus,
        "❌ ابتدا اطلاعات را در تصویر پنهان کنید",
        "error"
      );
      return;
    }

    outputCanvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `stego_image_${Date.now()}.png`;
      a.click();
      URL.revokeObjectURL(url);
      showStatus(
        elements.stegoStatus,
        "✅ تصویر با موفقیت دانلود شد",
        "success"
      );
    }, "image/png");
  });

  elements.clearStegoBtn.addEventListener("click", () => {
    const sourceCtx = elements.stegoSourceCanvas.getContext("2d");
    const outputCtx = elements.stegoOutputCanvas.getContext("2d");

    sourceCtx.clearRect(
      0,
      0,
      elements.stegoSourceCanvas.width,
      elements.stegoSourceCanvas.height
    );
    outputCtx.clearRect(
      0,
      0,
      elements.stegoOutputCanvas.width,
      elements.stegoOutputCanvas.height
    );
    elements.stegoOutputCanvas.style.display = "none";
    elements.stegoImageInput.value = "";
    currentStegoImage = null;
    elements.hideInImageBtn.disabled = true;
    elements.downloadStegoBtn.disabled = true;
    showStatus(elements.stegoStatus, "✅ تصویر و اطلاعات پاک شدند", "info");
  });

  elements.extractFromImageBtn.addEventListener("click", () => {
    if (!currentExtractImage) {
      showStatus(elements.extractStatus, "❌ ابتدا تصویری آپلود کنید", "error");
      return;
    }

    const canvas = elements.extractCanvas;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const extractedMessage = extractMessageFromImage(imageData);

    if (!extractedMessage) {
      showStatus(
        elements.extractStatus,
        "❌ هیچ اطلاعات پنهانی در تصویر یافت نشد",
        "error"
      );
      elements.extractedInfoOutput.textContent = "";
      elements.autoDecryptBtn.disabled = true;
      elements.copyExtractedBtn.disabled = true;
      return;
    }

    const parsedData = parseHiddenMessage(extractedMessage);

    if (parsedData) {
      hiddenKey = parsedData.key;
      hiddenText = parsedData.encryptedText;

      elements.autoDecryptBtn.disabled = false;
      elements.copyExtractedBtn.disabled = false;

      elements.extractedInfoOutput.innerHTML = `
                      <strong>✅ اطلاعات استخراج شد:</strong>
                      <br><br>
                      <strong>کلید:</strong>
                      <br>${parsedData.key}
                      <br><br>
                      <strong>متن رمز شده:</strong>
                      <br>${parsedData.encryptedText}
                  `;
      showStatus(
        elements.extractStatus,
        "✅ اطلاعات با موفقیت استخراج شدند",
        "success"
      );
    } else {
      elements.autoDecryptBtn.disabled = true;
      elements.copyExtractedBtn.disabled = false;
      elements.extractedInfoOutput.textContent = extractedMessage;
      showStatus(
        elements.extractStatus,
        "⚠️ اطلاعات استخراج شده اما فرمت صحیح نیست",
        "warning"
      );
    }
  });

  elements.autoDecryptBtn.addEventListener("click", () => {
    if (!hiddenKey || !hiddenText) {
      showStatus(
        elements.extractStatus,
        "❌ ابتدا اطلاعات را از تصویر استخراج کنید",
        "error"
      );
      return;
    }

    elements.keyInput.value = hiddenKey;
    elements.keyDisplay.textContent = hiddenKey;
    elements.decodeInput.value = hiddenText;

    updateKeyCopyState();
    updateStegoButtonState();
    decryptData(true);

    const decryptTab = document.querySelector(
      '[data-system2-tab="decryption"]'
    );
    if (decryptTab) decryptTab.click();

    showStatus(
      elements.extractStatus,
      "✅ رمزگشایی خودکار انجام شد",
      "success"
    );
  });

  elements.copyExtractedBtn.addEventListener("click", async () => {
    const text = elements.extractedInfoOutput.textContent;
    if (!text) return;

    const success = await copyToClipboard(text);
    if (success) {
      showStatus(
        elements.extractStatus,
        "✅ اطلاعات استخراج شده کپی شد",
        "success"
      );
      elements.copyExtractedBtn.textContent = "کپی شد!";
      setTimeout(
        () => (elements.copyExtractedBtn.textContent = "کپی اطلاعات"),
        2000
      );
    } else {
      showStatus(elements.extractStatus, "❌ خطا در کپی کردن اطلاعات", "error");
    }
  });

  //you know
  updateKeyCopyState();
  updateStegoButtonState();
  if (elements.encodeInput.value.trim() && elements.keyInput.value.trim())
    encryptData(false);
  if (elements.decodeInput.value.trim() && elements.keyInput.value.trim())
    decryptData(false);
}

// PWA
function initPWA() {
  console.log("🚀 راه‌اندازی UnchainVoice...");

  let deferredPrompt = null;
  let isPWAInstalled = false;
  let updateAvailable = false;
  const UPDATE_COOLDOWN = 24 * 60 * 60 * 1000; // 24 ساعت
  let lastUpdateCheck = 0;

  //create toast func
  function createToast(message, type = "info", duration = 4000) {
    document.querySelectorAll(".pwa-toast").forEach((toast) => toast.remove());

    const toast = document.createElement("div");
    toast.className = `pwa-toast pwa-toast-${type}`;
    toast.innerHTML = `
                  <div class="toast-content">
                      <span class="toast-icon">${getIconForType(type)}</span>
                      <span class="toast-message">${message}</span>
                  </div>
              `;

    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 10);

    //close
    toast.addEventListener("click", (e) => {
      if (!e.target.classList.contains("toast-update-btn")) {
        hideToast(toast);
      }
    });

    if (duration > 0) {
      setTimeout(() => hideToast(toast), duration);
    }

    return toast;
  }

  function hideToast(toast) {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }

  function getIconForType(type) {
    const icons = {
      success: "✅",
      error: "❌",
      warning: "⚠️",
      info: "ℹ️",
      install: "📱",
      update: "🔄",
    };
    return icons[type] || "ℹ️";
  }

  // check installation
  function checkInstallStatus() {
    const standalone = window.matchMedia("(display-mode: standalone)").matches;
    const fullscreen = window.matchMedia("(display-mode: fullscreen)").matches;
    const minimal = window.matchMedia("(display-mode: minimal-ui)").matches;
    const standaloneIOS = window.navigator.standalone === true;

    isPWAInstalled = standalone || fullscreen || minimal || standaloneIOS;

    if (isPWAInstalled) {
      document.body.classList.add("pwa-installed");
      const installBtn = document.getElementById("install-btn");
      if (installBtn) installBtn.style.display = "none";
    }

    return isPWAInstalled;
  }

  //Service worker
  async function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) {
      console.log("❌ Service Worker پشتیبانی نمی‌شود");
      createToast(
        "مرورگر شما از قابلیت آفلاین کامل پشتیبانی نمی‌کند",
        "warning",
        5000
      );
      return false;
    }

    // check
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "[::1]";

    const isHttps = window.location.protocol === "https:";

    if (!isLocalhost && !isHttps) {
      console.log("⚠️ Service Worker فقط در HTTPS یا localhost کار می‌کند");
      createToast(
        "برای قابلیت آفلاین کامل، از HTTPS یا localhost استفاده کنید",
        "info",
        5000
      );
      return false;
    }

    try {
      // reg service worker
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "./",
        updateViaCache: "none",
      });

      // listen to updates
      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;

        newWorker.addEventListener("statechange", () => {
          if (
            newWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            const lastUpdateShown =
              localStorage.getItem("lastUpdateShown") || 0;
            const now = Date.now();

            if (now - lastUpdateShown > UPDATE_COOLDOWN) {
              showUpdateNotification();
              localStorage.setItem("lastUpdateShown", now.toString());
            }
          }
        });
      });

      return true;
    } catch (error) {
      console.error("❌ خطا در ثبت Service Worker:", error);

      //error status
      if (error.message.includes("security")) {
        createToast(
          "برای Service Worker باید از HTTPS یا localhost استفاده کنید",
          "warning",
          5000
        );
      } else if (error.message.includes("MIME")) {
        createToast("خطا در نوع فایل Service Worker", "error", 4000);
      } else {
        createToast(
          "خطا در فعال‌سازی حالت آفلاین: " + error.message,
          "error",
          4000
        );
      }

      return false;
    }
  }

  // show update note
  function showUpdateNotification() {
    if (updateAvailable) return;
    updateAvailable = true;

    const toast = createToast("بروزرسانی جدید موجود است!", "update", 10000);

    const updateBtn = document.createElement("button");
    updateBtn.className = "toast-update-btn";
    updateBtn.textContent = "بروزرسانی";
    updateBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: "SKIP_WAITING",
        });
        localStorage.setItem("forceReload", "true");
        setTimeout(() => window.location.reload(), 500);
      }
      hideToast(toast);
    });

    toast.querySelector(".toast-content").appendChild(updateBtn);
  }

  function setupInstallPrompt() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const installBtn = document.getElementById("install-btn");
      if (installBtn) {
        installBtn.style.display = "flex";
        installBtn.classList.remove("hidden");
        installBtn.addEventListener("click", handleInstallClick);

        setTimeout(() => {
          if (!isPWAInstalled) {
            createToast("می‌توانید برنامه را نصب کنید", "install", 4000);
          }
        }, 2000);
      }
    });
  }

  // install key
  async function handleInstallClick() {
    if (!deferredPrompt) {
      showManualInstallGuide();
      return;
    }

    const installBtn = document.getElementById("install-btn");
    if (!installBtn) return;

    const originalText = installBtn.innerHTML;
    installBtn.disabled = true;
    installBtn.innerHTML = "...در حال نصب";

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === "accepted") {
        createToast("برنامه با موفقیت نصب شد!", "success", 5000);
        installBtn.style.display = "none";
        localStorage.setItem("pwa_installed", "true");
        localStorage.setItem("pwa_install_date", new Date().toISOString());
      } else {
        createToast(
          "نصب لغو شد. همچنان می‌توانید از وب‌اپ استفاده کنید.",
          "info",
          4000
        );
        installBtn.disabled = false;
        installBtn.innerHTML = originalText;
      }

      deferredPrompt = null;
    } catch (error) {
      console.error("❌ خطا در نصب:", error);
      createToast("خطا در فرآیند نصب", "error", 4000);
      installBtn.disabled = false;
      installBtn.innerHTML = originalText;
      showManualInstallGuide();
    }
  }

  // install help
  function showManualInstallGuide() {
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isAndroid = /Android/.test(navigator.userAgent);
    const isChrome = /Chrome/.test(navigator.userAgent);

    let instructions = "";

    if (isIOS && isSafari) {
      instructions = `
                      <h4>📱 نصب روی iOS (Safari):</h4>
                      <ol>
                          <li>دکمه Share (📤) را در پایین صفحه بزنید</li>
                          <li>گزینه "Add to Home Screen" را انتخاب کنید</li>
                          <li>نام "UnchainVoice" را تأیید کنید</li>
                          <li>دکمه "Add" را بزنید</li>
                      </ol>
                  `;
    } else if (isAndroid && isChrome) {
      instructions = `
                      <h4>📱 نصب روی Android (Chrome):</h4>
                      <ol>
                          <li>منو (سه نقطه ⋮) را باز کنید</li>
                          <li>"Install app" یا "Add to Home Screen" را انتخاب کنید</li>
                          <li>"Install" یا "Add" را بزنید</li>
                      </ol>
                  `;
    } else if (isChrome) {
      instructions = `
                      <h4>💻 نصب روی دسکتاپ (Chrome):</h4>
                      <ol>
                          <li>روی آیکون 📥 در نوار آدرس کلیک کنید</li>
                          <li>"Install UnchainVoice" را انتخاب کنید</li>
                          <li>دکمه "Install" را بزنید</li>
                      </ol>
                  `;
    } else {
      instructions = `
                      <h4>📱 نصب برنامه:</h4>
                      <p>برای نصب، از منوی مرورگر گزینه‌های زیر را پیدا کنید:</p>
                      <ul>
                          <li>"Install app"</li>
                          <li>"Add to Home Screen"</li>
                          <li>"Add to Desktop"</li>
                      </ul>
                  `;
    }

    const modal = document.createElement("div");
    modal.className = "pwa-install-guide";
    modal.innerHTML = `
                  <div class="guide-content">
                      <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                          <h3 style="color: #60a5fa; margin: 0; text-align: center;">نصب UnchainVoice</h3>
                      </div>
                      
                      <div style="color: #cbd5e1; line-height: 1.6;">
                          ${instructions}
                      </div>
                      
                      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #334155; text-align: center;">
                          <p style="color: #94a3b8; font-size: 14px;">
                          </p>
                          <p style="color: #94a3b8; font-size: 14px; font-style: italic;">

                          </p>
                      </div>
                  </div>
              `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.style.opacity = "0";
      setTimeout(() => modal.remove(), 300);
    };

    modal.addEventListener("click", closeModal);
    modal
      .querySelector(".guide-content")
      .addEventListener("click", (e) => e.stopPropagation());

    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleEsc);
    setTimeout(() => (modal.style.opacity = "1"), 10);
  }

  // network management
  function setupNetworkStatus() {
    const updateStatus = () => {
      const isOnline = navigator.onLine;

      if (!isOnline) {
        showOfflineIndicator();
      } else {
        hideOfflineIndicator();
      }
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);
    updateStatus();
  }

  function showOfflineIndicator() {
    let indicator = document.getElementById("offline-indicator");
    if (!indicator) {
      indicator = document.createElement("div");
      indicator.id = "offline-indicator";
      indicator.innerHTML = "📴 آفلاین";
      indicator.style.cssText = `
                      position: fixed;
                      bottom: 20px;
                      left: 20px;
                      background: rgba(245, 158, 11, 0.9);
                      color: white;
                      padding: 6px 12px;
                      border-radius: 20px;
                      font-size: 12px;
                      font-weight: 600;
                      z-index: 9998;
                  `;
      document.body.appendChild(indicator);
    }
  }

  function hideOfflineIndicator() {
    const indicator = document.getElementById("offline-indicator");
    if (indicator) indicator.remove();
  }

  // reload
  function checkForceReload() {
    if (localStorage.getItem("forceReload") === "true") {
      localStorage.removeItem("forceReload");
      createToast("برنامه با نسخه جدید بروزرسانی شد!", "success", 4000);
    }
  }

  // init pwa
  async function initializePWA() {
    console.log("🚀 شروع راه‌اندازی اپلیکیشن آفلاین...");

    checkInstallStatus();
    await registerServiceWorker();
    setupInstallPrompt();
    setupNetworkStatus();
    checkForceReload();

    window.addEventListener("appinstalled", () => {
      console.log("اپلیکیشن نصب شد");
      localStorage.setItem("pwa_installed", "true");

      const installBtn = document.getElementById("install-btn");
      if (installBtn) installBtn.style.display = "none";

      createToast(
        "🎉 UnchainVoice نصب شد! حالا کاملاً آفلاین کار می‌کند.",
        "success",
        5000
      );
    });

    console.log("✅ اپلیکیشن آفلاین راه‌اندازی شد");
  }

  // start pwa
  initializePWA();
}

