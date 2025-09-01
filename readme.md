# S4E Playwright Test Çerçevesi

Bu depo, S4E web uygulaması için Playwright ile yazılmış temel uçtan uca testleri içerir.

## Proje Genel Bakışı

Amaç, S4E uygulamasının ana akışlarını otomatik olarak test ederek temel işlevlerin doğru çalıştığını doğrulamaktır.

## Kullanılan Teknolojiler

- [Playwright](https://playwright.dev/) (JavaScript)
- .env ile temel yapılandırma

## Mevcut Durum

- Ana sayfa ve pricing sayfası için temel fonksiyonel testler yazıldı.
- Testler `tests/s4e.fe.test.js` dosyasında yer almaktadır.

## Kurulum ve Çalıştırma

```bash
# Depoyu klonlayın
git clone https://github.com/kullaniciadi/s4e-playwright.git

# Bağımlılıkları yükleyin
npm install

# Testleri çalıştırın
npx playwright test
```

## Proje Yapısı

```
s4e-playwright/
└── tests/
    └── s4e.fe.test.js   # Temel fonksiyonel testler
```

## Notlar

- Testler, .env dosyasındaki `S4E_BASE_URL` değişkenini kullanır.
- Proje kişisel bir staj çalışmasıdır.

    